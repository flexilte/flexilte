<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Card } from 'flowbite-svelte';

	interface Props {
		img?: string;
		title?: string;
		body?: string;
		link?: string;
		icon?: string;
	}

	let { img, title, body, link, icon }: Props = $props();

	const iconColor = 'text-gray-300';
</script>

<div class="mx-auto space-y-4">
	{#if link}
		<a
			href={link}
			class="
     transition-transform
     hover:scale-145
   "
		>
			<Card {img}>
				<div class="m-6">
					{#if icon}
						<div
							class={`
         flex h-12 items-center justify-center
         ${iconColor}
       `}
						>
							<Icon {icon} />
						</div>
					{/if}
					{#if title}
						<h5
							class="
         mb-2 text-2xl font-bold text-gray-900
         dark:text-white
       "
						>
							{title}
						</h5>
					{/if}
					{#if body}
						<p
							class="
         mb-3 leading-tight font-normal text-gray-700
         dark:text-gray-400
       "
						>
							{body}
						</p>
					{/if}
				</div>
			</Card>
		</a>
	{:else}<Card {img}>
			<div class="m-6">
				{#if icon}
					<div
						class={`
        flex h-12 items-center justify-center
        ${iconColor}
      `}
					>
						<Icon {icon} />
					</div>
				{/if}

				{#if title}
					<h5
						class="
        mb-2 text-2xl font-bold text-gray-900
        dark:text-white
      "
					>
						{title}
					</h5>
				{/if}
				{#if body}
					<p
						class="
        mb-3 leading-tight font-normal text-gray-700
        dark:text-gray-400
      "
					>
						{body}
					</p>
				{/if}
			</div>
		</Card>
	{/if}
</div>
