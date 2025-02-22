import { render } from 'svelte/server';
import type { RequestHandler } from './$types';
import Background from '$lib/components/Background.svelte';

export const GET: RequestHandler = ({ url }) => {
	const queryParams = new URLSearchParams(url.search);
	const gridSize = Number(queryParams.get('size')) || undefined;

	const { body } = render(Background, {
		props: {
			gridSize
		}
	});

	return new Response(body, {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	});
};
