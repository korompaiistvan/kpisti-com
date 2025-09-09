import { type BlogMeta } from '$lib/types';

import thumbnail from './images/overhead.png?enhanced';

export default {
	title: "What's a handmade data object anyways?",
	canonicalUrl: 'https://nightingaledvs.com/whats-a-handmade-data-object-anyway/',
	description: `Three data viz friends sit down with handfuls of watch parts, Nightingale magazin publishes the end result`,
	thumbnail,
	url: '/work/handmade-data-object'
} as const satisfies BlogMeta;
