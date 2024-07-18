<script lang="ts">
	import { getDrawerStore, getModalStore } from '@skeletonlabs/skeleton';
	import { componentStore, triggerRefresh } from './editorStore';

	export let type = '';
	const modalStore = getModalStore();
	const exportJson = () => {
		modalStore.trigger({
			type: 'component',
			component: 'ExportBox',
			meta: {
				language: 'json',
				code: JSON.stringify($componentStore, null, 2)
			}
		});
	};
	const drawerStore = getDrawerStore();
</script>

{#if type === 'render'}
	<button
		class="btn variant-filled-secondary"
		on:click={() => {
			drawerStore.close();
			triggerRefresh.update((e) => !e);
		}}>Render</button
	>
{:else if type === 'export'}
	<button class="btn variant-filled-tertiary" on:click={exportJson}>Export</button>
{:else if type === 'edit'}
	<button
		class="btn variant-filled-primary"
		on:click={() => drawerStore.open({ id: 'editor', position: 'bottom', height: 'h-5/6' })}
		>Edit</button
	>
{/if}
