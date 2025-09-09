import { type BlogMeta } from '$lib/types';

import thumbnail from './images/bali-postcard.png?enhanced';

export default {
	title: 'Greetings from Bali',
	description: `Júlia Borsi's post card design about the adventures of a rag tag group of colleagues escaping COVID in Bali`,
	thumbnail,
	url: '/work/bali-postcard'
} as const satisfies BlogMeta;
