<script lang="ts">
	import { components } from '$lib/common';
	import { DNDFlexilte, type DNDLayoutConfig } from '@flexilte/dnd';
	import { v4 as uuidv4 } from 'uuid';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { TRIGGERS, type DndEvent } from 'svelte-dnd-action';

	const drawerStore = getDrawerStore();

	interface Item {
		icon: string;
		name: string;
		comp: string;
	}

	const items: Item[] = [
		{ icon: 'mdi:format-text', name: 'TextBox', comp: 'TextBox' },
		{ icon: 'mdi:image', name: 'ImageBox', comp: 'ImageBox' },
		{ icon: 'mdi:card-text', name: 'CardBox', comp: 'CardBox' },
		{ icon: 'mdi:people', name: 'Avatar', comp: 'Avatar' },
		{ icon: 'mdi:table-column-plus-after', name: 'Vertical Group', comp: 'VerticalGroup' },
		{ icon: 'mdi:table-row-plus-after', name: 'Horizontal Group', comp: 'HorizontalGroup' },
		{ icon: 'mdi:keyboard-space', name: 'Spacing', comp: 'Spacing' },
		{ icon: 'mdi:button-pointer', name: 'Button', comp: 'ButtonBox' }
	];

	let layoutConfig: DNDLayoutConfig<typeof components> = createLayoutConfig();

	function createLayoutConfig(): DNDLayoutConfig<typeof components> {
		return {
			id: uuidv4(),
			rows: items.map((item) => ({
				id: uuidv4(),
				component: 'CardBox',
				props: {
					icon: item.icon,
					body: item.name,
					style: 'w-36'
				},
				comp: item.comp,
				nodeClass: 'text-center'
			}))
		};
	}

	const considerCallback = (
		type: 'rows' | 'cols',
		itemCur: DNDLayoutConfig<typeof components>,
		e: CustomEvent<DndEvent<DNDLayoutConfig<typeof components>>>
	) => {
		drawerStore.close();
		console.warn(`Received consider event: ${JSON.stringify(e.detail, null, 2)}`);
		const { trigger } = e.detail.info;

		if (trigger === TRIGGERS.DRAG_STARTED) {
			layoutConfig = createLayoutConfig();
		}
	};
</script>

<div class="container mx-auto my-4">
	<DNDFlexilte {layoutConfig} {components} {considerCallback} />
</div>
