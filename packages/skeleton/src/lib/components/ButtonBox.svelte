<script lang="ts">
	import Icon from '@iconify/svelte';
	export let text = '';
	export let icon = '';
	export let link: string;
	export let newTab: boolean | undefined;
	export let variant = '';

	const openPage = () => {
		if (newTab) {
			window.open(link, '_blank');
		} else {
			window.location.href = link;
		}
	};
</script>

<div class="w-full flex justify-center items-center">
	{#if text && icon}
		<button
			type="button"
			class={`btn ${variant ? variant : 'variant-filled'}`}
			on:click={() => openPage()}
		>
			<span><Icon {icon} /></span>
			<span>{text}</span>
		</button>
	{:else if text}
		<button
			type="button"
			class={`btn ${variant ? variant : 'variant-filled'}`}
			on:click={() => openPage()}>{text}</button
		>
	{:else if icon}
		<button
			type="button"
			class={`btn-icon ${variant ? variant : 'variant-filled'}`}
			on:click={() => openPage()}><Icon {icon} /></button
		>
	{/if}
</div>
