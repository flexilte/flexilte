import type { ComponentType } from 'svelte';
import type { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

export interface LayoutConfig<C extends Record<string, ComponentType>> {
	id: string;
	[SHADOW_ITEM_MARKER_PROPERTY_NAME]: string;
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
	thing?: boolean;
}
