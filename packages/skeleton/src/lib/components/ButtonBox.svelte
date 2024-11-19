<script lang="ts">
	import Icon from '@iconify/svelte';
	export let text = '';
	export let icon = '';
	export let link: string;
	export let newTab: boolean | undefined;
	export let variant = '';
	export let style = '';
	export let dndMode = false;

	const openPage = (e: MouseEvent) => {
		if (newTab) {
			window.open(link, '_blank');
		} else {
			window.location.href = link;
		}
	};
</script>

<div class="w-full flex justify-center items-center">
	{#if text && icon}
		{#if !dndMode}
			<button
				type="button"
				class={`btn ${variant ? variant : 'variant-filled'} ${style}`}
				on:click={openPage}
			>
				<span><Icon {icon} /></span>
				<span>{text}</span>
			</button>
		{:else}
			<div class={`btn ${variant ? variant : 'variant-filled'} ${style}`}>
				<span><Icon {icon} /></span>
				<span>{text}</span>
			</div>
		{/if}
	{:else if text}
		{#if !dndMode}
			<button
				type="button"
				class={`btn ${variant ? variant : 'variant-filled'} ${style}`}
				on:click={openPage}>{text}</button
			>
		{:else}
			<div class={`btn ${variant ? variant : 'variant-filled'} ${style}`}>
				{text}
			</div>
		{/if}
	{:else if icon}
		{#if !dndMode}
			<button type="button" class={`btn-icon ${variant ? variant : 'variant-filled'} ${style}`}
				><Icon {icon} /></button
			>
		{:else}
			<div class={`btn-icon ${variant ? variant : 'variant-filled'} ${style}`}><Icon {icon} /></div>
		{/if}
	{/if}
</div>
