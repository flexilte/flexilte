<script lang="ts">
	import { CodeBlock, getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	const { language, code } = $modalStore[0].meta;
</script>

<div class="max-h-[32em] overflow-auto">
	<CodeBlock {language} {code}></CodeBlock>
</div>
