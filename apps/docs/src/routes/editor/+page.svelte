<script lang="ts">
	import { Flexilte, type LayoutConfig } from '@flexilte/core';
	import { components, componentStore } from '$lib/editor/editorStore';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	const config: LayoutConfig<typeof components> = {
		rows: [
			{
				cols: [
					{
						posY: 'middle',
						component: 'TextBox',
						props: {
							type: 'h2',
							text: 'Preview'
						}
					},
					{
						width: 'w-1/6',
						posX: 'right',
						rows: [
							{
								cols: [
									{
										component: 'ActionButton',
										props: {
											type: 'edit'
										}
									},
									{
										component: 'ActionButton',
										props: {
											type: 'export'
										}
									}
								]
							}
						]
					}
				]
			}
		]
	};

	const drawerStore = getDrawerStore();
	let isMobile = false;

	onMount(() => {
		isMobile = window.innerWidth <= 768;
		if (!isMobile) {
			drawerStore.open({ id: 'editor', position: 'bottom', height: 'h-5/6' });
		}
	});
</script>

{#if isMobile}
	<div class="flex items-center justify-center h-screen text-center mx-6">
		<h1 class="h1">This feature not supported on mobile</h1>
	</div>
{:else}
	<div class="p-4 bg-surface-50-900-token">
		<Flexilte layoutConfig={config} {components}></Flexilte>
	</div>

	{#if $componentStore}
		<div class="container mx-auto mt-12">
			<Flexilte layoutConfig={$componentStore} {components}></Flexilte>
		</div>
	{/if}
{/if}
