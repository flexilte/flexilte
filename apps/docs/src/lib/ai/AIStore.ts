import type { components } from '$lib/common';
import type { LayoutConfig } from '@flexilte/core';
import { writable } from 'svelte/store';

export const aiResultStore = writable<LayoutConfig<typeof components>>();
