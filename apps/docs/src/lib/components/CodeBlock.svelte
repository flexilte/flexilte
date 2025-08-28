<script lang="ts">
	import { Highlight } from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import javascript from 'svelte-highlight/languages/javascript';
	import json from 'svelte-highlight/languages/json';
	import plaintext from 'svelte-highlight/languages/plaintext';
	import atomOneDark from 'svelte-highlight/styles/atom-one-dark-reasonable';
	interface Props {
		language?: 'ts' | 'js' | 'json' | 'plaintext';
		code: string;
	}

	let { language, code }: Props = $props();
	const langType = $derived(() => {
		if (language === 'ts') {
			return typescript;
		} else if (language === 'js') {
			return javascript;
		} else if (language === 'json') {
			return json;
		} else {
			return plaintext;
		}
	});
</script>

<svelte:head>
	<!-- eslint-disable-next-line -- XSS attack lint error -->
	{@html atomOneDark}
</svelte:head>
<Highlight language={langType()} {code} />
