import type { ComponentType } from 'svelte';

export interface LayoutConfig<C extends Record<string, ComponentType>> {
	id: string;
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
	alignHeight?: boolean;
	wrap?: 'wrap' | 'nowrap';
	gap?: string;
	noAutoMobile?: boolean;
	thing?: boolean
}
