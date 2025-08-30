<script lang="ts">
	import { components } from '$lib/common';
	import { Flexilte } from '@flexilte/core';
	import { onMount } from 'svelte';
	let layout = {};
	onMount(async () => {
		const res = await fetch('doc.json');
		layout = await res.json();
	});
</script>

<svelte:head>
	<title>Flexilte Docs</title>
	<meta
		name="description"
		content="Flexilte documentation page. Learn how to use Flexilte and its features."
	/>
</svelte:head>

<div class="container mx-auto px-4">
	<Flexilte {layout} {components}></Flexilte>
</div>
<div
	class="
   p-4 text-center text-primary-800 underline
   dark:text-primary-100
 "
>
	<a href="doc.json">Click here to see the JSON of this page</a>
</div>
