<script>
	import WorkSection from '$lib/components/WorkSection.svelte';

	import hmdObjMeta from './handmade-data-object/meta';
	import dispFlwrsMeta from './disparity-flowers/meta';
	import baliPostcardMeta from './bali-postcard/meta';
	import ReadingWidthConstraint from '$lib/components/ReadingWidthConstraint.svelte';
	import Meta from '$lib/components/Meta.svelte';
</script>

<Meta
	title="Work - István Korompai"
	description="The public works of data vis engineer, István Korompai"
/>

<ReadingWidthConstraint>
	<WorkSection posts={[hmdObjMeta, baliPostcardMeta, dispFlwrsMeta]} />
</ReadingWidthConstraint>
