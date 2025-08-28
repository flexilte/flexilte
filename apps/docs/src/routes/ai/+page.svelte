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

<div class="px-4 container mx-auto">
	<Flexilte {layoutConfig} {components}></Flexilte>
</div>
