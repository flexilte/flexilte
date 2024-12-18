import type { ComponentType } from 'svelte';
import type { LayoutConfig } from '@flexilte/core';
import type { SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';

export interface DNDLayoutConfig<C extends Record<string, ComponentType>> extends LayoutConfig<C> {
	id: string;
	comp?: string;
	rows?: DNDLayoutConfig<C>[];
	cols?: DNDLayoutConfig<C>[];
	[SHADOW_ITEM_MARKER_PROPERTY_NAME]?: string;
}
