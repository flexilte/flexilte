<script lang="ts">
	import { CardBox } from '@flexilte/skeleton';

	const items = [
		{
			icon: 'mdi:format-text',
			name: 'TextBox'
		},
		{
			icon: 'mdi:image',
			name: 'ImageBox'
		},
		{
			icon: 'mdi:card-text',
			name: 'CardBox'
		},
		{
			icon: 'mdi:code',
			name: 'CodeBlock'
		},
		{
			icon: 'mdi:people',
			name: 'Avatar'
		}
	];
</script>

<div id="toolbox" class="sidebar flex flex-wrap gap-4 overflow-auto">
	{#each items as item}
		<div class="grid-stack-item w-32 cursor-grab select-none">
			<div class="grid-stack-item-content">
				<div data-comp={item.name}>
					<CardBox icon={item.icon} body={item.name} style="variant-filled-surface text-center" />
				</div>
			</div>
		</div>
	{/each}
</div>
