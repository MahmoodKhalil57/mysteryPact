<script lang="ts">
	import DefaultInput from '$lib/components/form/defaultInput.svelte';
	import ButtonDefault from '$lib/components/ui/buttonDefault.svelte';
	import { goto } from '$app/navigation';

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
		<ButtonDefault url={`/playGame/lobby/createLobby`}>Create Lobby</ButtonDefault>
	</div>
	<div>
		<DefaultInput label="" type={0} placeHolder="" id="" bind:value={joinRoomId} />
		<ButtonDefault onClick={() => joinLobby(joinRoomId)}>Join Lobby</ButtonDefault>
	</div>
</div>
