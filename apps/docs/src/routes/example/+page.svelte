<script lang="ts">
	import { components } from '$lib/common';
	import { Flexilte } from '@flexilte/core';
	import { onMount } from 'svelte';
	let layout = {};
	onMount(async () => {
		const res = await fetch('example.json');
		layout = await res.json();
	});
</script>

<svelte:head>
	<title>Flexilte Example</title>
	<meta
		name="description"
		content="See a live example of Flexilte in action. Explore layout and debug features."
	/>
</svelte:head>

<div class="container mx-auto px-4">
	<Flexilte {layout} {components} debug={true}></Flexilte>
</div>
<div
	class="
   p-4 text-center text-primary-800 underline
   dark:text-primary-100
 "
>
	<a href="example.json">Click here to see the JSON of this page</a>
</div>
