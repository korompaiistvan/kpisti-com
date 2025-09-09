<script lang="ts">
	import {
		colorSpaces,
		getHullGeometry,
		morphableColorSpaces,
		type ColorSpace,
		type MorphableColorSpace
	} from '$lib/color-theory/solid-geometry';
	import { T, useThrelte, useTask } from '@threlte/core';
	import { OrbitControls, transitions } from '@threlte/extras';
	import * as THREE from 'three';
	import { Tween } from 'svelte/motion';
	import { fade } from '../../../routes/(main)/blog/color-solids/utils/fade';
	import { backInOut } from 'svelte/easing';

	const {
		solidOrPoints = 'points',
		colorSpace = 'lab',
		gamut = 'visible-colors'
	}: {
		solidOrPoints?: 'solid' | 'points';
		colorSpace?: (typeof colorSpaces)[number];
		gamut?: 'visible-colors' | 'srgb';
	} = $props();

	const hullGeometry = getHullGeometry();

	const isSafari = navigator ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false;

	const morphInfluences = new Tween<Record<MorphableColorSpace | `${ColorSpace}Clamped`, number>>(
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
		{ duration: 600, easing: backInOut }
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
	transitions();
	$effect(() => {
		scene.background = new THREE.Color().setHex(0xc2cdde);
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
	{#if solidOrPoints === 'points'}
		<T.Points castShadow={!isSafari} geometry={hullGeometry} {morphTargetInfluences}>
			<T.PointsMaterial
				size={3}
				vertexColors
				toneMapped={false}
				in={fade(0, 600, 0)}
				out={fade(0, 600, 0)}
				transparent
			/>
		</T.Points>
	{/if}

	{#if solidOrPoints === 'solid'}
		<T.Mesh castShadow geometry={hullGeometry} {morphTargetInfluences}>
			<T.MeshPhongMaterial
				size="5"
				vertexColors
				flatShading={true}
				in={fade(0, 600, 0)}
				out={fade(0, 600, 0)}
				side={2}
				transparent
			/>
		</T.Mesh>
	{/if}
</T.Group>
<T.Mesh receiveShadow rotation.x={-Math.PI / 2}>
	<T.CircleGeometry args={[300, 72]} />
	<T.MeshStandardMaterial color={0xc2d6f3} />
</T.Mesh>
