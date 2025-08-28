import type { Component } from 'svelte';

export interface LayoutConfig<C extends Record<string, Component<any>>> {
	id?: string;
	width?: string;
	component?: keyof C & string;
	props?: Record<string, unknown>;
	nodeClass?: string;
	wrapperClass?: string;
	layoutClass?: string;
	cols?: LayoutConfig<C>[];
	rows?: LayoutConfig<C>[];
	posX?: 'left' | 'right' | 'middle';
	posY?: 'top' | 'bottom' | 'middle';
	wrap?: 'wrap' | 'nowrap';
	gap?: string;
}
