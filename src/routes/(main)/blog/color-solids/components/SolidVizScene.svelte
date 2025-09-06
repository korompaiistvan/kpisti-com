<script lang="ts">
	import { getOptimalColorSolid } from '../utils/color';
	import { T, useThrelte } from '@threlte/core';
	import { OrbitControls, PointsMaterial, Grid } from '@threlte/extras';
	import { clampChroma, clampRgb, converter } from 'culori';
	import { Color } from 'three';

	const optimalColorSolid = getOptimalColorSolid(5);
	const colors = optimalColorSolid.map(
		(c) => ({ mode: 'xyz65', x: c[0] / 100, y: c[1] / 100, z: c[2] / 100 }) as const
	);

	const rgbConverter = converter('rgb');
	const oklabConverter = converter('oklab');
	const labConverter = converter('lab');

	const { scene } = useThrelte();

	$effect(() => {
		scene.background = new Color().setHex(0xeaeaea);
	});
</script>

<T.PerspectiveCamera makeDefault position={[-120, 120, -120]}>
	<OrbitControls autoRotate target={[0, 50, 0]} />
</T.PerspectiveCamera>
<T.DirectionalLight position={[0, 0, 255]} />
<T.Points>
	<T.BufferGeometry>
		<T.BufferAttribute
			args={[
				new Float32Array(
					colors.flatMap((c) => {
						const okLab = oklabConverter(c);
						const lab = labConverter(c);
						return [lab.a / 2, lab.l, lab.b / 2];
						return [c.x * 100 - 50, c.y * 100, c.z * 100 - 50];
						return [okLab.a * 100, okLab.l * 100, okLab.b * 100];
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
					colors.flatMap((c) => {
						const rgb = rgbConverter(clampChroma(c));
						const transform = (x: number) => Math.round(x * 1000) / 1000;
						const v = [rgb.r, rgb.g, rgb.b].map(transform);
						return v;
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
	<PointsMaterial size={5} vertexColors toneMapped={false} />
</T.Points>
<Grid gridSize={[100, 100]} cellSize={10} sectionSize={50} fadeDistance={200} />
