<script lang="ts">
	import type { components } from '$lib/common';
	import { type DNDLayoutConfig } from '@flexilte/dnd';
	import { derived } from 'svelte/store';
	import { selectedComponentStore, editorStore, updateTree, removeTree } from './utils';

	type PosXValue = 'left' | 'middle' | 'right';
	type PosYValue = 'top' | 'middle' | 'bottom';
	type PositionType = 'posX' | 'posY';

	const selectedComponent = derived(selectedComponentStore, ($node) =>
		$node?.props ? $node : undefined
	);

	const handleUpdate = (id: string, updatedComp: DNDLayoutConfig<typeof components>) => {
		editorStore.update((state) => updateTree(state, id, updatedComp));
	};

	const handleRemove = (id: string) => {
		editorStore.update(
			(state) => removeTree(state, id) || ({} as DNDLayoutConfig<typeof components>)
		);
	};

	const handlePropChange = (
		comp: DNDLayoutConfig<typeof components>,
		prop: string,
		event: Event
	) => {
		const target = event.target as HTMLInputElement;
		if (comp.props && target) {
			comp.props[prop] = target.value;
			handleUpdate(comp.id!, comp);
		}
	};

	const handlePositionChange = (
		comp: DNDLayoutConfig<typeof components>,
		type: PositionType,
		event: Event
	) => {
		const target = event.target as HTMLSelectElement;
		if (target) {
			if (type === 'posX') {
				comp[type] = target.value as PosXValue;
			} else {
				comp[type] = target.value as PosYValue;
			}
			handleUpdate(comp.id!, comp);
		}
	};

	const positionOptions: Record<PositionType, Array<{ value: string; label: string }>> = {
		posX: [
			{ value: 'left', label: 'Left' },
			{ value: 'middle', label: 'Middle' },
			{ value: 'right', label: 'Right' }
		],
		posY: [
			{ value: 'top', label: 'Top' },
			{ value: 'middle', label: 'Middle' },
			{ value: 'bottom', label: 'Bottom' }
		]
	} as const;

	const positionTypes: PositionType[] = ['posX', 'posY'];
</script>

<div class="overflow-auto h-full p-4">
	{#if $selectedComponent && $selectedComponent.props}
		<div class="form-group">
			<button
				type="button"
				class="btn variant-filled-error"
				on:click={() => handleRemove($selectedComponent.id!)}
			>
				Remove
			</button>

			<h6 class="h6">Props</h6>
			{#each Object.entries($selectedComponent.props) as [prop, value] (prop)}
				<label class="label">
					<span>{prop}</span>
					<input
						class="input"
						type="text"
						placeholder="Input"
						{value}
						on:change={(e) => handlePropChange($selectedComponent, prop, e)}
					/>
				</label>
			{/each}

			<h6 class="h6 mt-4">Layout</h6>
			{#each positionTypes as posType (posType)}
				<label class="label">
					<span>{posType}</span>
					<select
						class="select"
						value={$selectedComponent[posType] || ''}
						on:change={(e) => handlePositionChange($selectedComponent, posType, e)}
					>
						{#each positionOptions[posType] as option (option.value)}
							<option value={option.value}>{option.label}</option>
						{/each}
					</select>
				</label>
			{/each}
		</div>
	{:else}
		<div>Click an element to edit it!</div>
	{/if}
</div>
