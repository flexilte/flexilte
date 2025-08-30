<script lang="ts">
	import { Navbar, NavBrand, NavHamburger, NavUl, NavLi, Button } from 'flowbite-svelte';
	import { ArrowUpRightFromSquareOutline } from 'flowbite-svelte-icons';

	import '../app.css';
	import { page } from '$app/state';

	let { children } = $props();
	console.log(page.url.pathname);
	let activeUrl = $derived('.' + page.url.pathname);
</script>

<div
	class="
   min-h-screen bg-gray-50
   dark:bg-gray-900
 "
>
	<Navbar
		class="
    border-gray-200 bg-white px-4 py-2.5
    lg:px-6
    dark:bg-gray-800
  "
	>
		<NavBrand href="./">
			<span
				class="
      self-center text-xl font-semibold whitespace-nowrap
      dark:text-white
    ">Flexilte</span
			>
		</NavBrand>
		<div
			class="
     flex
     md:order-2
   "
		>
			<a href="./docs"><Button size="sm">Get started</Button></a>
			<NavHamburger />
		</div>
		<NavUl {activeUrl} class="order-1">
			<NavLi href="./">Home</NavLi>
			<NavLi href="./docs">Documentation</NavLi>
			<NavLi href="./example">Example</NavLi>
			<NavLi href="./ai">AI</NavLi>
			<NavLi href="https://github.com/flexilte/flexilte" target="_blank">
				<span class="inline-flex items-center gap-1"
					>GitHub<ArrowUpRightFromSquareOutline class="h-4 w-4 shrink-0" /></span
				>
			</NavLi>
		</NavUl>
	</Navbar>
	<main class="container mx-auto p-4">
		{@render children()}
	</main>
</div>
