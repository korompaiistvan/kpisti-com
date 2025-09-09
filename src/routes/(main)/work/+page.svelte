<script>
	import WorkSection from '$lib/components/WorkSection.svelte';

	import hmdObjMeta from './handmade-data-object/meta';
	import dispFlwrsMeta from './disparity-flowers/meta';
	import baliPostcardMeta from './bali-postcard/meta';
</script>

<WorkSection posts={[hmdObjMeta, baliPostcardMeta, dispFlwrsMeta]} />
