<script lang="ts">
	import { components } from '$lib/common';
	import DNDFlexilte from '$lib/dnd/DNDFlexilte.svelte';
	import type { LayoutConfig } from '$lib/dnd/types';
	import { v4 as uuidv4 } from 'uuid';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	import type { DndEvent } from 'svelte-dnd-action';
	const drawerStore = getDrawerStore();

	const items = [
		{
			icon: 'mdi:format-text',
			name: 'TextBox',
			comp: 'TextBox'
		},
		{
			icon: 'mdi:image',
			name: 'ImageBox',
			comp: 'ImageBox'
		},
		{
			icon: 'mdi:card-text',
			name: 'CardBox',
			comp: 'CardBox'
		},
		{
			icon: 'mdi:code',
			name: 'CodeBlock',
			comp: 'CodeBlock'
		},
		{
			icon: 'mdi:people',
			name: 'Avatar',
			comp: 'Avatar'
		}
	];

	const layoutConfig: LayoutConfig<typeof components> = {
		id: uuidv4(),
		rows: items.map((item) => {
			return {
				id: uuidv4(),
				component: 'CardBox',
				props: {
					icon: item.icon,
					body: item.name
				},
				comp: item.comp,
				nodeClass: 'variant-filled-surface text-center'
			};
		})
	};

	const considerCallback = (
		type: 'rows' | 'cols',
		event: CustomEvent<DndEvent<LayoutConfig<typeof components>>>
	) => {
		drawerStore.close();
	};
</script>

<div class="container mx-auto mt-12">
	<DNDFlexilte {layoutConfig} {components} debug={true} {considerCallback}></DNDFlexilte>
</div>
