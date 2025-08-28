<script lang="ts">
	import { Flexilte, type LayoutConfig } from '@flexilte/core';
	import { components } from '$lib/common';

	const layoutConfig: LayoutConfig<typeof components> = {
		rows: [
			{
				component: 'ChatView'
			},
			{
				component: 'InputView'
			}
		]
	};
</script>

<svelte:head>
	<title>Flexilte AI Chat</title>
	<meta
		name="description"
		content="Chat with AI using Flexilte. Try the interactive chat and input components."
	/>
</svelte:head>

<div class="px-4 container mx-auto">
	<Flexilte {layoutConfig} {components}></Flexilte>
</div>
