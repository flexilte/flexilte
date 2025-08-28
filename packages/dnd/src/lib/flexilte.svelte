<script lang="ts" generics="C extends Record<string, Component >">
	import type { DNDLayoutConfig } from './types';
	import type { Component } from 'svelte';
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import type { DndEvent } from 'svelte-dnd-action';
	import Flexilte from './flexilte.svelte';
	import { findAll, removeAtIndex } from './utils';

	interface Props {
		layoutConfig: DNDLayoutConfig<C>;
		components: Record<string, Component>;
		debug?: boolean;
		itemClickCallback?: (e: Event, c: DNDLayoutConfig<C>) => void;
		considerCallback?: (
			type: 'rows' | 'cols',
			items: DNDLayoutConfig<C>,
			event: CustomEvent<DndEvent<DNDLayoutConfig<C>>>
		) => void;

		finalizeCallback?: (
			type: 'rows' | 'cols',
			items: DNDLayoutConfig<C>,
			event: CustomEvent<DndEvent<DNDLayoutConfig<C>>>
		) => void;
	}

	let {
		layoutConfig,
		components,
		debug = false,
		itemClickCallback = () => {},
		finalizeCallback,
		considerCallback
	}: Props = $props();

	const flipDurationMs = 300;

	const handleDndConsider =
		(type: 'rows' | 'cols') => (e: CustomEvent<DndEvent<DNDLayoutConfig<C>>>) => {
			if (layoutConfig[type]) {
				if (considerCallback) considerCallback(type, layoutConfig, e);
				else {
					const finds = findAll(e.detail.items, (x) => x.id === e.detail.info.id);
					if (finds.length > 1) {
						const fixedNode = removeAtIndex(e.detail.items, finds[1]);
						delete fixedNode[finds[0]]['isDndShadowItem'];

						layoutConfig[type] = fixedNode;
					} else if (finds.length === 1) {
						const shadowItems = e.detail.items
							.filter((x) => x['isDndShadowItem'])
							.filter((x) => x.id !== e.detail.info.id);
						if (shadowItems.length > 0) {
							delete shadowItems[0]['isDndShadowItem'];
						}
						layoutConfig[type] = e.detail.items;
					} else {
						layoutConfig[type] = e.detail.items;
					}
				}
			}
		};

	const handleDndFinalize =
		(type: 'rows' | 'cols') => (e: CustomEvent<DndEvent<DNDLayoutConfig<C>>>) => {
			if (layoutConfig[type]) {
				if (finalizeCallback) finalizeCallback(type, layoutConfig, e);
				else {
					layoutConfig[type] = e.detail.items;
					// dNDLayoutConfig = { ...dNDLayoutConfig };
				}
			}
		};

	const getDebugClass = () => {
		return debug ? ['flexilte-debug'] : [];
	};

	const getAlignmentClass = (
		addFlex = false,
		cur: DNDLayoutConfig<C> | undefined = undefined
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

	const getWidthClass = (cur: DNDLayoutConfig<C> | undefined = undefined) => {
		const x = cur || layoutConfig;
		if (x.width) {
			if (!width1Classes.includes(x.width)) {
				return [x.width, 'mx-auto'];
			}
		}
		return ['w-full'];
	};

	const getNodeClass = (cur: DNDLayoutConfig<C> | undefined = undefined) => {
		const x = cur || layoutConfig;
		if (x.nodeClass) {
			return [x.nodeClass];
		}
		return [];
	};

	const buildBaseClass = (cur: DNDLayoutConfig<C> | undefined = undefined) => {
		const classList: string[] = [...getDebugClass(), ...getNodeClass(cur)];

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

	const buildContainerClass = (cur: DNDLayoutConfig<C>) => {
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
		const classList = [
			...getDebugClass(),
			getNodeClass().join(' ').includes('w-full') ? 'w-full' : undefined,
			layoutConfig.wrapperClass
		];
		return classList.join(' ');
	};
</script>

{#snippet compSnippet(comp: Component)}
	{@const SvelteComponent = comp}
	<SvelteComponent {...layoutConfig.props} />
{/snippet}

{#if layoutConfig.component}
	<div
		class={buildWrapperClass()}
		onclick={(e) => {
			e.preventDefault();
			itemClickCallback(e, layoutConfig);
		}}
		role="button"
		tabindex="0"
		onkeydown={(e) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				itemClickCallback(e, layoutConfig);
			}
		}}
	>
		{@render compSnippet(components[layoutConfig.component])}
	</div>
{:else if layoutConfig.rows}
	<div
		id={layoutConfig.id}
		class={buildRowClass()}
		use:dndzone={{ items: layoutConfig.rows, flipDurationMs }}
		onconsider={handleDndConsider('rows')}
		onfinalize={handleDndFinalize('rows')}
	>
		{#each layoutConfig.rows as row (row.id)}
			<div id={row.id} animate:flip={{ duration: flipDurationMs }} class={buildContainerClass(row)}>
				<Flexilte
					{components}
					layoutConfig={row}
					{debug}
					{considerCallback}
					{finalizeCallback}
					{itemClickCallback}
				/>
			</div>
		{/each}
	</div>
{:else if layoutConfig.cols}
	<div
		id={layoutConfig.id}
		class={buildColClass()}
		use:dndzone={{ items: layoutConfig.cols, flipDurationMs }}
		onconsider={handleDndConsider('cols')}
		onfinalize={handleDndFinalize('cols')}
	>
		{#each layoutConfig.cols as col (col.id)}
			<div id={col.id} animate:flip={{ duration: flipDurationMs }} class={buildContainerClass(col)}>
				<Flexilte
					{components}
					layoutConfig={col}
					{debug}
					{considerCallback}
					{finalizeCallback}
					{itemClickCallback}
				/>
			</div>
		{/each}
	</div>
{/if}
