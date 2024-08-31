const maxVNoise = 2;
const maxCenterPtHNoise = 10; // percent
const vOffsetScale = 1;
export const lineOffsetScale = 0.85;
export const hPadding = 0.25; //em
export const markerWidths = [6, 12, 24, 48, 64] as const;
export type MarkerWidth = (typeof markerWidths)[number];

export function getCornerRadius(markerWidth: MarkerWidth) {
	return 4;
	return markerWidth / 6;
}

function makeD(pts: [number, number][]) {
	return [
		`M${pts[0][0]} ${pts[0][1]}`,
		`Q${pts[1][0]} ${pts[1][1]}, ${pts[2][0]} ${pts[2][1]}`,
		`Q${pts[3][0]} ${pts[3][1]}, ${pts[4][0]} ${pts[4][1]}`
	].join(' ');
}

export function calculateHeight(markerWidth: MarkerWidth, lines: number) {
	return markerWidth * (1 + (lines - 1) * lineOffsetScale) + 2 * maxVNoise;
}

export function estimateWidth(text: string, fontSize: number) {
	const aspectRatio = 1 / 2; // we estimate that glyphs are on average 2/3 as wide as they are tall
	return text.length * aspectRatio * fontSize + hPadding * fontSize * 2;
}

export function noise(maxNoise: number) {
	// we could do fancier noises, but this one is probably okay for this use case
	// it generates a uniform random value in the range [-maxNoise, +maxNoise]
	const noise = maxNoise * (Math.random() - 0.5) * 2;
	return Math.round(noise * 100) / 100;
}

function findHExtent(ptArrays: [number, number][][]) {
	let minX = Infinity;
	let maxX = -Infinity;
	for (const ptArr of ptArrays) {
		for (const pt of ptArr) {
			if (pt[0] < minX) minX = pt[0];
			if (pt[0] > maxX) maxX = pt[0];
		}
	}

	return [minX, maxX];
}

function scaleToHFit(ptArrays: [number, number][][], width: number) {
	const [minX, maxX] = findHExtent(ptArrays);
	for (const ptArr of ptArrays) {
		for (const pt of ptArr) {
			pt[0] -= minX * ((maxX - pt[0]) / maxX); // normalizes left side to 0
			// pt[0] += pt[0] - (maxX - width) * (pt[0] / maxX); // normalizes right side to width
			pt[0] -= (maxX - width) * (pt[0] / maxX);
		}
	}
}

