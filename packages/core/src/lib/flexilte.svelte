<script lang="ts" generics="M extends ComponentMap  ">
	import Flexilte from './flexilte.svelte';
	import { fade } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';
	import { flip } from 'svelte/animate';
	import type { ComponentMap, FlexilteLayout } from './types';
	import type { ClassValue } from 'svelte/elements';
	import { extractBaseClass, normalizeClassValue } from './utils';

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

	const getAlignmentClass = (addFlex = false, cur?: FlexilteLayout<M>) => {
		const classList = [];
		const x = cur || layout;

		if (x.posX === 'middle') {
			classList.push('justify-center');
			if (!(getWidthClass(cur).length === 1 && getWidthClass(cur)[0] === 'w-full'))
				classList.push('mx-auto');
		} else if (x.posX === 'left') classList.push('justify-start');
		else if (x.posX === 'right') classList.push('justify-end');

		if (x.posY === 'middle') classList.push('items-center');
		else if (x.posY === 'top') classList.push('items-start');
		else if (x.posY === 'bottom') classList.push('items-end');

		if (classList.length > 0 && addFlex) classList.push('flex');

		return classList;
	};

	const getWrapClass = () => {
		const classList = [];

		if (layout.wrap === 'wrap') classList.push('flex-wrap');
		else if (layout.wrap === 'nowrap') classList.push('flex-nowrap');

		if (classList.length > 0) classList.push('overflow-auto');

		return classList;
	};

	const getClass = (classes: string[], type: string) => {
		const classList = classes.filter((c) => {
			const base = extractBaseClass(c);
			return (
				base.startsWith(`${type}-`) ||
				base.startsWith(`min-${type}-`) ||
				base.startsWith(`max-${type}-`)
			);
		});
		return classList;
	};

	function getWidthClass(cur?: FlexilteLayout<M>) {
		const x = cur || layout;
		const classList = [
			...(x ? getClass(getLayoutClass(), 'w') : []),
			...(x ? getClass(getNodeClass(x), 'w') : []),
			...normalizeClassValue(x.width)
		];
		return classList.length > 0 ? classList : ['w-full'];
	}

	const getNodeClass = (cur?: FlexilteLayout<M>) => {
		const x = cur || layout;
		return x.nodeClass ? normalizeClassValue(x.nodeClass) : [];
	};

	function buildBaseClass(cur?: FlexilteLayout<M>) {
		return [...getDebugClass(), ...getNodeClass(cur)];
	}

	const getGapClass = () => {
		const classList = [];
		if (layout.gap) classList.push(...normalizeClassValue(layout.gap));
		return classList;
	};

	function getLayoutClass() {
		const classList = [];
		if (layout.layoutClass) classList.push(...normalizeClassValue(layout.layoutClass));
		return classList;
	}

	function prepareClasses(classes: string[]) {
		return twMerge(classes);
	}

	const buildContainerClass = (cur: FlexilteLayout<M>) => {
		return prepareClasses([
			'flexilte-container',
			...buildBaseClass(cur),
			...getLayoutClass(),
			...getAlignmentClass(true, cur),
			...getWidthClass(cur)
		]);
	};

	const buildRowClass = () => {
		return prepareClasses([
			'flex',
			'flex-col',
			'w-full',
			'flexilte-row',
			...buildBaseClass(),
			...getWrapClass(),
			...getGapClass()
		]);
	};

	const buildColClass = () => {
		return prepareClasses([
			'flex',
			'md:flex-row',
			'flex-col',
			'flexilte-col',
			...buildBaseClass(),
			...getWrapClass(),
			...getGapClass()
		]);
	};
</script>

{#snippet nested(arr: FlexilteLayout<M>[], classList: ClassValue)}
	<div id={layout.id} class={classList} transition:fade>
		{#each arr as el (el.id || el)}
			<div id={el.id} animate:flip={{ duration: flipDurationMs }} class={buildContainerClass(el)}>
				<Flexilte {components} layout={el} {debug} />
			</div>
		{/each}
	</div>
{/snippet}

{#if layout.component}
	{@const SvelteComponent = components[layout.component]}
	<SvelteComponent {...layout.props} />
{:else if layout.rows}
	{@render nested(layout.rows, buildRowClass())}
{:else if layout.cols}
	{@render nested(layout.cols, buildColClass())}
{/if}
