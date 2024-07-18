import type { LayoutConfig } from '@flexilte/core';
import { TextBox, ImageBox, CardBox } from '@flexilte/skeleton';
import { writable } from 'svelte/store';
import type { GridStackOptions } from 'gridstack/dist/es5/gridstack';
import DNDList from './DNDList.svelte';
import RemoveBox from './RemoveBox.svelte';
import ActionButton from './ActionButton.svelte';
import DNDBuilder from './DNDBuilder.svelte';
import Inspector from './Inspector.svelte';
export const components = {
	TextBox,
	ImageBox,
	CardBox,
	DNDList,
	RemoveBox,
	ActionButton,
	DNDBuilder,
	Inspector
};

export const selectedComponentStore = writable<string>();
export const componentValueStore = writable<Record<string, LayoutConfig<typeof components>>>({});
export const componentStore = writable<LayoutConfig<typeof components>>({});
export const gridStore = writable<GridStackOptions>();
export const triggerRefresh = writable<boolean>();
