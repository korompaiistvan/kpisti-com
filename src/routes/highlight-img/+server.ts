import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';
import type { RequestHandler } from './$types';
import Highlight from '$lib/components/Highlight.svelte';

export const GET: RequestHandler = ({ url }) => {
	const queryParams = new URLSearchParams(url.search);
	const text = queryParams.get('text');
	const color = queryParams.get('color');
	if (!text) {
		return error(400, 'text query parameter is required');
	}

	if (!color) {
		return error(400, 'color query parameter is required');
	}

	const { body } = render(Highlight, { props: { text, color } });

	return new Response(body, {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	});
};
