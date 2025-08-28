import type { Component } from 'svelte';
import type { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

export interface DNDLayoutConfig<C extends Record<string, Component<any>>> {
	id?: string;
	width?: string;
	component?: keyof C & string;
	props?: Record<string, unknown>;
	nodeClass?: string;
	wrapperClass?: string;
	layoutClass?: string;
	cols?: DNDLayoutConfig<C>[];
	rows?: DNDLayoutConfig<C>[];
	posX?: 'left' | 'right' | 'middle';
	posY?: 'top' | 'bottom' | 'middle';
	wrap?: 'wrap' | 'nowrap';
	gap?: string;
	comp?: string;
	[SHADOW_ITEM_MARKER_PROPERTY_NAME]?: string;
}
