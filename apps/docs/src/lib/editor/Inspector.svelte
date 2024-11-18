<script lang="ts">
	import type { LayoutConfig } from '@flexilte/core';
	import { componentValueStore, selectedComponentStore } from './editorStore';
	import { exampleStore, removeTree, updateTree, type components } from '$lib/common';

	let elId: string;
	let comp: LayoutConfig<typeof components>;
	let props: string[] = [];
	selectedComponentStore.subscribe((node) => {
		if (node && node.props) {
			comp = node;
			props = Object.keys(node.props);
		}
	});

	const updateNode = () => {
		exampleStore.update((s) => {
			return updateTree(s, comp.id, comp);
		});
	};

	const removeNode = (e) => {
		exampleStore.update((s) => {
			return removeTree(s, comp.id);
		});
		comp = undefined;
		props = [];
	};

	// componentValueStore.subscribe(console.log);
</script>

<div class="overflow-auto h-full">
	{#if props.length > 0}
		<div class="form-group">
			<button type="button" class="btn variant-filled-error" on:click={removeNode}>Remove</button>
			<h6 class="h6">Props</h6>
			{#each props as prop}
				<label class="label">
					<span>{prop}</span>
					<input
						class="input"
						type="text"
						placeholder="Input"
						value={comp.props[prop]}
						on:change={(e) => {
							comp.props[prop] = e.target.value;
							updateNode();
						}}
					/>
				</label>
			{/each}
			<h6 class="h6 mt-4">Layout</h6>
			<label class="label">
				<span>posX</span>
				<select
					class="select"
					value={comp.posX || ''}
					on:change={(e) => {
						comp.posX = e.target.value;
						updateNode();
					}}
				>
					<option value="left">left</option>
					<option value="middle">middle</option>
					<option value="right">right</option>
				</select>
			</label>
			<label class="label">
				<span>posY</span>
				<select
					class="select"
					value={comp.posY || ''}
					on:change={(e) => {
						comp.posY = e.target.value;
						updateNode();
					}}
				>
					<option value="top">top</option>
					<option value="middle">middle</option>
					<option value="bottom">bottom</option>
				</select>
			</label>
		</div>
	{/if}
</div>
