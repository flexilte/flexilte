import type { ComponentType } from 'svelte';

export interface LayoutConfig<C extends Record<string, ComponentType>> {
	id?: string; // will be added to the element
	width?: string; // tailwind class for the width (w-1/6)
	component?: keyof C & string; // component name
	props?: Record<string, any>; // component props
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
