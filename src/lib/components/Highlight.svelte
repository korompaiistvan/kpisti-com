<script lang="ts">
	import {
		generateHighlightPolygon,
		generateSplodgeDraw,
		noise,
		getCornerRadius,
		calculateAspectRatio,
		type MarkerWidth
	} from '$lib/highlight-generation';

	const highlightOpacity = 0.2;
	const splodgeOpacity = 0.2;

	const {
		text,
		color,
		markerWidth = 12,
		lines = 1
	}: { color: string; text: string; markerWidth?: MarkerWidth; lines?: number } = $props();

	const aspectRatio = calculateAspectRatio(text ?? '');
	const height = markerWidth * lines;
	const width = height * aspectRatio;

	const hlPolygon = generateHighlightPolygon(width, markerWidth);
	const splodge = generateSplodgeDraw(markerWidth);
	const cornerRadius = getCornerRadius(markerWidth);
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={hlPolygon.width} height={hlPolygon.height}>
	<defs>
		<linearGradient id="highlight-gradient">
			<stop stop-color={color} offset="0%" />
			<stop stop-color={color} stop-opacity="66%" offset="{50 + noise(20) - 10}%" />
			<stop stop-color={color} offset="100%" />
		</linearGradient>
		<path id="splodge" d={splodge} opacity={splodgeOpacity} fill={color} />
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
	<g class="highlight-group" filter="url(#paper)">
		<path d={hlPolygon.fullPolygon} fill="url(#highlight-gradient)" opacity={highlightOpacity} />
		<use
			href="#splodge"
			transform="translate({hlPolygon.points[0][0] - cornerRadius}, {hlPolygon
				.points[0][1]}) rotate({(hlPolygon.normalAngles[0] / 2 / Math.PI) * 360 -
				90} {cornerRadius} 0)"
		/>
		<use
			href="#splodge"
			transform="translate({hlPolygon.points[4][0] - cornerRadius}, {hlPolygon
				.points[4][1]}) rotate({(hlPolygon.normalAngles[4] / 2 / Math.PI) * 360 -
				90} {cornerRadius} 0)"
		/>
	</g>
</svg>
