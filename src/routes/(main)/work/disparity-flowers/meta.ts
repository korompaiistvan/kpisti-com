import { type BlogMeta } from '$lib/types';

import thumbnail from './images/disparity-flowers.png?enhanced';

export default {
	title: 'Social Disparity Flowers',
	description: `A submission for the current Viz For Social Good challenge, this work shined a light on the gender and ethnic imbalances of US tech companies' workforces, using flowers as the visual metaphor.`,
	thumbnail,
	url: '/work/disparity-flowers'
} as const satisfies BlogMeta;
