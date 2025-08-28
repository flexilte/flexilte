<script lang="ts">
	import { components } from '$lib/common';
	import { Flexilte, type LayoutConfig } from '@flexilte/core';
	import { Button, ButtonGroup } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	const backgroundColor = 'bg-gray-100 dark:bg-gray-800';

	const radialData: LayoutConfig<typeof components> = {
		component: 'Spinner',
		props: {
			progress: '33',
			size: '16'
		},
		posX: 'middle',
		posY: 'middle',
		nodeClass: backgroundColor
	};

	const avatarData: LayoutConfig<typeof components> = {
		component: 'Avatar',
		props: {
			src: 'https://placedog.net/512/512',
			size: 'xl'
		},
		posX: 'middle',
		posY: 'middle',
		nodeClass: backgroundColor
	};

	const loadingBarData: LayoutConfig<typeof components> = {
		component: 'Progressbar',
		posX: 'middle',
		posY: 'middle',
		nodeClass: '  p-12 ' + backgroundColor
	};
	let demoJson = $state<LayoutConfig<typeof components>>({
		rows: [
			{
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
	});
	const buildExample = () => {
		const copy = JSON.parse(JSON.stringify(demoJson));
		copy.rows![0].cols = copy.rows![0].cols[0];
		return `const components = { Progressbar, Avatar, Spinner };
const layoutConfig: LayoutConfig<typeof components> = ${JSON.stringify(copy, null, 2)}
<Flexilte {layoutConfig} {components}></Flexilte>`;
	};

	const onDemoClick = (demo: string) => {
		console.log(demo);
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
	<div class="flex justify-center py-12">
		<ButtonGroup>
			<Button onclick={() => onDemoClick('avatar')}>avatar</Button>
			<Button onclick={() => onDemoClick('radial')}>radial</Button>
			<Button onclick={() => onDemoClick('loadingBar')}>loading bar</Button>
		</ButtonGroup>
	</div>

	<div class="md:h-[40rem] h-[52rem] mt-6">
		<Flexilte layoutConfig={demoJson} {components}></Flexilte>
	</div>
</div>