export function generateHighlightPolygon(width: number, markerWidth: MarkerWidth) {
	const cornerRadius = getCornerRadius(markerWidth);
	const height = markerWidth + 2 * maxVNoise;
	const halfHeight = height / 2;
	const firstVOffsetSign = Math.round(Math.random()) * 2 - 1;

	// first we figure out the points of the centerline
	let clPts: [number, number][] = [
		[0, halfHeight + noise(maxVNoise)], // start
		[width / 4, halfHeight + noise(maxVNoise) * vOffsetScale * firstVOffsetSign], // 1 Q Bezier control
		[
			width / 2 + noise((maxCenterPtHNoise / 100) * width),
			halfHeight - noise(maxVNoise) * firstVOffsetSign
		] // 1 Q Bezier end
	];

	clPts = clPts.concat([
		[clPts[2][0] + (clPts[2][0] - clPts[1][0]), clPts[2][1] + (clPts[2][1] - clPts[1][1])], // 2 Q Bezier Control
		[width, halfHeight + noise(maxVNoise)] // Line end
	]);

	const normalAngles = clPts.map((currPt, idx) => {
		// the spline is "normal-continous" so we can look forward or backward to find the normal in each point
		let refPt = clPts[idx - 1];
		if (idx == 0) {
			refPt = clPts[1];
			return Math.atan((refPt[1] - currPt[1]) / (refPt[0] - currPt[0])) + Math.PI / 2;
		}

		return Math.atan((currPt[1] - refPt[1]) / (currPt[0] - refPt[0])) + Math.PI / 2;
		// we might need to do some sort of angle normalization here by half a pi
	});

	const topLinePts: [number, number][] = clPts.map((clPt, idx) => {
		const normalAngle = normalAngles[idx];

		return [
			clPt[0] + (Math.cos(normalAngle) * -markerWidth) / 2,
			clPt[1] + (Math.sin(normalAngle) * -markerWidth) / 2
		];
	});

	const botLinePts: [number, number][] = clPts.map((clPt, idx) => {
		const normalAngle = normalAngles[idx];

		return [
			clPt[0] + (Math.cos(normalAngle) * markerWidth) / 2,
			clPt[1] + (Math.sin(normalAngle) * markerWidth) / 2
		];
	});

	scaleToHFit([clPts, topLinePts, botLinePts], width);
	const clD = makeD(clPts);
	const topLineD = makeD(topLinePts);
	const botLineD = makeD(botLinePts);

	const roundingOffsets = [
		[
			[
				Math.cos(normalAngles[0] - Math.PI / 2) * cornerRadius,
				Math.sin(normalAngles[0] - Math.PI / 2) * cornerRadius
			], // start horizontal
			[Math.cos(normalAngles[0]) * cornerRadius, Math.sin(normalAngles[0]) * cornerRadius] // start vertical
		],
		[
			[
				Math.cos(normalAngles[normalAngles.length - 1] - Math.PI / 2) * cornerRadius,
				Math.sin(normalAngles[normalAngles.length - 1] - Math.PI / 2) * cornerRadius
			], // end horizontal
			[
				Math.cos(normalAngles[normalAngles.length - 1]) * cornerRadius,
				Math.sin(normalAngles[normalAngles.length - 1]) * cornerRadius
			] // end vertical
		]
	];

	const fullPolygonPoints = [
		[topLinePts[0][0] + roundingOffsets[0][0][0], topLinePts[0][1] + roundingOffsets[0][0][1]], // start

		[topLinePts[1][0], topLinePts[1][1]], // top left Q control
		[topLinePts[2][0], topLinePts[2][1]], // top centerpt
		[topLinePts[3][0], topLinePts[3][1]], // top right Q control,
		[topLinePts[4][0] - roundingOffsets[1][0][0], topLinePts[4][1] - roundingOffsets[1][0][1]], // top end

		[topLinePts[4][0] + roundingOffsets[1][1][0], topLinePts[4][1] + roundingOffsets[1][1][1]], // top right A end
		[botLinePts[4][0] - roundingOffsets[1][1][0], botLinePts[4][1] - roundingOffsets[1][1][1]], // right L end
		[botLinePts[4][0] - roundingOffsets[1][0][0], botLinePts[4][1] - roundingOffsets[1][0][1]], // bot right A end

		[botLinePts[3][0], botLinePts[3][1]], // bot left Q control
		[botLinePts[2][0], botLinePts[2][1]], // bot centerpt
		[botLinePts[1][0], botLinePts[1][1]], // bot right Q control
		[botLinePts[0][0] + roundingOffsets[0][0][0], botLinePts[0][1] + roundingOffsets[0][0][1]], // bot start

		[botLinePts[0][0] - roundingOffsets[0][1][0], botLinePts[0][1] - roundingOffsets[0][1][1]], // bot left A end
		[topLinePts[0][0] + roundingOffsets[0][1][0], topLinePts[0][1] + roundingOffsets[0][1][1]], // left L end
		[topLinePts[0][0] + roundingOffsets[0][0][0], topLinePts[0][1] + roundingOffsets[0][0][1]] // top left A end
	];

	const fullPolygon = [
		`M${fullPolygonPoints[0][0]} ${fullPolygonPoints[0][1]}`,

		`Q${fullPolygonPoints[1][0]} ${fullPolygonPoints[1][1]}, ${fullPolygonPoints[2][0]} ${fullPolygonPoints[2][1]}`,
		`Q${fullPolygonPoints[3][0]} ${fullPolygonPoints[3][1]}, ${fullPolygonPoints[4][0]} ${fullPolygonPoints[4][1]}`,

		`A${cornerRadius} ${cornerRadius} 0 0 1 ${fullPolygonPoints[5][0]} ${fullPolygonPoints[5][1]}`,
		`L${fullPolygonPoints[6][0]} ${fullPolygonPoints[6][1]}`,
		`A${cornerRadius} ${cornerRadius} 0 0 1 ${fullPolygonPoints[7][0]} ${fullPolygonPoints[7][1]}`,

		`Q${fullPolygonPoints[8][0]} ${fullPolygonPoints[8][1]}, ${fullPolygonPoints[9][0]} ${fullPolygonPoints[9][1]}`,
		`Q${fullPolygonPoints[10][0]} ${fullPolygonPoints[10][1]}, ${fullPolygonPoints[11][0]} ${fullPolygonPoints[11][1]}`,

		`A${cornerRadius} ${cornerRadius} 0 0 1 ${fullPolygonPoints[12][0]} ${fullPolygonPoints[12][1]}`,
		`L${fullPolygonPoints[13][0]} ${fullPolygonPoints[13][1]}`,
		`A${cornerRadius} ${cornerRadius} 0 0 1 ${fullPolygonPoints[14][0]} ${fullPolygonPoints[14][1]}`
	].join(' ');

	return {
		fullPolygon,
		centerLine: clD,
		topLine: topLineD,
		bottomLine: botLineD,
		points: fullPolygonPoints,
		normalAngles,
		width,
		height
	};
}

export function generateSplodgeDraw(markerWidth: MarkerWidth) {
	const cornerRadius = getCornerRadius(markerWidth);
	return [
		`M0 ${cornerRadius}`,
		`A${cornerRadius} ${cornerRadius} 0 0 1 ${2 * cornerRadius} ${cornerRadius}`,
		`V${markerWidth - cornerRadius}`,
		`A${cornerRadius} ${cornerRadius} 0 0 1 0 ${markerWidth - cornerRadius}`,
		'Z'
	].join(' ');
}
