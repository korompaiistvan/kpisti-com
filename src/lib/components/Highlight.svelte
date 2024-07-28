<script lang="ts">
	import {
		generateHighlightPolygon,
		generateSplodgeDraw,
		noise,
		cornerRadius,
		calculateAspectRatio
	} from '$lib/highlight-generation';

	const highlightOpacity = 0.2;
	const splodgeOpacity = 0.2;

	const { text, color }: { color: string; text: string } = $props();

	const aspectRatio = calculateAspectRatio(text ?? '');

	const hlPolygon = generateHighlightPolygon(aspectRatio);
	const splodge = generateSplodgeDraw();
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
	<g class="highlight-group" filter="url(#blur)">
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
