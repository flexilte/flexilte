<script lang="ts">
	import { components } from '$lib/common';
	import { Flexilte } from '@flexilte/core';
	import { onMount } from 'svelte';
	let layoutConfig = {};
	onMount(async () => {
		const res = await fetch('example.json');
		layoutConfig = await res.json();
	});
</script>

<svelte:head>
	<title>Flexilte Example</title>
	<meta
		name="description"
		content="See a live example of Flexilte in action. Explore layout and debug features."
	/>
</svelte:head>

<div class="px-4 container mx-auto">
	<Flexilte {layoutConfig} {components} debug={true}></Flexilte>
</div>
<div class="text-center p-4 underline text-primary-800 dark:text-primary-100">
	<a href="example.json">Click here to see the JSON of this page</a>
</div>
