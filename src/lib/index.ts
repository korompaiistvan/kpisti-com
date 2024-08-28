// place files you want to import through the `$lib` alias in this folder.

export function encodeObjectToSearchParams(
	obj: Record<string, undefined | string | number>
): string {
	const params = [];

	for (const key in obj) {
		const val = obj[key];

		if (val === undefined || val === '') continue;

		params.push(`${key}=${encodeURIComponent(val)}`);
	}

	return params.join('&');
}
