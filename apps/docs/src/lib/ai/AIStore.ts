import type { components } from '$lib/common';
import type { FlexilteLayout } from '@flexilte/core';
import { writable } from 'svelte/store';

export const aiResultStore = writable<FlexilteLayout<typeof components>>();
