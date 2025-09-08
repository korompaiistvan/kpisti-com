<script lang="ts">
	import { getOptimalColorSolid, convertXyz65ToOklab, convertXyz65ToLms } from '../utils/color';
	import { T, useThrelte, useTask } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
	import { ConvexHull } from 'three/addons/math/ConvexHull.js';
	import * as THREE from 'three';
	import { clampChroma, converter, type Xyz65 } from 'culori';
	import { Color } from 'three';

	const {
		solidOrPoints = 'points',
		colorSpace = 'lab',
		gamut = 'visible-colors'
	}: {
		solidOrPoints?: 'solid' | 'points' | 'both' | 'neither';
		colorSpace?: 'xyz' | 'lab' | 'oklab' | 'lms';
		gamut?: 'visible-colors' | 'srgb';
	} = $props();

	const optimalColorSolid = getOptimalColorSolid(2.5);
	const colors = optimalColorSolid.map((c) => {
		const rounder = (n: number) => Math.round(n * 10000) / 10000;
		return { mode: 'xyz65', x: rounder(c[0]), y: rounder(c[1]), z: rounder(c[2]) } as const;
	});
	const rgbConverter = converter('rgb');
	const labConverter = converter('lab');

	// we construct a convex hull in XYZ, where the color solid is convex
	// later we can reuse the faces of this solid, but with different vertex positions
	const colorToPosition = $derived((color: Xyz65) => {
		const displayColor = gamut === 'srgb' ? clampChroma(color) : color;

		switch (colorSpace) {
			case 'lab': {
				const lab = labConverter(displayColor);
				return [lab.a, lab.l, lab.b];
			}
			case 'xyz': {
				return [displayColor.x * 100 - 50, displayColor.y * 100, displayColor.z * 100 - 50];
			}
			case 'oklab': {
				const oklab = convertXyz65ToOklab(displayColor);
				return [oklab.a * 100, oklab.l * 100, oklab.b * 100];
			}

			case 'lms': {
				const lms = convertXyz65ToLms(displayColor);
				return [lms.l * 100 - 50, lms.m * 100, lms.s * 100 - 50];
			}
		}
	});

	const colorToRgbVector = (color: Xyz65) => {
		const rgb = rgbConverter(color);
		return [rgb.r, rgb.g, rgb.b];
	};

	const hullGeometry = $derived.by(() => {
		const pointIndexMap = new Map();
		const positionsForHull = colors.map((c, idx) => {
			const [x, y, z] = colorToPosition(c);
			const vector = new THREE.Vector3(x, y, z);
			pointIndexMap.set(vector, idx);
			return vector;
		});
		const convexHull = new ConvexHull().setFromPoints(positionsForHull);

		let hullVertexPositions: number[] = [];
		let hullVertexColors: number[] = [];
		convexHull.faces.forEach((face) => {
			let edge = face.edge;
			do {
				const hullPoint = edge.head().point;
				const idx = pointIndexMap.get(hullPoint);
				const color = colors[idx];

				hullVertexPositions.push(...colorToPosition(color));
				hullVertexColors.push(...colorToRgbVector(color));

				edge = edge.next;
			} while (edge !== face.edge);
		});

		return {
			positions: hullVertexPositions,
			colors: hullVertexColors
		};
	});
	const { scene } = useThrelte();

	$effect(() => {
		scene.background = new Color().setHex(0x888888);
	});

	let rotation = $state(0);

	useTask((delta) => {
		rotation += delta / 2;
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 120, 200]}
	oncreate={(ref) => {
		ref.lookAt(new THREE.Vector3(0, 40, 0));
	}}
>
	<T.PointLight color={0xffffff} intensity={10000} />
	<OrbitControls target={[0, 40, 0]} />
</T.PerspectiveCamera>

<T.AmbientLight />
<T.DirectionalLight
	intensity={10}
	position={[-100, 200, 50]}
	castShadow
	oncreate={(ref) => {
		console.log(
			ref.shadow.camera.left,
			ref.shadow.camera.right,
			ref.shadow.camera.top,
			ref.shadow.camera.bottom,
			ref.shadow.camera.near,
			ref.shadow.camera.far
		);
		ref.shadow.camera.left = -150;
		ref.shadow.camera.right = 150;
		ref.shadow.camera.top = 150;
		ref.shadow.camera.bottom = -150;
		ref.shadow.camera.far = 2000;
		ref.shadow.camera.updateProjectionMatrix();
	}}
/>

<T.Group rotation.y={rotation} position.y={10}>
	{#if solidOrPoints === 'points' || solidOrPoints === 'both'}
		<T.Points>
			<T.BufferGeometry>
				<T.BufferAttribute
					args={[
						new Float32Array(
							colors.flatMap((color) => {
								return colorToPosition(color);
							})
						),
						3
					]}
					attach={({ parent, ref }) => {
						// @ts-ignore
						parent.setAttribute('position', ref);

						return () => {};
					}}
				/>
				<T.BufferAttribute
					args={[
						new Float32Array(
							colors.flatMap((color) => {
								return colorToRgbVector(color);
							})
						),
						3
					]}
					attach={({ parent, ref }) => {
						// @ts-ignore
						parent.setAttribute('color', ref);

						return () => {};
					}}
				/>
			</T.BufferGeometry>
			<T.PointsMaterial size={5} vertexColors opacity={0} toneMapped={false} />
		</T.Points>
	{/if}
	{#if solidOrPoints === 'solid' || solidOrPoints === 'both'}
		<T.Mesh castShadow>
			<T.BufferGeometry>
				<T.BufferAttribute
					args={[new Float32Array(hullGeometry.positions), 3]}
					attach={({ parent, ref }) => {
						// @ts-ignore
						parent.setAttribute('position', ref);
					}}
				/>

				<T.BufferAttribute
					args={[new Float32Array(hullGeometry.colors), 3]}
					attach={({ parent, ref }) => {
						// @ts-ignore
						parent.setAttribute('color', ref);
					}}
				/>
			</T.BufferGeometry>
			<T.MeshPhongMaterial size="5" vertexColors flatShading={true} />
			<!-- <T.MeshNormalMaterial /> -->
		</T.Mesh>
	{/if}
</T.Group>
<T.Mesh receiveShadow rotation.x={-Math.PI / 2}>
	<T.CircleGeometry args={[300, 72]} />
	<T.MeshStandardMaterial color="white" />
</T.Mesh>
