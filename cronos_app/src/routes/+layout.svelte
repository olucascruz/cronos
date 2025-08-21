<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
	export const prerender = true;
</script>

<svelte:head>
		<link rel="icon" href="/Cronos.png" />
		<meta http-equiv="refresh" content="0; url=/home" />

</svelte:head>

{@render children?.()}

