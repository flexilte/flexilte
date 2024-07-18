<script lang="ts">
	import { exampleStore } from '$lib/common';
	import { Flexilte, type LayoutConfig } from '@flexilte/core';
	import { TextBox } from '@flexilte/skeleton';
	import { ProgressBar, ProgressRadial } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	const components = { TextBox, ProgressRadial, ProgressBar };
</script>

{#if $exampleStore}
	<div class="px-4 container mx-auto">
		<Flexilte layoutConfig={$exampleStore} {components} debug={true}></Flexilte>
	</div>
	<div class="text-center m-4 underline">
		<a href="example.json">Click here to see the JSON of this page</a>
	</div>
{/if}
