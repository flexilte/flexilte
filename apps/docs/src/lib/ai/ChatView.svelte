<script lang="ts">
	import { Flexilte, type LayoutConfig } from '@flexilte/core';
	import { aiResultStore } from '$lib/ai/AIStore';
	import { components } from '$lib/common';
	import { onMount } from 'svelte';

	let layoutConfig: LayoutConfig<typeof components> = {
		rows: [
			{
				cols: [
					{
						component: 'TextBox',
						props: {
							text: 'Waiting for input'
						},
						posX: 'middle',
						posY: 'middle',
						nodeClass: 'h-96'
					}
				]
			}
		]
	};

	onMount(() => {
		const aiStore = sessionStorage.getItem('aiStore');
		if (aiStore) {
			layoutConfig = JSON.parse(aiStore);
		}
	});
</script>

<div class="px-4 container mx-auto h-[30rem] w-full">
	<Flexilte layoutConfig={$aiResultStore ?? layoutConfig} {components}></Flexilte>
</div>
