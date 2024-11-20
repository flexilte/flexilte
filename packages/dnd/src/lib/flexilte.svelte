<script lang="ts" generics="C extends Record<string, ComponentType>">
	import { fade } from 'svelte/transition';

	import type { LayoutConfig } from './types';
	import type { ComponentType } from 'svelte';
	import { flip } from 'svelte/animate';
	import { dndzone, SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import type { DndEvent } from 'svelte-dnd-action';

	export let layoutConfig: LayoutConfig<C>;
	export let components: Record<string, ComponentType>;
	export let debug: boolean = false;
	export let itemClickCallback: (e: MouseEvent, c: LayoutConfig<C>) => void = () => {};

	export let considerCallback:
		| ((
				type: 'rows' | 'cols',
				items: LayoutConfig<C>,
				event: CustomEvent<DndEvent<LayoutConfig<C>>>
		  ) => void)
		| undefined = undefined;
	export let finalizeCallback:
		| ((
				type: 'rows' | 'cols',
				items: LayoutConfig<C>,
				event: CustomEvent<DndEvent<LayoutConfig<C>>>
		  ) => void)
		| undefined = undefined;

	const flipDurationMs = 300;

	const handleDndConsider =
		(type: 'rows' | 'cols') => (e: CustomEvent<DndEvent<LayoutConfig<C>>>) => {
			if (layoutConfig[type]) {
				if (considerCallback) considerCallback(type, layoutConfig, e);
				else layoutConfig[type] = e.detail.items;
			}
		};

	const handleDndFinalize =
		(type: 'rows' | 'cols') => (e: CustomEvent<DndEvent<LayoutConfig<C>>>) => {
			if (layoutConfig[type]) {
				if (finalizeCallback) finalizeCallback(type, layoutConfig, e);
				else {
					layoutConfig[type] = e.detail.items;
					// layoutConfig = { ...layoutConfig };
				}
			}
		};

	const getDebugClass = () => {
		return debug ? ['flexilte-debug'] : [];
	};

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
		const classList = [
			...getDebugClass(),
			getNodeClass().join(' ').includes('w-full') ? 'w-full' : undefined,
			layoutConfig.wrapperClass
		];
		return classList.join(' ');
	};
</script>

{#if layoutConfig.component}
	<button class={buildWrapperClass()} on:click={(e) => itemClickCallback(e, layoutConfig)}>
		<svelte:component this={components[layoutConfig.component]} {...layoutConfig.props} />
	</button>
{:else if layoutConfig.rows}
	<div
		id={layoutConfig.id}
		class={buildRowClass()}
		transition:fade
		use:dndzone={{ items: layoutConfig.rows, flipDurationMs }}
		on:consider={handleDndConsider('rows')}
		on:finalize={handleDndFinalize('rows')}
	>
		{#each layoutConfig.rows as row (`${row.id}${row[SHADOW_ITEM_MARKER_PROPERTY_NAME] ? '_' + row[SHADOW_ITEM_MARKER_PROPERTY_NAME] : ''}`)}
			<div
				id={row.id}
				animate:flip={{ duration: flipDurationMs }}
				class={buildContainerClass(row)}
				data-is-dnd-shadow-item-hint={row[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
			>
				<svelte:self
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
		transition:fade
		use:dndzone={{ items: layoutConfig.cols, flipDurationMs }}
		on:consider={handleDndConsider('cols')}
		on:finalize={handleDndFinalize('cols')}
	>
		{#each layoutConfig.cols as col (`${col.id}${col[SHADOW_ITEM_MARKER_PROPERTY_NAME] ? '_' + col[SHADOW_ITEM_MARKER_PROPERTY_NAME] : ''}`)}
			<div
				id={col.id}
				animate:flip={{ duration: flipDurationMs }}
				class={buildContainerClass(col)}
				data-is-dnd-shadow-item-hint={col[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
			>
				<svelte:self
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
