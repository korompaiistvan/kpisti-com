import { isInstanceOf } from '@threlte/core';
import { createTransition } from '@threlte/extras';
import { cubicInOut } from 'svelte/easing';
export const fade = (opacity = 0, duration: number = 600, delay: number = 0) => {
	return createTransition((ref) => {
		if (!isInstanceOf(ref, 'Material')) return;

		return {
			duration,
			delay,
			tick: (t: number) => {
				ref.opacity = t * (1 - opacity);
			},
			easing: cubicInOut
		};
	});
};
