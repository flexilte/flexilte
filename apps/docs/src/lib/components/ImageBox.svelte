<script lang="ts">
	let { url, alt = '' } = $props();
</script>

<div class="w-full overflow-hidden flex items-center justify-center">
	<img src={url} {alt} class="h-full w-auto object-cover" />
</div>
