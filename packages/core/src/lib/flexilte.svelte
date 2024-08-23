<script lang="ts" generics="C extends Record<string, ComponentType>">
	import type { LayoutConfig } from './types.js';
	import type { ComponentType } from 'svelte';
	export let layoutConfig: LayoutConfig<C>;
	export let components: Record<string, ComponentType>;
	export let debug: boolean = false;

	if (layoutConfig.alignHeight) {
		layoutConfig.cols?.forEach((col: LayoutConfig<C>) => {
			col.alignHeight = true;
		});
	}

	const getAlignmentClass = (addFlex = false): string[] => {
		const classList: string[] = [];

		if (layoutConfig.posX === 'middle') classList.push('justify-center');
		else if (layoutConfig.posX === 'left') classList.push('justify-start');
		else if (layoutConfig.posX === 'right') classList.push('justify-end');

		if (layoutConfig.posY === 'middle') classList.push('items-center');
		else if (layoutConfig.posY === 'top') classList.push('items-start');
		else if (layoutConfig.posY === 'bottom') classList.push('items-end');

		if (classList.length > 0 && addFlex) classList.push('flex');

		return classList;
	};

	const getBaseClass = () => {
		const classList: string[] = [];
		if (layoutConfig.alignHeight) classList.push('flex-1');
		if (debug) classList.push('flexilte-debug');
		return classList;
	};

	const getWrapClass = (row: LayoutConfig<C>): string[] => {
		const classList: string[] = [];

		if (row.wrap === 'wrap') classList.push('flex-wrap');
		else if (row.wrap === 'nowrap') classList.push('flex-nowrap');

		if (classList.length > 0) {
			classList.push('overflow-auto');
		}

		return classList;
	};

	const getGapClass = (row: LayoutConfig<C>): string[] => {
		const classList: string[] = [];

		if (row.gap) {
			classList.push(row.gap);
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

	const getWidthClass = (col: LayoutConfig<C>) => {
		if (col.width) {
			if (!width1Classes.includes(col.width)) {
				return [col.width];
			}
		}
		return ['w-full'];
	};

	const addWFullClass = () => {
		return layoutConfig.nodeClass?.includes('w-') ? [] : ['w-full'];
	};

	const autoMobileClass = (row: LayoutConfig<C>) => {
		return row.noAutoMobile ? [] : ['flex-col'];
	};

	const cleanUpClassList = (l: (string | undefined)[]) => {
		return l.filter((x) => x).join(' ');
	};

	$: getRowClassList = (cur: LayoutConfig<C>) => {
		const classList = [
			...getBaseClass(),
			...getAlignmentClass(),
			...getGapClass(cur),
			...getWrapClass(cur),
			...autoMobileClass(cur),
			...addWFullClass(),
			layoutConfig.nodeClass,
			cur.layoutClass
		];

		return cleanUpClassList(classList);
	};

	$: getColClassList = (cur: LayoutConfig<C>) => {
		const classList = [
			...getBaseClass(),
			...getAlignmentClass(),
			...getGapClass(cur),
			...getWidthClass(cur),
			layoutConfig.nodeClass,
			cur.layoutClass
		];

		return cleanUpClassList(classList);
	};

	$: getItemClassList = () => {
		const classList = [
			...getBaseClass(),
			...getAlignmentClass(true),
			...addWFullClass(),
			layoutConfig.nodeClass
		];
		if (debug) console.log(layoutConfig);
		return cleanUpClassList(classList);
	};
</script>

{#if layoutConfig.rows}
	{#each layoutConfig.rows as row}
		<div
			id={layoutConfig.id}
			class={`flex md:flex-row flexilte flexilte-row ${getRowClassList(row)}`}
		>
			<svelte:self {components} layoutConfig={row} {debug} />
		</div>
	{/each}
{:else if layoutConfig.cols}
	{#each layoutConfig.cols as col}
		<div id={layoutConfig.id} class={`flex flex-col flexilte flexilte-col ${getColClassList(col)}`}>
			<svelte:self {components} layoutConfig={col} {debug} />
		</div>
	{/each}
{:else}
	<div id={layoutConfig.id} class={`flexilte flexilte-item ${getItemClassList()}`}>
		{#if layoutConfig.component}
			{#if layoutConfig.wrapperClass}
				<div class={`${layoutConfig.wrapperClass}`}>
					<svelte:component this={components[layoutConfig.component]} {...layoutConfig.props} />
				</div>
			{:else}
				<svelte:component this={components[layoutConfig.component]} {...layoutConfig.props} />
			{/if}
		{/if}
	</div>
{/if}
