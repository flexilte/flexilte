<script lang="ts" generics="M extends ComponentMap  ">
	import Flexilte from './flexilte.svelte';
	import { fade } from 'svelte/transition';

	import { flip } from 'svelte/animate';
	import type { ComponentMap, FlexilteLayout } from './types';

	interface Props {
		layout: FlexilteLayout<M>;
		components: M;
		debug?: boolean;
	}

	let { layout, components, debug = false }: Props = $props();
	const flipDurationMs = 300;

	const getDebugClass = () => {
		return debug ? ['flexilte-debug'] : [];
	};

	const getAlignmentClass = (
		addFlex = false,
		cur: FlexilteLayout<M> | undefined = undefined
	): string[] => {
		const classList: string[] = [];
		const x = cur || layout;

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

		if (layout.wrap === 'wrap') classList.push('flex-wrap');
		else if (layout.wrap === 'nowrap') classList.push('flex-nowrap');

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

	const getWidthClass = (cur: FlexilteLayout<M> | undefined = undefined) => {
		const x = cur || layout;
		if (x.width) {
			if (!width1Classes.includes(x.width)) {
				return [x.width, 'mx-auto'];
			}
		}
		return ['w-full'];
	};

	const getNodeClass = (cur: FlexilteLayout<M> | undefined = undefined) => {
		const x = cur || layout;
		if (x.nodeClass) {
			return [x.nodeClass];
		}
		return [];
	};

	const buildBaseClass = (cur: FlexilteLayout<M> | undefined = undefined) => {
		const classList: string[] = [...getDebugClass(), ...getNodeClass(cur)];

		return classList;
	};

	const getGapClass = (): string[] => {
		const classList: string[] = [];
		if (layout.gap) classList.push(layout.gap);
		return classList;
	};

	const getLayoutClass = () => {
		const classList: string[] = [];
		if (layout.layoutClass) classList.push(layout.layoutClass);
		return classList;
	};

	const buildContainerClass = (cur: FlexilteLayout<M>) => {
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

{#if layout.component}
	{@const SvelteComponent = components[layout.component]}
	<SvelteComponent {...layout.props} />
{:else if layout.rows}
	<div id={layout.id} class={buildRowClass()} transition:fade>
		{#each layout.rows as row (row)}
			<div id={row.id} animate:flip={{ duration: flipDurationMs }} class={buildContainerClass(row)}>
				<Flexilte {components} layout={row} {debug} />
			</div>
		{/each}
	</div>
{:else if layout.cols}
	<div id={layout.id} class={buildColClass()} transition:fade>
		{#each layout.cols as col (col)}
			<div id={col.id} animate:flip={{ duration: flipDurationMs }} class={buildContainerClass(col)}>
				<Flexilte {components} layout={col} {debug} />
			</div>
		{/each}
	</div>
{/if}
