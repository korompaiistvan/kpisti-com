<script lang="ts">
	const maxVNoise = 2;
	const maxCenterPtNoise = 10;
	const vOffsetScale = 1;
	const width = 400;
	const height = 96;

	const halfHeight = height / 2;
	const noise = (maxNoise: number) => {
		// we could do fancier noises, but this one is probably okay for this use case
		return Math.round(maxNoise * (Math.random() - 0.5) * 2 * 100) / 100;
	};

	const markerWidth = 24;
	const cornerRadius = 4;
	const firstVOffsetSign = Math.round(Math.random()) * 2 - 1;

	let clPts: [number, number][] = [
		[0, halfHeight + noise(maxVNoise)], // start
		[
			width / 4 + noise(maxCenterPtNoise),
			halfHeight - noise(maxVNoise) * vOffsetScale * firstVOffsetSign
		], // 1 Q Bezier control
		[width / 2 + noise(maxCenterPtNoise), halfHeight + noise(maxVNoise) * firstVOffsetSign] // 1 Q Bezier end
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
			clPt[0] + Math.cos(normalAngle) * -markerWidth,
			clPt[1] + Math.sin(normalAngle) * -markerWidth
		];
	});

	const bottomLinePts: [number, number][] = clPts.map((clPt, idx) => {
		const normalAngle = normalAngles[idx];

		return [
			clPt[0] + Math.cos(normalAngle) * markerWidth,
			clPt[1] + Math.sin(normalAngle) * markerWidth
		];
	});

	const makeD = (pts: [number, number][]) => {
		return [
			`M${pts[0][0]} ${pts[0][1]}`,
			`Q${pts[1][0]} ${pts[1][1]}, ${pts[2][0]} ${pts[2][1]}`,
			`Q${pts[3][0]} ${pts[3][1]}, ${pts[4][0]} ${pts[4][1]}`
		].join(' ');
	};

	const clD = makeD(clPts);
	const topLineD = makeD(topLinePts);
	const bottomLineD = makeD(bottomLinePts);

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
	const fullPolygon = [
		`M${topLinePts[0][0] + roundingOffsets[0][0][0]} ${topLinePts[0][1] + +roundingOffsets[0][0][1]}`,

		`Q${topLinePts[1][0]} ${topLinePts[1][1]}, ${topLinePts[2][0]} ${topLinePts[2][1]}`,
		`Q${topLinePts[3][0]} ${topLinePts[3][1]}, ${topLinePts[4][0] - roundingOffsets[1][0][0]} ${topLinePts[4][1] - roundingOffsets[1][0][1]}`,

		`A${cornerRadius} ${cornerRadius} 0 0 1 ${topLinePts[4][0] + roundingOffsets[1][1][0]} ${topLinePts[4][1] + roundingOffsets[1][1][1]}`,
		`L${bottomLinePts[4][0] - roundingOffsets[1][1][0]} ${bottomLinePts[4][1] - roundingOffsets[1][1][1]}`,
		`A${cornerRadius} ${cornerRadius} 0 0 1 ${bottomLinePts[4][0] - roundingOffsets[1][0][0]} ${bottomLinePts[4][1] - roundingOffsets[1][0][1]}`,

		`Q${bottomLinePts[3][0]} ${bottomLinePts[3][1]}, ${bottomLinePts[2][0]} ${bottomLinePts[2][1]}`,
		`Q${bottomLinePts[1][0]} ${bottomLinePts[1][1]}, ${bottomLinePts[0][0] + roundingOffsets[0][0][0]} ${bottomLinePts[0][1] + roundingOffsets[0][0][1]}`,

		`A${cornerRadius} ${cornerRadius} 0 0 1 ${bottomLinePts[0][0] - roundingOffsets[0][1][0]} ${bottomLinePts[0][1] - roundingOffsets[0][1][1]}`,
		`L${topLinePts[0][0] + roundingOffsets[0][1][0]} ${topLinePts[0][1] + roundingOffsets[0][1][1]}`,
		`A${cornerRadius} ${cornerRadius} 0 0 1 ${topLinePts[0][0] + roundingOffsets[0][0][0]} ${topLinePts[0][1] + +roundingOffsets[0][0][1]}`
	].join(' ');
</script>

<div class="container">
	<svg class="highlight" aria-hidden="true" {width} {height}>
		<path d={clD} class="line line--center" />
		<path d={topLineD} class="line line--top" />
		<path d={bottomLineD} class="line line--bottom" />
		<path d={fullPolygon} class="highlight-polygon" />
	</svg>
	<div class="slot-container">
		<slot />
	</div>
</div>

<style>
	.container {
		position: relative;
		isolation: isolate;
	}

	.highlight {
		position: absolute;
		left: -200px;
	}

	.slot-container {
		position: absolute;
		opacity: 0.1;
	}

	.line {
		stroke-width: 2;
		stroke-dasharray: 4 4;
		fill: none;
		opacity: 0.1;
	}

	.line--center {
		stroke: red;
	}

	.line--top {
		stroke: green;
	}

	.line--bottom {
		stroke: blue;
	}

	.highlight-polygon {
		fill: yellowgreen;
		opacity: 0.5;
	}
</style>
