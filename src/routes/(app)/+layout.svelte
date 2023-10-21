<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
</script>

<div class="flex flex-col justify-between items-center h-screen w-full">
	<Header />
	<div class="flex items-center justify-center w-full h-full">
		<slot />
	</div>
	<Footer />
</div>
