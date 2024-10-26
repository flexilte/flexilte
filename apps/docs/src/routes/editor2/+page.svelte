<script lang="ts">
	import { components, exampleStore, onChangeStore, trimLayoutTree } from '$lib/common';
	import Flexilte from '$lib/dnd/Flexilte.svelte';
	import type { LayoutConfig } from '$lib/dnd/types';
	let timeoutId: NodeJS.Timeout;
	let val: LayoutConfig<typeof components>;
	// const components = { TextBox, ProgressRadial, ProgressBar };
	onChangeStore.subscribe((a) => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			exampleStore.update((s) => {
				const a =
					trimLayoutTree(s) || ({ id: Date.now().toString() } as LayoutConfig<typeof components>);

				// const b = setLayoutIds(a);
				console.log(1, a);
				return a;
			});
		}, 250);
	});

	// onMount(()=>{
	// 	exampleStore.update(a=>setLayoutIds(a))

	// })
</script>

{#if $exampleStore}
	<div class="px-4 container mx-auto">
		<Flexilte layoutConfig={$exampleStore} {components} debug={true}></Flexilte>
	</div>
	<div class="text-center m-4 underline">
		<a href="example.json">Click here to see the JSON of this page</a>
	</div>
{/if}
