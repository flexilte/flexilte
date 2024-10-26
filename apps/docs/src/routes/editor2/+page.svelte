<script lang="ts">
	import { components, exampleStore, onChangeStore, trimLayoutTree } from '$lib/common';
	import DNDFlexilte from '$lib/dnd/DNDFlexilte.svelte';
	import type { LayoutConfig } from '$lib/dnd/types';
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
		openDrawer();
	});

	const openDrawer = () => {
		drawerStore.open({ id: 'editor2', position: 'left', width: 'w-1/6' });
	};

	const finalizeCallback = (
		type: 'rows' | 'cols',
		event: CustomEvent<DndEvent<LayoutConfig<typeof components>>>
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
	};

	const itemClickCallback = (e: LayoutConfig<typeof components>) => {
		console.log(e);
	};
</script>

{#if layoutConfig}
	<div class="px-4 container mx-auto mt-4">
		<div>
			<button class="btn variant-filled-primary w-fit" on:click={openDrawer}>Open Drawer</button>
		</div>

		<div class="mt-4">
			<DNDFlexilte {layoutConfig} {components} debug={true} {finalizeCallback} {itemClickCallback}
			></DNDFlexilte>
		</div>
	</div>
{/if}
