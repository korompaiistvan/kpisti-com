<script lang="ts">
	const maxVNoise = 2;
	const maxCenterPtNoise = 10;
	const vOffsetScale = 1;
	const width = 400;
	const height = 96;
	let { color = 'yellowgreen' }: { color: string } = $props();

	const halfHeight = height / 2;
	const noise = (maxNoise: number) => {
		// we could do fancier noises, but this one is probably okay for this use case
		return Math.round(maxNoise * (Math.random() - 0.5) * 2 * 100) / 100;
	};

	const markerWidth = 24;
	const cornerRadius = markerWidth / 6;
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

	const botLinePts: [number, number][] = clPts.map((clPt, idx) => {
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
	const bottomLineD = makeD(botLinePts);

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

	const nrOfPoints = fullPolygonPoints.length;
	const splodgeD = [
		`M0 ${cornerRadius}`,
		`A${cornerRadius} ${cornerRadius} 0 0 1 ${2 * cornerRadius} ${cornerRadius}`,
		`V${2 * markerWidth - cornerRadius}`,
		`A${cornerRadius} ${cornerRadius} 0 0 1 0 ${2 * markerWidth - cornerRadius}`,
		'Z'
	].join(' ');
</script>

<div class="container">
	<svg class="highlight" aria-hidden="true" {width} {height} style:color>
		<defs>
			<linearGradient id="highlight-gradient">
				<stop stop-color="currentColor" offset="0%" />
				<stop stop-color="currentColor" stop-opacity="66%" offset={`${50 + noise(20) - 10}%`} />
				<stop stop-color="currentColor" offset="100%" />
			</linearGradient>
		</defs>
		<filter id="blur">
			<feGaussianBlur stdDeviation="1" />
		</filter>
		<g class="debug">
			<path d={clD} class="line line--center" />
			<path d={topLineD} class="line line--top" />
			<path d={bottomLineD} class="line line--bottom" />
		</g>
		<g class="highlight-group">
			<path d={fullPolygon} class="highlight-polygon" />
			<path
				d={splodgeD}
				class="splodge"
				transform={`translate(${fullPolygonPoints[0][0] - cornerRadius}, ${fullPolygonPoints[0][1]}) rotate(${(normalAngles[0] / 2 / Math.PI) * 360 - 90} ${cornerRadius} 0)`}
			/>
			<path
				d={splodgeD}
				class="splodge"
				transform={`translate(${fullPolygonPoints[4][0] - cornerRadius}, ${fullPolygonPoints[4][1]}) rotate(${(normalAngles[4] / 2 / Math.PI) * 360 - 90} ${cornerRadius} 0)`}
			/>
			<!--     -->
		</g>
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
	}

	g.debug {
		display: none;
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
		fill: url(#highlight-gradient);
		opacity: 0.5;
	}

	.splodge {
		fill: currentColor;
		opacity: 0.15;
	}

	g.highlight-group {
		filter: url(#blur);
	}
</style>
