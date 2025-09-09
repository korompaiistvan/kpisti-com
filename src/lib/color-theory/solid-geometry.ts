import { getOptimalColorSolid, convertXyz65ToOklab, convertXyz65ToLms } from './color';
import { converter, clampRgb, type Xyz65 } from 'culori';
import * as THREE from 'three';

export const colorSpaces = ['lab', 'oklab', 'lms', 'lrgb', 'srgb', 'xyz'] as const;
export const morphableColorSpaces = colorSpaces.filter((c) => c !== 'xyz');
export type ColorSpace = (typeof colorSpaces)[number];
export type MorphableColorSpace = (typeof morphableColorSpaces)[number];
export const optimalColorSolid = getOptimalColorSolid(5);

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

export function colorToPosition(color: Xyz65, colorSpace: ColorSpace): [number, number, number] {
	// scale, offset and rotate the solids for consistency during morphing
	switch (colorSpace) {
		case 'lms': {
			const lms = convertXyz65ToLms(color);
			const coords = [lms.l, lms.m, lms.s] as [number, number, number];
			return offset(scale(coords, [100, 100, 100]), [-50, 0, -50]);
		}

		case 'xyz': {
			const coords = [color.x, color.y, color.z] as [number, number, number];
			return offset(scale(coords, [100, 100, 100]), [-50, 0, -50]);
		}

		case 'lab': {
			const lab = labConverter(color);
			const coords = [lab.a, lab.l, lab.b] satisfies [number, number, number];
			return rotate(scale(coords, [-1, 1, 1]), Math.PI);
		}

		case 'oklab': {
			const oklab = convertXyz65ToOklab(color);
			const coords = [oklab.a, oklab.l, oklab.b] as [number, number, number];
			return rotate(scale(scale(coords, [100, 100, 100]), [-1, 1, 1]), Math.PI);
		}

		case 'lrgb': {
			const rgb = lrgbConverter(color);
			const coords = [rgb.r, rgb.g, rgb.b] as [number, number, number];

			return offset(scale(coords, [100, 100, 100]), [-50, 0, -50]);
		}

		case 'srgb': {
			const rgb = rgbConverter(color);
			const coords = [rgb.r, rgb.g, rgb.b] as [number, number, number];

			return offset(scale(coords, [100, 100, 100]), [-50, 0, -50]);
		}
	}
}

export function colorToRgbVector(color: Xyz65) {
	const rgb = rgbConverter(color);
	return [rgb.r, rgb.g, rgb.b];
}

export function getHullGeometry() {
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
}
