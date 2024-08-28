import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';
import type { RequestHandler } from './$types';
import Highlight from '$lib/components/Highlight.svelte';
import { markerWidths, type MarkerWidth } from '$lib/highlight-generation';

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

	const markerWidth = Number(queryParams.get('markerWidth')) || undefined;
	const lines = Number(queryParams.get('lines')) || undefined;
	const fontSize = Number(queryParams.get('fontSize')) || undefined;

	if (markerWidth !== undefined && !markerWidths.includes(markerWidth as MarkerWidth)) {
		return error(400, 'Invalid markerWidth supplied');
	}

	const { body } = render(Highlight, {
		props: {
			text,
			color,
			markerWidth: markerWidth === undefined ? undefined : (markerWidth as MarkerWidth),
			fontSize,
			lines
		}
	});

	return new Response(body, {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	});
};
