<script lang="ts">
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		Drawer,
		initializeStores,
		getDrawerStore,
		Modal,
		type ModalComponent
	} from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import bash from 'highlight.js/lib/languages/bash';
	import yaml from 'highlight.js/lib/languages/yaml';
	import json from 'highlight.js/lib/languages/json';
	import Icon from '@iconify/svelte';
	import { Flexilte } from '@flexilte/core';
	import ExportBox from '$lib/editor/ExportBox.svelte';
	import { addIdField, components } from '$lib/common';
	import { onMount } from 'svelte';
	import { docStore, editorStore, exampleStore, frontPageStore, setLayoutIds } from '$lib/common';
	import EditorDrawer from '$lib/editor/EditorDrawer.svelte';
	import { parse } from 'yaml';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('yaml', yaml);
	hljs.registerLanguage('bash', bash);
	hljs.registerLanguage('json', json);
	storeHighlightJs.set(hljs);
	initializeStores();
	const drawerStore = getDrawerStore();

	const modalRegistry: Record<string, ModalComponent> = {
		ExportBox: { ref: ExportBox }
	};
	onMount(() => {
		fetch('frontpage.json')
			.then((r) => r.json())
			.then((j) => {
				frontPageStore.set(j);
			})
			.catch((e) => {
				console.error(e);
			});
		fetch('doc.json')
			.then((r) => r.json())
			.then((j) => {
				docStore.set(j);
			})
			.catch((e) => {
				console.error(e);
			});
		fetch('template1.yaml')
			.then((r) => r.text())
			.then((j) => {
				const result = parse(j);
				editorStore.set(addIdField(result));
			})
			.catch((e) => {
				console.error(e);
			});
		fetch('example.json')
			.then((r) => r.json())
			.then((j) => {
				exampleStore.set(setLayoutIds(j));
			})
			.catch((e) => {
				console.error(e);
			});
	});
</script>

<Modal components={modalRegistry} />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase"><a href="./" rel="noreferrer"> Flexilte </a></strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="hidden md:block">
					<a class="btn btn-sm variant-ghost-surface" href="./docs" rel="noreferrer">
						Documentation
					</a>
					<a class="btn btn-sm variant-ghost-surface" href="./example" rel="noreferrer">
						Example
					</a>
					<a class="btn btn-sm variant-ghost-surface" href="./editor" rel="noreferrer"> Editor </a>
					<a class="btn btn-sm variant-ghost-surface" href="./ai" rel="noreferrer"> AI </a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://github.com/flexilte/flexilte"
						rel="noreferrer"
					>
						GitHub
					</a>
				</div>
				<div class="block md:hidden">
					<button
						type="button"
						class="btn-icon bg-initial"
						on:click={() => drawerStore.open({ id: 'menu', position: 'right' })}
						><Icon icon="mdi:hamburger-menu" /></button
					>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
<Drawer>
	{#if $drawerStore.id === 'menu'}
		<div class="flex flex-col item-center justify-center mt-10">
			<a
				href="./docs"
				class="btn variant-filled flex my-2 mx-10"
				data-sveltekit-preload-data="hover"
				on:click={() => drawerStore.close()}><span></span><span>Documentation</span></a
			>
			<a
				href="./example"
				class="btn variant-filled flex my-2 mx-10"
				data-sveltekit-preload-data="hover"
				on:click={() => drawerStore.close()}><span></span><span>Example</span></a
			>

			<a
				href="./editor"
				class="btn variant-filled flex my-2 mx-10"
				data-sveltekit-preload-data="hover"
				on:click={() => drawerStore.close()}><span></span><span>Editor</span></a
			>

			<a
				href="./ai"
				class="btn variant-filled flex my-2 mx-10"
				data-sveltekit-preload-data="hover"
				on:click={() => drawerStore.close()}><span></span><span>AI</span></a
			>
		</div>
	{:else if $drawerStore.id === 'editor'}
		{#if $editorStore}
			<div class="h-full">
				<Flexilte layoutConfig={$editorStore} {components}></Flexilte>
			</div>
		{/if}
	{:else if $drawerStore.id === 'editor2'}
		<div class="h-full">
			<EditorDrawer />
		</div>
	{/if}
</Drawer>
