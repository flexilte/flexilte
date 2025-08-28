<script lang="ts">
	import { components } from '$lib/common';
	import { DNDFlexilte, type DNDLayoutConfig } from '@flexilte/dnd';
	import defaultMap from '$lib/editor/defaultMap';
	import EditorDrawer from '$lib/editor/EditorDrawer.svelte';
	import Inspector from '$lib/editor/Inspector.svelte';
	import type { DndEvent } from 'svelte-dnd-action';

	import { v4 as uuidv4 } from 'uuid';
	import { onMount } from 'svelte';
	import { editorStore, trimLayoutTree, selectedComponentStore } from '$lib/editor/utils';
	import { Toggle } from 'flowbite-svelte';
	import { addIdField } from '$lib/utils';

	let timeoutId: number;
	let layoutConfig: DNDLayoutConfig<typeof components> = {
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

	$: layoutConfig = $editorStore;
	let isMobile = false;
	let debug = false;

	onMount(async () => {
		isMobile = window.innerWidth <= 768;
		const res = await fetch('template1.json');
		const j = await res.json();
		editorStore.set(addIdField(j));
	});

	const finalizeCallback = (
		type: 'rows' | 'cols',
		itemCur: DNDLayoutConfig<typeof components>,
		e: CustomEvent<DndEvent<DNDLayoutConfig<typeof components>>>
	) => {
		clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => {
			editorStore.update((s) => {
				return (
					trimLayoutTree(s) || ({ id: Date.now().toString() } as DNDLayoutConfig<typeof components>)
				);
			});
		}, 250);

		console.log(type, itemCur, e);

		itemCur[type] = e.detail.items.map((item) => {
			if (item.id === e.detail.info.id && item.comp) {
				if (item.comp === 'VerticalGroup') {
					return {
						id: uuidv4(),
						gap: 'gap-4',
						cols: [
							{ ...defaultMap['TextBox'], id: uuidv4(), props: { text: 'Drag an element here' } },
							{ ...defaultMap['TextBox'], id: uuidv4(), props: { text: 'Drag an element here' } }
						]
					};
				}
				if (item.comp === 'HorizontalGroup') {
					return {
						id: uuidv4(),
						gap: 'gap-4',
						rows: [
							{ ...defaultMap['TextBox'], id: uuidv4(), props: { text: 'Drag an element here' } },
							{ ...defaultMap['TextBox'], id: uuidv4(), props: { text: 'Drag an element here' } }
						]
					};
				}
				return { ...JSON.parse(JSON.stringify(defaultMap[item.comp])), id: uuidv4() };
			} else {
				return item;
			}
		});
		console.log(itemCur[type]);

		// itemCur = { ...itemCur };
	};

	const itemClickCallback = (_: MouseEvent, l: DNDLayoutConfig<typeof components>) => {
		selectedComponentStore.set(l);
	};

	const exportLayout = () => {
		// const modal: ModalSettings = {
		// 	type: 'component',
		// 	component: 'ExportBox',
		// 	meta: {
		// 		language: 'json',
		// 		code: JSON.stringify($editorStore, null, 2)
		// 	}
		// };
		// modalStore.trigger(modal);
	};
</script>

{#if isMobile}
	<div class="flex items-center justify-center h-screen text-center mx-6">
		<h1 class="h1">This feature not supported on mobile</h1>
	</div>
{:else if layoutConfig}
	<div class="px-4 container mx-auto mt-4">
		<div class="flex justify-end gap-4">
			<div class="mt-2">
				<Toggle name="slider-label" bind:checked={debug}>Debug View</Toggle>
			</div>
			<button class="btn variant-filled-primary w-fit" on:click={exportLayout}>Export Layout</button
			>
		</div>

		<div class="mt-4 flex">
			<div class="w-1/6 variant-filled-surface">
				<EditorDrawer></EditorDrawer>
			</div>
			<div class="w-full mx-4">
				<DNDFlexilte {layoutConfig} {components} {finalizeCallback} {itemClickCallback} {debug}
				></DNDFlexilte>
			</div>
			<div class="w-1/6 variant-filled-surface">
				<Inspector></Inspector>
			</div>
		</div>
	</div>
{/if}
