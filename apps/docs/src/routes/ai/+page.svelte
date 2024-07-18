<script lang="ts">
	import { Flexilte, type LayoutConfig } from '@flexilte/core';
	import { TextBox, ImageBox } from '@flexilte/skeleton';
	import ChatView from '$lib/ai/ChatView.svelte';
	import InputView from '$lib/ai/InputView.svelte';

	const components = {
		TextBox,
		ImageBox,
		ChatView,
		InputView
	};

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

<div class="px-4 container mx-auto">
	<Flexilte {layoutConfig} {components}></Flexilte>
</div>
