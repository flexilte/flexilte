<script lang="ts">
	import { Flexilte, type FlexilteLayout } from '@flexilte/core';
	import { components } from '$lib/common';

	const layout: FlexilteLayout<typeof components> = {
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

<div class="container mx-auto px-4">
	<Flexilte {layout} {components}></Flexilte>
</div>
