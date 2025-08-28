<script lang="ts">
	import { components } from '$lib/common';
	import { Flexilte } from '@flexilte/core';
	import { onMount } from 'svelte';
	let layoutConfig = {};
	onMount(async () => {
		const res = await fetch('frontpage.json');
		layoutConfig = await res.json();
	});
</script>

<div class="px-4 container mx-auto">
	<Flexilte {layoutConfig} {components}></Flexilte>
</div>
<div class="text-center p-4 underline text-primary-800 dark:text-primary-100">
	<a href="frontpage.json">Click here to see the JSON of this page</a>
</div>
