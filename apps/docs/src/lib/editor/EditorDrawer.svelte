<script lang="ts">
	import { components } from '$lib/common';
	import DNDFlexilte from '$lib/dnd/DNDFlexilte.svelte';
	import type { LayoutConfig } from '$lib/dnd/types';
	import { v4 as uuidv4 } from 'uuid';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	import { TRIGGERS, type DndEvent } from 'svelte-dnd-action';

	const drawerStore = getDrawerStore();

	const items = [
		{ id: uuidv4(), icon: 'mdi:format-text', name: 'TextBox', comp: 'TextBox' },
		{ id: uuidv4(), icon: 'mdi:image', name: 'ImageBox', comp: 'ImageBox' },
		{ id: uuidv4(), icon: 'mdi:card-text', name: 'CardBox', comp: 'CardBox' },
		{ id: uuidv4(), icon: 'mdi:people', name: 'Avatar', comp: 'Avatar' },
		{
			id: uuidv4(),
			icon: 'mdi:table-column-plus-after',
			name: 'Vertical Group',
			comp: 'VerticalGroup'
		},
		{
			id: uuidv4(),
			icon: 'mdi:table-row-plus-after',
			name: 'Horizontal Group',
			comp: 'HorizontalGroup'
		},
		{
			id: uuidv4(),
			icon: 'mdi:keyboard-space',
			name: 'Spacing',
			comp: 'Spacing'
		},
		{
			id: uuidv4(),
			icon: 'mdi:button-pointer',
			name: 'Button',
			comp: 'ButtonBox'
		}
	];

	let layoutConfig: LayoutConfig<typeof components> = {
		id: uuidv4(),
		rows: items.map((item) => {
			return {
				id: uuidv4(),
				component: 'CardBox',
				props: {
					icon: item.icon,
					body: item.name,
					style: 'w-36'
				},
				comp: item.comp,
				nodeClass: 'text-center'
			};
		})
	};

	const considerCallback = (
		type: 'rows' | 'cols',
		itemCur: LayoutConfig<typeof components>,
		e: CustomEvent<DndEvent<LayoutConfig<typeof components>>>
	) => {
		drawerStore.close();
		console.warn(`got consider ${JSON.stringify(e.detail, null, 2)}`);
		const { trigger, id } = e.detail.info;
		if (trigger === TRIGGERS.DRAG_STARTED) {
			layoutConfig = {
				id: uuidv4(),
				rows: items.map((item) => {
					return {
						id: uuidv4(),
						component: 'CardBox',
						props: {
							icon: item.icon,
							body: item.name,
							style: 'w-36'
						},
						comp: item.comp,
						nodeClass: 'variant-filled-surface text-center'
					};
				})
			};
		}
	};
</script>

<div class="container mx-auto my-4">
	<DNDFlexilte {layoutConfig} {components} {considerCallback}></DNDFlexilte>
</div>
