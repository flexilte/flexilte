<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';

	interface Props {
		text: string;
		type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		classList?: string;
	}

	let { text, type, classList }: Props = $props();
</script>

{#if type}
	<Heading tag={type} class={classList}>{text}</Heading>
{:else}
	<P class={classList}>{text}</P>
{/if}
