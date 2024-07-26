import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { calculateAspectRatio, generateFullSvg } from '$lib/highlight-generation';

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

	const aspectRatio = calculateAspectRatio(text);

	const svgResponse = generateFullSvg(aspectRatio, color);

	return new Response(svgResponse, {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	});
};
