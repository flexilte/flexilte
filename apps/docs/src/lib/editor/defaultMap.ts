import type { LayoutConfig } from '@flexilte/core';
import { components, exampleStore, onChangeStore, trimLayoutTree } from '$lib/common';
import { v4 as uuidv4 } from 'uuid';

export default {
	TextBox: {
		component: 'TextBox',
		props: { text: 'text', type: 'h1' },
		posX: 'middle',
		posY: 'middle'
	},
	ImageBox: {
		component: 'ImageBox',
		props: {
			url: 'https://placedog.net/200/200'
		},
		posX: 'middle',
		posY: 'middle',
		nodeClass: 'min-w-6'
	},
	CardBox: {
		component: 'CardBox',
		props: {
			title: 'titleasdaaastitleasdaaastitleasdaaas',
			icon: 'ic:coffee',
			body: 'body',
			footer: 'footer'
		},
		posX: 'middle',
		posY: 'middle'
	},
	Avatar: {
		component: 'Avatar',
		props: {
			src: 'https://placedog.net/512/512',
			width: 'w-32',
			rounded: 'rounded-full'
		},
		posX: 'middle',
		posY: 'middle'
	},
	ButtonBox: {
		component: 'Avatar',
		props: {
			text: 'text',
			icon: '',
			link: 'https//google.com',
			newTab: true
		},
		posX: 'middle',
		posY: 'middle'
	}
} as Record<string, LayoutConfig<typeof components>>;
