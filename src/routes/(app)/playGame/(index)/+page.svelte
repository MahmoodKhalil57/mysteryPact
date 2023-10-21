<script lang="ts">
	import { apiSend } from '$lib/client/apiClient';
	import DefaultInput from '$lib/components/form/defaultInput.svelte';
	import ButtonDefault from '$lib/components/ui/buttonDefault.svelte';
	import { responseStatus } from '$lib/utils/serverResponse';
	import { goto } from '$app/navigation';

	const createLobby = async () => {
		const result = await apiSend().mysteryPotGameRouter.getUnusedMysteryPotGameLobby.GET({}, false);
		if (result.status === responseStatus.SUCCESS && result.body.data.lobbyId) {
			goto(`/playGame/lobby/${result.body.data.lobbyId}`);
		}
	};

	const joinLobby = (joinRoomId: string) => {
		const min = 10 ** 11;
		const max = 10 ** 12;
		// check if between min and max
		const joinRoomIdNumber = Number(joinRoomId);
		if (joinRoomIdNumber > min && joinRoomIdNumber < max) {
			goto(`/playGame/lobby/${joinRoomId}`);
		}
	};

	let joinRoomId = '';
</script>

<div class="flex flex-col gap-7">
	<div>
		<ButtonDefault onClick={createLobby}>Create Lobby</ButtonDefault>
	</div>
	<div>
		<DefaultInput label="" type={0} placeHolder="" id="" bind:value={joinRoomId} />
		<ButtonDefault onClick={() => joinLobby(joinRoomId)}>Join Lobby</ButtonDefault>
	</div>
</div>
