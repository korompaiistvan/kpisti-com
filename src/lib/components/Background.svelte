<script lang="ts">
	const {
		gridSize = 32
	}: {
		gridSize?: number;
	} = $props();
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={4 * gridSize} height={4 * gridSize}>
	<defs>
		<pattern id="dots" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
			<circle fill="#a8a8a8" r="1" cx={gridSize / 2} cy={gridSize / 2} />
		</pattern>
	</defs>
	<rect width="100%" height="100%" fill="url(#dots)" />
</svg>
