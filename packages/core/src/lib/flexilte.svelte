<script lang="ts" generics="C extends Record<string, ComponentType>">
	import type { LayoutConfig } from './types.js';
	import type { ComponentType } from 'svelte';

	export let layoutConfig: LayoutConfig<C>;
	export let components: Record<string, ComponentType>;
	export let debug: boolean = false;

	const getAlignmentClass = (addFlex = false): string => {
		let classList = '';
		if (layoutConfig.posX === 'middle') classList += ' justify-center';
		else if (layoutConfig.posX === 'left') classList += ' justify-start';
		else if (layoutConfig.posX === 'right') classList += ' justify-end';

		if (layoutConfig.posY === 'middle') classList += ' items-center';
		else if (layoutConfig.posY === 'top') classList += ' items-start';
		else if (layoutConfig.posY === 'bottom') classList += ' items-end';

		if (layoutConfig.alignHeight) classList += ' flex-1';

		if (classList && addFlex) classList += ' flex';
		if (debug) {
			classList += ' flexilte-debug';
		}

		return classList;
	};

	const getWrapClass = (row: LayoutConfig<C>): string => {
		let classList = '';
		if (row.wrap === 'wrap') classList += ' flex-wrap';
		else if (row.wrap === 'nowrap') classList += ' flex-nowrap';
		if (classList) {
			classList += ' overflow-auto';
		}

		return classList;
	};

	const getGapClass = (row: LayoutConfig<C>) => {
		let classList = '';
		if (row.gap) classList += ` ${row.gap}`;
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
				return col.width;
			}
		}
		return 'w-full';
	};

	if (layoutConfig.alignHeight) {
		layoutConfig.cols?.forEach((col: LayoutConfig<C>) => {
			col.alignHeight = true;
		});
	}
</script>

{#if layoutConfig.rows}
	{#each layoutConfig.rows as row}
		<div
			id={layoutConfig.id}
			class={`flex flex-col md:flex-row flexilte flexilte-row w-full ${layoutConfig.nodeClass || ''} ${getAlignmentClass()}  ${getGapClass(row)} ${getWrapClass(row)} ${row.layoutClass || ''}`}
		>
			<svelte:self {components} layoutConfig={row} {debug} />
		</div>
	{/each}
{:else if layoutConfig.cols}
	{#each layoutConfig.cols as col}
		<div
			id={layoutConfig.id}
			class={`flex flex-col flexilte flexilte-col ${getWidthClass(col)} ${layoutConfig.nodeClass || ''} ${getAlignmentClass()} ${getGapClass(col)} ${col.layoutClass || ''}`}
		>
			<svelte:self {components} layoutConfig={col} {debug} />
		</div>
	{/each}
{:else}
	<div
		id={layoutConfig.id}
		class={`flexilte flexilte-item w-full ${getAlignmentClass(true)} ${layoutConfig.nodeClass || ''}`}
	>
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
