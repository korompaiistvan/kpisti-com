import { splitmix32 } from '$lib/random';
import { d65 } from './standard-illuminants';
type PulseType = 'valley' | 'mountain';
export type SPD = Uint8Array; // spectral power distribution

export const VISIBLE_RANGE = [380, 780];
export const VISIBLE_RANGE_LENGTH = VISIBLE_RANGE[1] - VISIBLE_RANGE[0];

export function generatePulse(
	start: number,
	end: number,
	type: PulseType,
	resolution: number
): SPD {
	const pulse = new Uint8Array(Math.floor(VISIBLE_RANGE_LENGTH / resolution));

	// verbose code, but fast
	let value = type === 'valley' ? 255 : 0;
	for (let i = 0; i < (start - VISIBLE_RANGE[0]) / resolution; i++) {
		pulse[i] = value;
	}

	value = type === 'valley' ? 0 : 255;
	for (
		let i = (start - VISIBLE_RANGE[0]) / resolution;
		i < (end - VISIBLE_RANGE[0]) / resolution;
		i++
	) {
		pulse[i] = value;
	}

	value = type === 'valley' ? 255 : 0;
	for (let i = (end - VISIBLE_RANGE[0]) / resolution; i < pulse.length; i++) {
		pulse[i] = value;
	}

	return pulse;
}

// the following functions are based on https://en.wikipedia.org/wiki/CIE_1931_color_space#Analytical_approximation

function g(x: number, mean: number, leftStDev: number, rightStDev: number) {
	const stDev = x < mean ? leftStDev : rightStDev;
	return Math.exp((-Math.pow(stDev, 2) * Math.pow(x - mean, 2)) / 2);
}

function colorMatchingFunction(wavelength: number) {
	const x_hat =
		1.056 * g(wavelength, 599.8, 0.0264, 0.0323) +
		0.362 * g(wavelength, 442.0, 0.0624, 0.0374) -
		0.065 * g(wavelength, 501.1, 0.049, 0.0382);

	const y_hat =
		0.821 * g(wavelength, 568.8, 0.0213, 0.0247) + 0.286 * g(wavelength, 530.9, 0.0613, 0.0322);

	const z_hat =
		1.217 * g(wavelength, 437.0, 0.0845, 0.0278) + 0.681 * g(wavelength, 459.0, 0.0385, 0.0725);

	return [x_hat, y_hat, z_hat];
}

// https://en.wikipedia.org/wiki/CIE_1931_color_space#Computing_XYZ_from_spectral_data
function d65SpectralPower(wavelength: number) {
	const lower = (d65.findLast((e) => e[0] < wavelength) as number[]) ?? d65[0];
	const higher = (d65.find((e) => e[0] >= wavelength) as number[]) ?? d65[d65.length - 1];

	// linear interpolation
	return (
		(((wavelength - lower[0]) / (higher[0] - lower[0])) * (higher[1] - lower[1]) + lower[1]) / 100
	);
}

export function XYZFromSPD(spd: SPD, isEmissive: boolean = true) {
	const resolution = VISIBLE_RANGE_LENGTH / spd.length;

	let [X, Y, Z, N] = [0, 0, 0, 1];
	const K = 1;
	for (let i = 0; i < spd.length; i++) {
		// FIXME, for large wavelength bands this is slightly inaccurate
		const wavelength = VISIBLE_RANGE[0] + i * resolution;
		const [x_hat, y_hat, z_hat] = colorMatchingFunction(wavelength);
		const illuminantSpectralPower = isEmissive ? 1 : d65SpectralPower(wavelength);
		const transmittance = spd[i] / 255;

		N += illuminantSpectralPower * y_hat * resolution;

		X += transmittance * illuminantSpectralPower * x_hat * resolution;
		Y += transmittance * illuminantSpectralPower * y_hat * resolution;
		Z += transmittance * illuminantSpectralPower * z_hat * resolution;
	}

	const returnVector = isEmissive ? [X, Y, Z] : [(X / N) * K, (Y / N) * K, (Z / N) * K];

	console.assert(Math.max(...returnVector) < 2);

	return returnVector;
}

