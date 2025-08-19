<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
		<link rel="icon" href="/Cronos.png" />
</svelte:head>

{@render children?.()}
