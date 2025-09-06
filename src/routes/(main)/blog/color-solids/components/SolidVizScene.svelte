<script lang="ts">
	import { getOptimalColorSolid } from '../utils/color';
	import { T, useThrelte } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
	import { converter } from 'culori';
	import { Color } from 'three';

	const optimalColorSolid = getOptimalColorSolid(5);
	const colors = optimalColorSolid.map((c) => {
		return { mode: 'xyz65', x: c[0], y: c[1], z: c[2] } as const;
	});

	const rgbConverter = converter('rgb');

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
						return [c.x * 100 - 50, c.y * 100, c.z * 100 - 50];
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
						const rgb = rgbConverter(c);
						return [rgb.r, rgb.g, rgb.b];
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
	<T.PointsMaterial size={5} vertexColors toneMapped={false} />
</T.Points>
<Grid gridSize={[100, 100]} cellSize={10} sectionSize={50} fadeDistance={200} />
