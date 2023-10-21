<script lang="ts">
	import ImageDefault from '$lib/components/ui/imageDefault.svelte';
	import IconDefault from '$lib/components/ui/iconDefault.svelte';
	import { sessionHybridUserStore, updateProfilePictureStore } from '$lib/stores/userStore';

	export let overRideImage: string | undefined | null = undefined;
	export let innerClass = '';
</script>

{#if overRideImage || (overRideImage !== null && $sessionHybridUserStore?.sessionUser?.profilePicture)}
	<ImageDefault
		src={overRideImage ??
			($sessionHybridUserStore?.sessionUser?.profilePicture ?? '') +
				Array($updateProfilePictureStore).fill('?')}
		innerClass="w-full h-full object-cover rounded-full {innerClass}"
	/>
{:else}
	<IconDefault
		innerClass="md:text-2xl text-[#686B6F] hover:text-zinc-500 w-full h-full object-cover rounded-full"
		icon="i-ion-person-circle-sharp"
	/>
{/if}
