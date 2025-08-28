<script lang="ts">
	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, Button } from 'flowbite-svelte';

	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<Navbar class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
		<NavBrand href="/">
			<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
				>Flexilte</span
			>
		</NavBrand>
		<div class="flex md:order-2">
			<Button size="sm">Get started</Button>
			<NavHamburger />
		</div>
		<NavUl class="order-1">
			<NavLi href="./">Home</NavLi>
			<NavLi href="./docs">Documentation</NavLi>
			<NavLi href="./example">Example</NavLi>
			<NavLi href="./ai">AI</NavLi>
			<NavLi href="https://github.com/flexilte/flexilte" target="_blank">GitHub</NavLi>
		</NavUl>
	</Navbar>
	<main>
		{@render children()}
	</main>
</div>
