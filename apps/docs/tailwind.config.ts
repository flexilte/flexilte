import { join } from 'path';
import type { Config } from 'tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts,json}',
		'./static/**/*.{json,yaml}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}'),
		join(require.resolve('@flexilte/core'), '../**/*.{html,js,svelte,ts}'),
		join(require.resolve('@flexilte/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	safelist: [
		'^text-[a-z0-9-]+$',
		'^h-([0-9]+|[0-9]+/[0-9]+|auto|full|screen|fit|min|max|px)$',
		'^w-([0-9]+|[0-9]+/[0-9]+|auto|full|screen|fit|min|max|px)$',
		'^md:h-([0-9]+|[0-9]+/[0-9]+|auto|full|screen|fit|min|max|px)$',
		'^md:w-([0-9]+|[0-9]+/[0-9]+|auto|full|screen|fit|min|max|px)$'
	],
	theme: {
		extend: {}
	},
	plugins: [
		forms,
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true
					}
				]
			}
		})
	]
} satisfies Config;
