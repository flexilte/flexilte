<script lang="ts">
	import { components, docStore } from '$lib/common';
	import { Flexilte, type LayoutConfig } from '@flexilte/core';
</script>

{#if $docStore}
	<div class="px-4 container mx-auto">
		<Flexilte layoutConfig={$docStore} {components}></Flexilte>
	</div>
	<div class="text-center m-4 underline">
		<a href="doc.json">Click here to see the JSON of this page</a>
	</div>
{/if}
