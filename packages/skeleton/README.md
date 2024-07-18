# Flexilte Skeleton

# See [Flexilte Core](https://www.npmjs.com/package/@flexilte/core) for documentation

Flexilte is a powerful Svelte framework that transforms JSON into flex-based pages. It supports any frontend UI framework and custom components, allowing for dynamic page creation and easy integration with AI-generated layouts.

**DEMO https://flexilte.github.io/**

(Yes this entire website is Flexilte json generated)

## Features

- JSON-driven layout generation
- Support for custom components and any frontend UI framework
- AI-powered page generation
- Drag-and-drop editor
- Flexible and responsive designs

## Installation

Install Flexilte:

```bash
npm install @flexilte/core
```

If you use [skeleton](https://github.com/skeletonlabs/skeleton), Flexilte comes with wrappers:

```bash
npm install @flexilte/core @flexilte/skeleton
```

## Basic Usage

```svelte
<script lang="ts">
	import { Flexilte } from '@flexilte/core';
	export const components = {
		Avatar
	};
	const layoutConfig: LayoutConfig<typeof components> = {
		rows: [
			{
				cols: {
					component: 'Avatar',
					props: {
						src: 'https://placedog.net/512/512',
						width: 'w-32',
						rounded: 'rounded-full'
					}
				}
			}
		]
	};
</script>

<Flexilte layoutConfig={$docStore} {components}></Flexilte>
```

## Layout Config Model

Layout config is a recursive tree.

```ts
interface LayoutConfig<C extends Record<string, ComponentType>> {
	id?: string; // will be added to the element
	width?: string; // tailwind class for the width (w-1/6)
	component?: keyof C & string; // component name
	props?: Record<string, unknown>; // component props
	nodeClass?: string; // classes apply to cols/rows/elements
	wrapperClass?: string; // create and wrap element with a wrapper, this is a short hand for components that doesn't like flex box
	layoutClass?: string; // classes apply to cols/rows
	cols?: LayoutConfig<C>[]; // array of itself
	rows?: LayoutConfig<C>[]; // array of itself
	posX?: 'left' | 'right' | 'middle'; // we solved css! choose how to position your element horizontally
	posY?: 'top' | 'bottom' | 'middle'; // we solved css! choose how to position your element vertically
	alignHeight?: boolean; // if true then all element in the same row/col will align at the bottom
	wrap?: 'wrap' | 'nowrap'; // choose if element wrap around flex way
	gap?: string; // tailwind class for the gap (gap-4)
}
```
