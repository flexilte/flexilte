<script lang="ts">
	export let type = '';
	export let text: string;
	export let classList = '';

	const buildClass = () => {
		let classString = '';
		if (type.startsWith('h')) {
			classString += `${type} `;
		}
		if (type === 'title') {
			classString += `text-5xl `;
		}
		if (classList) {
			classString += `${classList} `;
		}
		return classString;
	};
</script>

{#if type === 'h1'}
	<h1 class={buildClass()}>
		<p class="whitespace-pre-line">{text}</p>
	</h1>
{:else if type === 'h2'}
	<h2 class={buildClass()}>
		<p class="whitespace-pre-line">{text}</p>
	</h2>
{:else if type === 'h3'}
	<h3 class={buildClass()}>
		<p class="whitespace-pre-line">{text}</p>
	</h3>
{:else if type === 'h4'}
	<h4 class={buildClass()}>
		<p class="whitespace-pre-line">{text}</p>
	</h4>
{:else if type === 'h5'}
	<h5 class={buildClass()}>
		<p class="whitespace-pre-line">{text}</p>
	</h5>
{:else if type === 'h6'}
	<h6 class={buildClass()}>
		<p class="whitespace-pre-line">{text}</p>
	</h6>
{:else}
	<div class={buildClass()}><p class="whitespace-pre-line">{text}</p></div>
{/if}
