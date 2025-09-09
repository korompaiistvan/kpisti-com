<script lang="ts">
	import {
		getOptimalColorSolid,
		convertXyz65ToOklab,
		convertXyz65ToLms
	} from '$lib/color-theory/color';
	import { T, useThrelte, useTask } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import * as THREE from 'three';
	import { clampRgb, converter, type Xyz65 } from 'culori';
	import { Color } from 'three';
	import { Spring } from 'svelte/motion';

	// important that xyz is the last in the list as later we rely on indices for morph targets
	const colorSpaces = ['lab', 'oklab', 'lms', 'lrgb', 'srgb', 'xyz'] as const;
	const morphableColorSpaces = colorSpaces.filter((c) => c !== 'xyz');
	type ColorSpace = (typeof colorSpaces)[number];
	type MorphableColorSpace = (typeof morphableColorSpaces)[number];

	const {
		solidOrPoints = 'points',
		colorSpace = 'lab',
		gamut = 'visible-colors'
	}: {
		solidOrPoints?: 'solid' | 'points' | 'both' | 'neither';
		colorSpace?: (typeof colorSpaces)[number];
		gamut?: 'visible-colors' | 'srgb';
	} = $props();

	const optimalColorSolid = getOptimalColorSolid(5);
	const colors = optimalColorSolid.vertices.map((c) => {
		const rounder = (n: number) => Math.round(n * 10000) / 10000;
		return { mode: 'xyz65', x: rounder(c[0]), y: rounder(c[1]), z: rounder(c[2]) } as const;
	});
	const rgbConverter = converter('rgb');
	const labConverter = converter('lab');
	const lrgbConverter = converter('lrgb');

	const scale = (coords: [number, number, number], factors: [number, number, number]) => {
		return coords.map((c, idx) => c * factors[idx]) as [number, number, number];
	};

	const offset = (coords: [number, number, number], offsets: [number, number, number]) => {
		return coords.map((c, idx) => c + offsets[idx]) as [number, number, number];
	};

	const rotate = (coords: [number, number, number], theta: number): [number, number, number] => {
		// rotation is always around the y axis
		return [
			Math.cos(theta) * coords[0] - Math.sin(theta) * coords[2],
			coords[1],
			Math.sin(theta) * coords[0] + Math.cos(theta) * coords[2]
		];
	};

	const colorToPosition = (color: Xyz65, colorSpace: ColorSpace): [number, number, number] => {
		const displayColor = gamut === 'srgb' ? clampRgb(color) : color;

		// scale, offset and rotate the solids for consistency during morphing
		switch (colorSpace) {
			case 'lms': {
				const lms = convertXyz65ToLms(displayColor);
				const coords = [lms.l, lms.m, lms.s] as [number, number, number];
				return offset(scale(coords, [100, 100, 100]), [-50, 0, -50]);
			}

			case 'xyz': {
				const coords = [displayColor.x, displayColor.y, displayColor.z] as [number, number, number];
				return offset(scale(coords, [100, 100, 100]), [-50, 0, -50]);
			}

			case 'lab': {
				const lab = labConverter(displayColor);
				const coords = [lab.a, lab.l, lab.b] satisfies [number, number, number];
				return rotate(scale(coords, [-1, 1, 1]), Math.PI);
			}

			case 'oklab': {
				const oklab = convertXyz65ToOklab(displayColor);
				const coords = [oklab.a, oklab.l, oklab.b] as [number, number, number];
				return rotate(scale(scale(coords, [100, 100, 100]), [-1, 1, 1]), Math.PI);
			}

			case 'lrgb': {
				const rgb = lrgbConverter(displayColor);
				const coords = [rgb.r, rgb.g, rgb.b] as [number, number, number];

				return offset(scale(coords, [100, 100, 100]), [-50, 0, -50]);
			}

			case 'srgb': {
				const rgb = rgbConverter(displayColor);
				const coords = [rgb.r, rgb.g, rgb.b] as [number, number, number];

				return offset(scale(coords, [100, 100, 100]), [-50, 0, -50]);
			}
		}
	};

	const colorToRgbVector = (color: Xyz65) => {
		const rgb = rgbConverter(color);
		return [rgb.r, rgb.g, rgb.b];
	};

	const hullGeometry = (() => {
		const hullVertexCount = optimalColorSolid.faces.length * 3;
		const positions = new Float32Array(hullVertexCount).fill(0);
		const colors = new Float32Array(hullVertexCount);
		const morphPositions = Array.from({ length: colorSpaces.length - 1 + colorSpaces.length }).map(
			() => new Float32Array(hullVertexCount)
		);
		let color: Xyz65;

		optimalColorSolid.faces.forEach((vertexIdx, idx) => {
			const vertex = optimalColorSolid.vertices[vertexIdx];
			color = { mode: 'xyz65', x: vertex[0], y: vertex[1], z: vertex[2] };

			const flatTypedArrayIdx = idx * 3;
			positions.set(colorToPosition(color, 'xyz'), flatTypedArrayIdx);
			colors.set(colorToRgbVector(color), flatTypedArrayIdx);

			colorSpaces.forEach((colorSpace, colorSpaceIdx) => {
				if (colorSpace !== 'xyz') {
					morphPositions[colorSpaceIdx].set(colorToPosition(color, colorSpace), flatTypedArrayIdx);
				}
				morphPositions[colorSpaces.length - 1 + colorSpaceIdx].set(
					colorToPosition(clampRgb(color), colorSpace),
					flatTypedArrayIdx
				);
			});
		});

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

		geometry.morphAttributes.position = morphPositions.map(
			(positionsArray) => new THREE.Float32BufferAttribute(positionsArray, 3)
		);

		return geometry;
	})();

	const morphInfluences = new Spring<Record<MorphableColorSpace | `${ColorSpace}Clamped`, number>>(
		{
			lab: 0,
			oklab: 0,
			lms: 0,
			lrgb: 0,
			srgb: 0,
			labClamped: 0,
			oklabClamped: 0,
			lmsClamped: 0,
			lrgbClamped: 0,
			srgbClamped: 0,
			xyzClamped: 0
		},
		{ stiffness: 0.1, damping: 1 }
	);

	$effect(() => {
		const newMorphTargetInfluences = Object.fromEntries([
			...morphableColorSpaces.map((cs) => [cs, 0]),
			...colorSpaces.map((cs) => [`${cs}Clamped`, 0])
		]) as Record<MorphableColorSpace | `${ColorSpace}Clamped`, number>;

		if (colorSpace === 'xyz' && gamut === 'visible-colors') {
			morphInfluences.target = newMorphTargetInfluences;
			return;
		}

		const key = gamut === 'visible-colors' ? colorSpace : (`${colorSpace}Clamped` as const);

		if (key === 'xyz') throw new Error('XYZ cannot be used as a morph target');

		newMorphTargetInfluences[key] = 1;
		morphInfluences.target = newMorphTargetInfluences;
	});

	let morphTargetInfluences = $derived([
		...morphableColorSpaces.map((colorSpace, idx) => morphInfluences.current[colorSpace]),
		...colorSpaces.map((colorSpace, idx) => morphInfluences.current[`${colorSpace}Clamped`])
	]);

	const { scene } = useThrelte();

	$effect(() => {
		scene.background = new Color().setHex(0xc2cdde);
	});

	let rotation = $state(0);

	useTask((delta) => {
		rotation += delta / 4;
	});

	let directionalLightPosition: [number, number, number] = $derived.by(() => {
		const y = 200;
		const x = -100;
		const z = 50;
		const xDash = Math.cos(rotation) * x - Math.sin(rotation) * z;
		const zDash = Math.sin(rotation) * x + Math.cos(rotation) * z;
		return [xDash, y, zDash];
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
	<OrbitControls target={[0, 40, 0]} autoRotate />
</T.PerspectiveCamera>

<T.AmbientLight intensity={2} />
<T.DirectionalLight
	intensity={10}
	position={directionalLightPosition}
	castShadow
	oncreate={(ref) => {
		ref.shadow.camera.left = -150;
		ref.shadow.camera.right = 150;
		ref.shadow.camera.top = 150;
		ref.shadow.camera.bottom = -150;
		ref.shadow.camera.far = 2000;
		ref.shadow.camera.updateProjectionMatrix();
	}}
/>

<T.Group position.y={10}>
	{#if solidOrPoints === 'points' || solidOrPoints === 'both'}
		<T.Points castShadow>
			<T.BufferGeometry>
				<T.BufferAttribute
					args={[
						new Float32Array(
							colors.flatMap((color) => {
								return colorToPosition(color, colorSpace);
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
		<T.Mesh castShadow geometry={hullGeometry} {morphTargetInfluences}>
			<T.MeshPhongMaterial size="5" vertexColors flatShading={true} side={2} />
			<!-- <T.MeshNormalMaterial /> -->
		</T.Mesh>
	{/if}
</T.Group>
<T.Mesh receiveShadow rotation.x={-Math.PI / 2}>
	<T.CircleGeometry args={[300, 72]} />
	<T.MeshStandardMaterial color={0xc2d6f3} />
</T.Mesh>
