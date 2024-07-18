<script lang="ts">
	import type { LayoutConfig } from '@flexilte/core';
	import { componentValueStore, components, selectedComponentStore } from './editorStore';

	let elId: string;
	let comp: LayoutConfig<typeof components>;
	let props: string[] = [];
	selectedComponentStore.subscribe((id) => {
		elId = id;
		if ($componentValueStore[id]) {
			comp = $componentValueStore[id];
			props = Object.keys(comp.props);
		} else {
			comp = {};
			props = [];
		}
	});

	// componentValueStore.subscribe(console.log);
</script>

<div class="overflow-auto h-full">
	{#if props.length > 0}
		<div class="form-group">
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
							componentValueStore.update((store) => {
								comp.props[prop] = e.target.value;
								store[elId].props[prop] = e.target.value;
								return { ...store };
							});
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
						componentValueStore.update((store) => {
							comp.posX = e.target.value;
							store[elId].posX = e.target.value;
							return { ...store };
						});
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
						componentValueStore.update((store) => {
							comp.posY = e.target.value;
							store[elId].posY = e.target.value;
							return { ...store };
						});
					}}
				>
					<option value="top">top</option>
					<option value="middle">middle</option>
					<option value="bottom">bottom</option>
				</select>
			</label>
			<h6 class="h6 mt-4">Classes</h6>
			<label class="label">
				<span>layoutClass</span>
				<input
					class="input"
					type="text"
					value={comp.layoutClass || ''}
					on:change={(e) => {
						componentValueStore.update((store) => {
							comp.layoutClass = e.target.value;
							store[elId].layoutClass = e.target.value;
							return { ...store };
						});
					}}
				/>
			</label>
			<label class="label">
				<span>wrapperClass</span>
				<input
					class="input"
					type="text"
					value={comp.wrapperClass || ''}
					on:change={(e) => {
						componentValueStore.update((store) => {
							comp.wrapperClass = e.target.value;
							store[elId].wrapperClass = e.target.value;
							return { ...store };
						});
					}}
				/>
			</label>
		</div>
	{/if}
</div>
