<script lang="ts">
	import { components } from '$lib/common';
	import { Flexilte, type FlexilteLayout } from '@flexilte/core';
	import { onMount } from 'svelte';

	let layout: FlexilteLayout<typeof components> = {};

	onMount(async () => {
		const res = await fetch('frontpage.json');
		layout = await res.json();
	});
</script>

<svelte:head>
	<title>Flexilte</title>
	<meta
		name="description"
		content="Welcome to Flexilte! Explore dynamic layouts and flexible UI components."
	/>
</svelte:head>

<Flexilte {layout} {components}></Flexilte>
<div
	class="
   p-4 text-center text-primary-800 underline
   dark:text-primary-100
 "
>
	<a href="frontpage.json">Click here to see the JSON of this page</a>
</div>
