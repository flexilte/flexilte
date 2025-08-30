<script lang="ts">
	let { url, alt = '' } = $props();
</script>

<div class="flex w-full items-center justify-center overflow-hidden">
	<img src={url} {alt} class="h-full w-auto object-cover" />
</div>
