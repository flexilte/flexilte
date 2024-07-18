<script lang="ts">
	import { onMount } from 'svelte';

	// you can get value from both slot or bind:res
	export let url: string;
	export let res: any;
	let isLoading: boolean;
	let response: any;
	let error: any;
	isLoading = true;

	onMount(() => {
		fetch(url)
			.then((r) => r.json())
			.then((j) => {
				isLoading = false;
				response = j;
				res = j;
			})
			.catch((e) => {
				isLoading = false;
				console.error(e);
				error = e;
			});
	});
</script>

{#if isLoading}
	<slot name="loading" />
{:else if error}
	<slot name="fallback" {error} />
{:else}
	<slot {response} />
{/if}
