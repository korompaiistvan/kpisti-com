import { type BlogMeta } from '$lib/types';

import thumbnail from './images/thumbnail.png?enhanced';

export default {
	title: 'Visualizing Color Solids',
	description: `Calculate and visualize the so-called MacAdam limits, the boundaries of human color perception.`,
	thumbnail,
	url: '/blog/color-solids'
} as const satisfies BlogMeta;
