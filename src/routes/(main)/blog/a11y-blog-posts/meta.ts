import { type BlogMeta } from '$lib/types';

import thumbnail from './images/a11y-intro.webp?enhanced';

export default {
	title: 'DataViz a11y series for BI devs',
	canonicalUrl:
		'https://thevizcollective.starschema.com/posts/accessibility-and-data-visualization',
	description: `Three blog posts uncovering the what, how and why of data vis accessibility in the corporate context`,
	thumbnail,
	url: '/blog/a11y-blog-posts'
} as const satisfies BlogMeta;
