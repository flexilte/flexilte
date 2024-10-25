<script lang="ts" generics="C extends Record<string, ComponentType>">
	import { onChangeStore } from '$lib/common';

	import { fade } from 'svelte/transition';

	import type { LayoutConfig } from './types';
	import type { ComponentType } from 'svelte';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import type { DndEvent } from 'svelte-dnd-action';

	export let layoutConfig: LayoutConfig<C>;
	export let components: Record<string, ComponentType>;
	export let debug: boolean = false;

	const flipDurationMs = 300;

	// DND handlers for rows
	function handleRowDndConsider(e: CustomEvent<DndEvent<LayoutConfig<C>>>) {
		if (layoutConfig.rows) {
			layoutConfig.rows = e.detail.items;
		}
	}

	function handleRowDndFinalize(e: CustomEvent<DndEvent<LayoutConfig<C>>>) {
		if (layoutConfig.rows) {
			layoutConfig.rows = e.detail.items;
			layoutConfig = { ...layoutConfig };
			onChangeStore.set({});
		}
	}

	// DND handlers for columns
	function handleColDndConsider(e: CustomEvent<DndEvent<LayoutConfig<C>>>) {
		if (layoutConfig.cols) {
			layoutConfig.cols = e.detail.items;
		}
	}

	function handleColDndFinalize(e: CustomEvent<DndEvent<LayoutConfig<C>>>) {
		if (layoutConfig.cols) {
			layoutConfig.cols = e.detail.items;
			layoutConfig = { ...layoutConfig };
			onChangeStore.set({});
		}
	}

	const getAlignmentClass = (
		addFlex = false,
		cur: LayoutConfig<C> | undefined = undefined
	): string[] => {
		const classList: string[] = [];
		const x = cur || layoutConfig;

		if (x.posX === 'middle') classList.push('justify-center');
		else if (x.posX === 'left') classList.push('justify-start');
		else if (x.posX === 'right') classList.push('justify-end');

		if (x.posY === 'middle') classList.push('items-center');
		else if (x.posY === 'top') classList.push('items-start');
		else if (x.posY === 'bottom') classList.push('items-end');

		if (classList.length > 0 && addFlex) classList.push('flex');

		return classList;
	};

	const getWrapClass = (): string[] => {
		const classList: string[] = [];

		if (layoutConfig.wrap === 'wrap') classList.push('flex-wrap');
		else if (layoutConfig.wrap === 'nowrap') classList.push('flex-nowrap');

		if (classList.length > 0) {
			classList.push('overflow-auto');
		}

		return classList;
	};

	const width1Classes = [
		'w-1/1',
		'w-2/2',
		'w-3/3',
		'w-4/4',
		'w-5/5',
		'w-6/6',
		'w-7/7',
		'w-8/8',
		'w-9/9',
		'w-10/10',
		'w-11/11',
		'w-12/12'
	];

	const getWidthClass = (cur: LayoutConfig<C> | undefined = undefined) => {
		const x = cur || layoutConfig;
		if (x.width) {
			if (!width1Classes.includes(x.width)) {
				return [x.width, 'mx-auto'];
			}
		}
		return ['w-full'];
	};

	const getNodeClass = (cur: LayoutConfig<C> | undefined = undefined) => {
		const x = cur || layoutConfig;
		if (x.nodeClass) {
			return [x.nodeClass];
		}
		return [];
	};

	const buildBaseClass = (cur: LayoutConfig<C> | undefined = undefined) => {
		const classList: string[] = ['flexilte-debug', ...getNodeClass(cur)];

		return classList;
	};

	const getGapClass = (): string[] => {
		const classList: string[] = [];
		if (layoutConfig.gap) classList.push(layoutConfig.gap);
		return classList;
	};

	const getLayoutClass = () => {
		const classList: string[] = [];
		if (layoutConfig.layoutClass) classList.push(layoutConfig.layoutClass);
		return classList;
	};

	// const fixClassList = (list:string[]) =>{
	// 	const classList: string[] = [...list];
	// 	if (!list.find(x=>x.includes("h-"))){
	// 		classList.push("h-full")
	// 	}
	// 	return classList
	// }

	const buildContainerClass = (cur: LayoutConfig<C>) => {
		const classList = [
			'flexilte-container',
			...buildBaseClass(cur),
			...getWidthClass(cur),
			...getAlignmentClass(true, cur),
			...getLayoutClass()
		];
		return classList.join(' ');
	};

	const buildRowClass = () => {
		const classList = [
			'flex flex-col w-full',
			'flexilte-row',
			...buildBaseClass(),
			// ...getAlignmentClass(),
			...getWrapClass(),
			...getGapClass()
		];
		return classList.join(' ');
	};

	const buildColClass = () => {
		const classList = [
			'md:flex',
			'flexilte-col',
			...buildBaseClass(),
			...getWrapClass(),
			...getGapClass()
		];
		return classList.join(' ');
	};

	const buildWrapperClass = () => {
		const classList = [...buildBaseClass(), layoutConfig.wrapperClass];
		return classList.join(' ');
	};
</script>

{#if layoutConfig.component}
	{#if layoutConfig.wrapperClass}
		<div class={buildWrapperClass()}>
			<svelte:component this={components[layoutConfig.component]} {...layoutConfig.props} />
		</div>
	{:else}
		<svelte:component this={components[layoutConfig.component]} {...layoutConfig.props} />
	{/if}
{:else if layoutConfig.rows && layoutConfig.rows.length > 0}
	<div
		class={buildRowClass()}
		transition:fade
		use:dndzone={{ items: layoutConfig.rows, flipDurationMs }}
		on:consider={handleRowDndConsider}
		on:finalize={handleRowDndFinalize}
	>
		{#each layoutConfig.rows as row (row.id)}
			<div animate:flip={{ duration: flipDurationMs }} class={buildContainerClass(row)}>
				<svelte:self {components} layoutConfig={row} {debug} />
			</div>
		{/each}
	</div>
{:else if layoutConfig.cols && layoutConfig.cols.length > 0}
	<div
		class={buildColClass()}
		transition:fade
		use:dndzone={{ items: layoutConfig.cols, flipDurationMs }}
		on:consider={handleColDndConsider}
		on:finalize={handleColDndFinalize}
	>
		{#each layoutConfig.cols as col (col.id)}
			<div animate:flip={{ duration: flipDurationMs }} class={buildContainerClass(col)}>
				<svelte:self {components} layoutConfig={col} {debug} />
			</div>
		{/each}
	</div>
{/if}
