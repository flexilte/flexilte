<script lang="ts">
	import Icon from '@iconify/svelte';
	export let img = '';
	export let icon = '';
	export let title = '';
	export let body = '';
	export let link = '';
	export let footer = '';
	export let style = 'bg-initial';
	export let iconColor = 'variant-filled-tertiary';
</script>

<div class="w-full">
	{#if link}
		<a href={link}
			><div class={`card ${style} card-hover overflow-hidden h-full`}>
				{#if img}
					<div class="w-full max-h-64 overflow-hidden flex justify-center items-center">
						<img class="object-cover object-center" src={img} alt="" />
					</div>
				{/if}
				{#if icon}
					<div class={`flex items-center justify-center h-12 ${iconColor}`}><Icon {icon} /></div>
				{/if}
				{#if title}
					<header class="card-header">
						<h3 class="h3">{title}</h3>
					</header>
				{/if}
				{#if body}
					<section class="p-4">{body}</section>
				{/if}
				{#if footer}
					<footer class="card-footer">{title}</footer>
				{/if}
			</div>
		</a>
	{:else}
		<div class={`card ${style} card-hover overflow-hidden h-full`}>
			{#if img}
				<div class="w-full max-h-64 overflow-hidden">
					<img class="w-full h-full object-cover object-center" src={img} alt="" />
				</div>
			{/if}
			{#if icon}
				<div class={`flex items-center justify-center h-12 ${iconColor}`}><Icon {icon} /></div>
			{/if}
			{#if title}
				<header class="card-header">
					<h3 class="h3">{title}</h3>
				</header>
			{/if}
			{#if body}
				<section class="p-4">{body}</section>
			{/if}
			{#if footer}
				<footer class="card-footer">{title}</footer>
			{/if}
		</div>
	{/if}
</div>
