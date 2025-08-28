import type { Component } from 'svelte';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface LayoutConfig<C extends Record<string, Component<any>>> {
	id?: string;
	width?: string;
	component?: keyof C & string;
	props?: Record<string, unknown>;
	nodeClass?: string;
	layoutClass?: string;
	cols?: LayoutConfig<C>[];
	rows?: LayoutConfig<C>[];
	posX?: 'left' | 'right' | 'middle';
	posY?: 'top' | 'bottom' | 'middle';
	wrap?: 'wrap' | 'nowrap';
	gap?: string;
}
