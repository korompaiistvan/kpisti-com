import type { Picture } from 'vite-imagetools';
export interface BlogMeta {
	title: string;
	thumbnail: Picture;
	description: string;
	canonicalUrl?: string;
	url: string;
}
