<script lang="ts">
	import { components, exampleStore, onChangeStore, trimLayoutTree } from '$lib/common';
	import DNDFlexilte from '$lib/dnd/DNDFlexilte.svelte';
	import type { LayoutConfig } from '$lib/dnd/types';
	import defaultMap from '$lib/editor/defaultMap';
	import DndList from '$lib/editor/DNDList.svelte';
	import EditorDrawer from '$lib/editor/EditorDrawer.svelte';
	import { selectedComponentStore } from '$lib/editor/editorStore';
	import Inspector from '$lib/editor/Inspector.svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type { DndEvent } from 'svelte-dnd-action';

	import { v4 as uuidv4 } from 'uuid';
	let timeoutId: NodeJS.Timeout;
	let layoutConfig: LayoutConfig<typeof components> = {
		id: uuidv4(),
		gap: 'gap-4',
		rows: [
			{
				id: uuidv4(),
				component: 'TextBox',
				props: {
					text: 'Component Drawer'
				}
			}
		]
	};

	$: layoutConfig = $exampleStore;

	const drawerStore = getDrawerStore();
	onMount(() => {
		// openDrawer();
	});

	const openDrawer = () => {
		drawerStore.open({ id: 'editor2', position: 'left', width: 'w-1/6' });
	};

	const finalizeCallback = (
		type: 'rows' | 'cols',
		itemCur: LayoutConfig<typeof components>,
		e: CustomEvent<DndEvent<LayoutConfig<typeof components>>>
	) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			exampleStore.update((s) => {
				const a =
					trimLayoutTree(s) || ({ id: Date.now().toString() } as LayoutConfig<typeof components>);
				console.log('result', a);
				return a;
			});
		}, 250);

		console.log(type, itemCur, e);

		itemCur[type] = e.detail.items.map((item) => {
			if (item.id === e.detail.info.id && item.comp) {
				if (item.comp === 'VerticalGroup') {
					return {
						id: uuidv4(),
						cols: [
							{ ...defaultMap['TextBox'], id: uuidv4(), props: { text: 'Drag an element here' } },
							{ ...defaultMap['TextBox'], id: uuidv4(), props: { text: 'Drag an element here' } }
						]
					};
				}
				if (item.comp === 'HorizontalGroup') {
					return {
						id: uuidv4(),
						rows: [
							{ ...defaultMap['TextBox'], id: uuidv4(), props: { text: 'Drag an element here' } },
							{ ...defaultMap['TextBox'], id: uuidv4(), props: { text: 'Drag an element here' } }
						]
					};
				}
				return { ...defaultMap[item.comp], id: uuidv4() };
			} else {
				return item;
			}
		});
		console.log(itemCur[type]);

		// itemCur = { ...itemCur };
	};

	const itemClickCallback = (e: LayoutConfig<typeof components>) => {
		selectedComponentStore.set(e);
	};
</script>

{#if layoutConfig}
	<div class="px-4 container mx-auto mt-4">
		<div>
			<button class="btn variant-filled-primary w-fit" on:click={openDrawer}>Open Drawer</button>
		</div>

		<div class="mt-4 flex">
			<div class="w-1/6">
				<EditorDrawer></EditorDrawer>
			</div>
			<div class="w-full mx-4">
				<DNDFlexilte {layoutConfig} {components} debug={true} {finalizeCallback} {itemClickCallback}
				></DNDFlexilte>
			</div>
			<div class="w-1/6">
				<Inspector></Inspector>
			</div>
		</div>
	</div>
{/if}
