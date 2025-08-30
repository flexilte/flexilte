<script lang="ts">
	import { Flexilte, type FlexilteLayout } from '@flexilte/core';
	import { aiResultStore } from '$lib/ai/AIStore';
	import { onMount } from 'svelte';
	import { components } from '$lib/common';

	let layout: FlexilteLayout<typeof components> = {
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
			layout = JSON.parse(aiStore);
		}
	});
</script>

<div class="container mx-auto h-[30rem] w-full px-4">
	<Flexilte layout={$aiResultStore ?? layout} {components}></Flexilte>
</div>
