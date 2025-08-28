<script lang="ts">
	import { Highlight } from 'svelte-highlight';
	import type { LanguageType } from 'svelte-highlight/languages';
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
	let langType = $state<LanguageType<'typescript' | 'javascript' | 'json' | 'plaintext'>>();
	if (language === 'ts') {
		langType = typescript;
	} else if (language === 'js') {
		langType = javascript;
	} else if (language === 'json') {
		langType = json;
	} else {
		langType = plaintext;
	}
	console.log(language, langType);
</script>

<svelte:head>
	<!-- eslint-disable-next-line -- XSS attack lint error -->
	{@html atomOneDark}
</svelte:head>
<Highlight language={langType} {code} />
