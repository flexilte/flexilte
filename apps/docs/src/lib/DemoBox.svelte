<script lang="ts">
	import { Flexilte, type LayoutConfig } from '@flexilte/core';
	import { onMount } from 'svelte';
	import { components } from './common';

	const radialData: LayoutConfig<typeof components> = {
		component: 'ProgressRadial',
		props: {
			value: '33'
		},
		posX: 'middle',
		posY: 'middle',
		nodeClass: 'h-full my-12'
	};

	const avatarData: LayoutConfig<typeof components> = {
		component: 'Avatar',
		props: {
			src: 'https://placedog.net/512/512',
			width: 'w-32',
			rounded: 'rounded-full'
		},
		posX: 'middle',
		posY: 'middle',
		nodeClass: 'h-full my-12'
	};

	const loadingBarData: LayoutConfig<typeof components> = {
		component: 'ProgressBar',
		posX: 'middle',
		posY: 'middle',
		wrapperClass: 'w-48',
		nodeClass: 'md:h-full my-12'
	};
	let demoJson: LayoutConfig<typeof components> = {
		rows: [
			{
				alignHeight: true,
				cols: [
					{
						component: 'CodeBlock',
						props: {
							language: 'ts',
							code: '// Select a json to render'
						}
					},
					{
						component: 'CodeBlock',
						props: {
							language: 'ts',
							code: '// Select a json to render'
						}
					}
				]
			}
		]
	};

	const buildExample = () => {
		const copy = JSON.parse(JSON.stringify(demoJson));
		copy.rows![0].cols = copy.rows![0].cols[0];
		return `const components = { ProgressRadial, Avatar, ProgressBar };
const layoutConfig: LayoutConfig<typeof components> = ${JSON.stringify(copy, null, 2)}
<Flexilte {layoutConfig} {components}></Flexilte>`;
	};

	const onDemoClick = (demo: string) => {
		let data: LayoutConfig<typeof components> = {};
		if (demo === 'radial') {
			data = radialData;
		} else if (demo === 'avatar') {
			data = avatarData;
		} else if (demo === 'loadingBar') {
			data = loadingBarData;
		}
		if (data) {
			demoJson.rows![0].cols![0] = data;
			demoJson.rows![0].cols![1].props!.code = '';
			demoJson.rows![0].cols![1].props!.code = buildExample();
		}
	};

	onMount(() => {
		onDemoClick('avatar');
	});
</script>

<div class="w-full">
	<div class="flex justify-center mt-6">
		<div class="btn-group variant-filled mx-auto">
			<button on:click={() => onDemoClick('radial')}>radial</button>
			<button on:click={() => onDemoClick('avatar')}>avatar</button>
			<button on:click={() => onDemoClick('loadingBar')}>loading bar</button>
		</div>
	</div>

	<div class="md:h-[40rem] h-[52rem] mt-6">
		<Flexilte layoutConfig={demoJson} {components}></Flexilte>
	</div>
</div>
