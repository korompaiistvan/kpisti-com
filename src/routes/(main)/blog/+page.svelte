<script>
	import BlogSection from '$lib/components/BlogSection.svelte';
	import Meta from '$lib/components/Meta.svelte';

	import clrSldMeta from '../blog/color-solids/meta';
	import a11yMeta from '../blog/a11y-blog-posts/meta';
	import ReadingWidthConstraint from '$lib/components/ReadingWidthConstraint.svelte';
</script>

<Meta
	title="Blog - István Korompai"
	description="Various lengths of blog posts written by data vis engineer, István Korompai"
/>

<ReadingWidthConstraint>
	<BlogSection posts={[clrSldMeta, a11yMeta]} />
</ReadingWidthConstraint>
