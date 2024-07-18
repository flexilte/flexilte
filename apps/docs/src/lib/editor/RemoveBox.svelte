<script lang="ts">
	import Icon from '@iconify/svelte';
	let sortableList: HTMLDivElement;
</script>

<div class="relative h-32 w-full" bind:this={sortableList}>
	<div
		id="trash"
		class="h-32 w-full bg-slate-400 border-2 border-slate-600 flex items-center justify-center absolute inset-0 z-10 opacity-75"
	>
		<Icon class="h-12 w-12 text-slate-300" icon="mdi:trash-outline" />
	</div>
</div>
