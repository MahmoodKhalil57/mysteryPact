<script>
	import ContinueWithGoogle from '$lib/components/form/continueWithGoogle.svelte';
	import ProfilePictureImage from '$lib/components/mysteryPot/profilePictureImage.svelte';
	import ButtonDefault from '$lib/components/ui/buttonDefault.svelte';
	import { sessionHybridUserStore } from '$lib/stores/userStore';
</script>

<div>
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	<ProfilePictureImage />
	{#if !$sessionHybridUserStore?.sessionUser}
		<ContinueWithGoogle />
	{/if}
	<ButtonDefault url="playGame">Start Game</ButtonDefault>
</div>
