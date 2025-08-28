<script lang="ts">
	import { Button, Heading, P } from 'flowbite-svelte';

	interface Props {
		text: string;
		link: string;
		variant?: string;
	}

	let { text, link, variant }: Props = $props();
</script>

<Button outline={variant?.includes('outline')} pill={variant?.includes('pill')} href={link}
	>{text}</Button
>
