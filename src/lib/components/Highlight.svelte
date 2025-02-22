<script lang="ts">
	import {
		generateHighlightPolygon,
		generateSplodgeDraw,
		noiseFactory,
		getCornerRadius,
		type MarkerWidth,
		calculateHeight,
		lineOffsetScale
	} from '$lib/highlight-generation';

	const highlightOpacity = 0.5;
	const splodgeOpacity = 0.3333;

	const {
		color,
		markerWidth = 12,
		width,
		lines,
		seed
	}: {
		color: string;
		markerWidth?: MarkerWidth;
		lines: number;
		width: number;
		seed?: number;
	} = $props();

	const noise = noiseFactory(seed);

	const height = calculateHeight(markerWidth, lines, width);

	const hlPolygon = generateHighlightPolygon(width, markerWidth, seed);
	const splodge = generateSplodgeDraw(markerWidth);
	const cornerRadius = getCornerRadius(markerWidth);

	const nonce = color;
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={hlPolygon.width} {height}>
	<defs>
		<linearGradient id="highlight-gradient-{nonce}">
			<stop stop-color={color} offset="0%" />
			<stop stop-color={color} stop-opacity="66%" offset="{50 + noise(20) - 10}%" />
			<stop stop-color={color} offset="100%" />
		</linearGradient>
		<path id="splodge-{nonce}" d={splodge} opacity={splodgeOpacity} fill={color} />
	</defs>
	<filter id="blur">
		<feGaussianBlur stdDeviation="1" />
	</filter>
	<filter id="paper">
		<!-- TODO: adjust noise scale based on mark size -->
		<!-- <feFlood flood-color="red" result='flood'/> -->
		<feTurbulence baseFrequency="0.1" numOctaves="2" result="noise" type="fractalNoise" />
		<feColorMatrix type="luminanceToAlpha" result="noise-black" />
		<feColorMatrix
			type="matrix"
			result="noise-white"
			values="0 0 0 0 1
					0 0 0 0 1
					0 0 0 0 1
					0 0 0 1 0"
		/>
		<feComponentTransfer result="noise-sharp">
			<feFuncA type="table" tableValues="0 0 0.5" />
		</feComponentTransfer>
		<feBlend in2="SourceGraphic" result="blend" />
		<feGaussianBlur stdDeviation="1" result="blur" />
	</filter>
	{#each { length: lines } as _, idx}
		<g
			class="highlight-group"
			filter="url(#paper)"
			transform="translate(0, {idx * markerWidth * lineOffsetScale})"
		>
			<path
				d={hlPolygon.fullPolygon}
				fill="url(#highlight-gradient-{nonce})"
				opacity={highlightOpacity}
			/>
		</g>
		<g> </g>
		<g transform="translate(0, {idx * markerWidth * lineOffsetScale})">
			<use
				href="#splodge-{nonce}"
				transform="translate({hlPolygon.points[0][0] - cornerRadius}, {hlPolygon
					.points[0][1]}) rotate({(hlPolygon.normalAngles[0] / 2 / Math.PI) * 360 -
					90} {cornerRadius} 0)"
			/>
			<use
				href="#splodge-{nonce}"
				transform="translate({hlPolygon.points[4][0] - cornerRadius}, {hlPolygon
					.points[4][1]}) rotate({(hlPolygon.normalAngles[4] / 2 / Math.PI) * 360 -
					90} {cornerRadius} 0)"
			/>
		</g>
	{/each}
</svg>
