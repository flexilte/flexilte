<script lang="ts">
	import { Heading, P, Span } from 'flowbite-svelte';

	interface Props {
		text: string;
		type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		classList?: string;
		gradient?:
			| 'skyToEmerald'
			| 'purpleToBlue'
			| 'pinkToOrange'
			| 'tealToLime'
			| 'redToYellow'
			| 'indigoToCyan'
			| 'fuchsiaToRose'
			| 'amberToEmerald'
			| 'violetToRed'
			| 'blueToGreen'
			| 'orangeToPurple'
			| 'yellowToRed'
			| 'none';
	}

	let { text, type, classList, gradient }: Props = $props();
</script>

{#if type}
	<Heading tag={type} class={classList}>
		<Span {gradient}>{text}</Span>
	</Heading>
{:else}
	<P class={classList}>{text}</P>
{/if}