export function visibleSpectrumXYZ() {
	return Array.from({ length: VISIBLE_RANGE_LENGTH })
		.map((e, idx) =>
			generatePulse(VISIBLE_RANGE[0] + idx, VISIBLE_RANGE[0] + (idx + 1), 'mountain', 1)
		)
		.map((spd) => XYZFromSPD(spd));
}

function noiseFactory(seed: number = 123) {
	const prng = splitmix32(seed);

	return (maxNoise: number) => {
		const noise = maxNoise * prng();
		return Math.round(noise * 100) / 100;
	};
}

export function generateRandomSPD(resolution: number = 5, seed: number = 123) {
	const noise = noiseFactory(seed);
	const length = Math.floor(VISIBLE_RANGE_LENGTH / resolution);
	const spd = new Uint8Array(length);
	for (let i = 0; i < spd.length; i++) {
		spd[i] = noise(255);
	}
	return spd;
}

export function getOptimalColorSolid(resolution = 1) {
	const colors: number[][] = [];

	let pulse: SPD;
	let XYZ: number[];
	for (
		let startFreq = VISIBLE_RANGE[0];
		startFreq <= VISIBLE_RANGE[1] - resolution;
		startFreq += resolution
	) {
		for (let endFreq = startFreq + resolution; endFreq <= VISIBLE_RANGE[1]; endFreq += resolution) {
			(['valley', 'mountain'] as const).forEach((pulseType) => {
				pulse = generatePulse(startFreq, endFreq, pulseType, resolution);
				XYZ = XYZFromSPD(pulse, false);
				colors.push(XYZ);
			});
		}
	}

	return colors;
}

export function convertXyz65ToOklab({ x, y, z }: { x: number; y: number; z: number }) {
	// based on https://bottosson.github.io/posts/oklab/
	const M1 = [
		[+0.8189330101, +0.3618667424, -0.1288597137],
		[+0.0329845436, +0.9293118715, +0.0361456387],
		[+0.0482003018, +0.2643662691, +0.633851707]
	];

	const M2 = [
		[+0.2104542553, +0.793617785, -0.0040720468],
		[+1.9779984951, -2.428592205, +0.4505937099],
		[+0.0259040371, +0.7827717662, -0.808675766]
	];

	const lms = matrixProduct(M1, [[x], [y], [z]]);
	const lDashed = Math.pow(lms[0][0], 1 / 3);
	const mDashed = Math.pow(lms[1][0], 1 / 3);
	const sDashed = Math.pow(lms[2][0], 1 / 3);

	const okLab = matrixProduct(M2, [[lDashed], [mDashed], [sDashed]]);
	return { l: okLab[0][0], a: okLab[1][0], b: okLab[2][0] };
}

function matrixProduct(m1: number[][], m2: number[][]) {
	// assuming row major order and correctly formed matrices (i.e. rows of the same length, all cells being a number)

	if (m1[0].length !== m2.length)
		throw new Error(
			'The number of columns in the first matrix must be equal to the number of rows in the second matrix'
		);

	const product = Array.from({ length: m1.length }).map((_, rowIdx) =>
		Array.from({ length: m2[0].length }).map((_, colIdx) => {
			let value = 0;

			for (let k = 0; k < m2.length; k++) {
				value += m1[rowIdx][k] * m2[k][colIdx];
			}
			return value;
		})
	);

	return product;
}

export function convertXyz65ToLms({ x, y, z }: { x: number; y: number; z: number }) {
	const vonKriesTransformationMatrix = [
		[0.4002, 0.7076, -0.0808],
		[-0.2263, 1.1653, 0.0457],
		[0, 0, 0.9182]
	];

	const lms = matrixProduct(vonKriesTransformationMatrix, [[x], [y], [z]]);

	return { mode: 'lms', l: lms[0][0], m: lms[1][0], s: lms[2][0] };
}
