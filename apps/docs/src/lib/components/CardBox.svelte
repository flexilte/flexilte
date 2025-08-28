<script lang="ts">
	import { Card, Button, Toggle } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';

	interface Props {
		img?: string;
		title?: string;
		body?: string;
		link?: string;
	}

	let { img, title, body, link }: Props = $props();
</script>

<div class="space-y-4 mx-auto w-fit">
	{#if link}
		<a href={link} class="transition-transform hover:scale-145">
			<Card {img}>
				<div class="m-6">
					{#if title}
						<h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{title}</h5>
					{/if}
					{#if body}
						<p class="mb-3 leading-tight font-normal text-gray-700 dark:text-gray-400">{body}</p>
					{/if}
				</div>
			</Card>
		</a>
	{:else}<Card {img}>
			<div class="m-6">
				{#if title}
					<h5 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{title}</h5>
				{/if}
				{#if body}
					<p class="mb-3 leading-tight font-normal text-gray-700 dark:text-gray-400">{body}</p>
				{/if}
			</div>
		</Card>
	{/if}
</div>
