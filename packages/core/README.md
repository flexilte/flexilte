# Flexilte

Flexilte is a powerful Svelte framework that transforms JSON into flex-based pages. It supports any frontend UI framework and custom components, allowing for dynamic page creation and easy integration with AI-generated layouts.

**DEMO https://flexilte.github.io/**

(Yes this entire website is Flexilte json generated)

**Flexilte is svelte 5 ready! If you want to use for svelte 4, please use Flexilte v2**

## Features

- JSON-driven layout generation
- Support for custom components and any frontend UI framework
- AI-powered page generation
- Flexible and responsive designs

## Installation

Install Flexilte:

```bash
npm install @flexilte/core
```

If you use [skeleton](https://github.com/skeletonlabs/skeleton), Flexilte comes with wrappers:

```bash
npm install @flexilte/core
```

## Basic Usage

Assuming you are ready using a framework. Lets say flowbite.

```svelte
<script lang="ts">
	import { Flexilte } from '@flexilte/core';
	import { Tags } from 'flowbite-svelte';
	export const components = {
		Tags
	};
	const layout: FlexilteLayout<typeof components> = {
		rows: [
			{
				cols: {
					component: 'Tags',
					props: {
						availableTags: ['Cat', 'Dog'],
						placeholder: 'Your favorite pet?'
					}
				}
			}
		]
	};
</script>

<Flexilte {layout} {components}></Flexilte>
```

## Layout Config Model

Layout config is a recursive tree.

```ts
export interface FlexilteLayout<C extends Record<string, Component<any>>> {
	id?: string; // optional id set to the each layer
	width?: string; // tailwind class for the width (w-1/6)
	component?: keyof C & string; // component name
	props?: Record<string, unknown>; // component props
	nodeClass?: string; // classes apply to cols/rows/elements
	layoutClass?: string; // classes apply to cols/rows
	cols?: FlexilteLayout<C>[]; // array of itself
	rows?: FlexilteLayout<C>[]; // array of itself
	posX?: 'left' | 'right' | 'middle'; // we solved css! choose how to position your element horizontally
	posY?: 'top' | 'bottom' | 'middle'; // we solved css! choose how to position your element vertically
	wrap?: 'wrap' | 'nowrap'; // choose if element wrap around flex way
	gap?: string; // tailwind class for the gap (gap-4)
}
```
