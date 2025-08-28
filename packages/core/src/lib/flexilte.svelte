<script lang="ts" generics="C extends Record<string, Component>">
	import Flexilte from './flexilte.svelte';
	import { fade } from 'svelte/transition';

	import type { LayoutConfig } from './types';
	import type { Component } from 'svelte';
	import { flip } from 'svelte/animate';

	interface Props {
		layoutConfig: LayoutConfig<C>;
		components: Record<string, Component>;
		debug?: boolean;
	}

	let { layoutConfig, components, debug = false }: Props = $props();

	const flipDurationMs = 300;

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
			'flex',
			'flex-col',
			'md:flex-row',
			'flexilte-col',
			...buildBaseClass(),
			...getWrapClass(),
			...getGapClass()
		];
		return classList.join(' ');
	};
</script>

{#if layoutConfig.component}
	{@const SvelteComponent = components[layoutConfig.component]}
	<SvelteComponent {...layoutConfig.props} />
{:else if layoutConfig.rows}
	<div id={layoutConfig.id} class={buildRowClass()} transition:fade>
		{#each layoutConfig.rows as row (row)}
			<div id={row.id} animate:flip={{ duration: flipDurationMs }} class={buildContainerClass(row)}>
				<Flexilte {components} layoutConfig={row} {debug} />
			</div>
		{/each}
	</div>
{:else if layoutConfig.cols}
	<div id={layoutConfig.id} class={buildColClass()} transition:fade>
		{#each layoutConfig.cols as col (col)}
			<div id={col.id} animate:flip={{ duration: flipDurationMs }} class={buildContainerClass(col)}>
				<Flexilte {components} layoutConfig={col} {debug} />
			</div>
		{/each}
	</div>
{/if}
