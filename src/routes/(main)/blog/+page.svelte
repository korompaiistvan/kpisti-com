<script>
	import BlogSection from '$lib/components/BlogSection.svelte';
	import Meta from '$lib/components/Meta.svelte';

	import clrSldMeta from '../blog/color-solids/meta';
</script>

<Meta
	title="Blog - István Korompai"
	description="Various lengths of blog posts written by data vis engineer, István Korompai"
/>

<BlogSection posts={[clrSldMeta]} />
