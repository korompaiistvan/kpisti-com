<script lang="ts">
	import { getOptimalColorSolid, convertXyz65ToOklab, convertXyz65ToLms } from '../utils/color';
	import { T, useThrelte } from '@threlte/core';
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
		solidOrPoints?: 'solid' | 'points' | 'both';
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
</script>

<T.PerspectiveCamera makeDefault position={[-125, 120, -125]}>
	<OrbitControls autoRotate target={[0, 50, 0]} />
</T.PerspectiveCamera>
<T.DirectionalLight position={[0, 0, 255]} />
{#if solidOrPoints !== 'solid'}
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
		<T.PointsMaterial size={5} vertexColors toneMapped={false} opacity={0} />
	</T.Points>
{/if}
{#if solidOrPoints !== 'points'}
	<T.Mesh>
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
		<T.MeshBasicMaterial size="5" vertexColors toneMapped={false} />
		<!-- <T.MeshNormalMaterial /> -->
	</T.Mesh>
{/if}
<Grid gridSize={[100, 100]} cellSize={10} sectionSize={50} fadeDistance={200} />
