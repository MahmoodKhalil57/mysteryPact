<script>
	import { dev } from '$app/environment';
	import '../app.postcss';
	import { Toaster } from 'svelte-french-toast';
</script>

<slot />
{#if dev}
	<!-- <ThemeSwitcher type="button" outerClass="fixed bottom-0 right-0 p-5" /> -->
	<Toaster />
{/if}
