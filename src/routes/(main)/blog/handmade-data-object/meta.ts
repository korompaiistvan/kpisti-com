import { type BlogMeta } from '$lib/types';

import thumbnail from './images/overhead.png?enhanced';

export default {
	title: "What's a handmade data object anyways?",
	canonicalUrl: 'https://nightingaledvs.com/whats-a-handmade-data-object-anyway/',
	description: `This post tells the story of our most recent collaborative experimentation with what we’ve seen referred to as “analog data art” or “handmade data objects” — read on to find out how we ended up hunched over old watch parts to create this physical data visualization`,
	thumbnail,
	url: '/blog/handmade-data-object'
} as const satisfies BlogMeta;
