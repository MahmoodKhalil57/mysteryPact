<script lang="ts">
	import { browser } from '$app/environment';
	import { sessionHybridUserStore } from '$lib/stores/userStore';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	type message = {
		author: string;
		timeStamp: string;
		content: string;
	};
	// Create a new store with the given data.
	export const createMessageStore = (ws: WebSocket) => {
		const store = writable<message[]>([]);
		return {
			subscribe: store.subscribe,
			update: store.update,
			addMessages: (messages: message[]) => {
				ws.send(JSON.stringify(messages));
				store.update((oldMessages) => [...oldMessages, ...messages]);
			},
			readyState: ws.readyState
		};
	};

	const initWebSocket = async () => {
		if (browser) {
			const route = `/lobby/${data.data.lobbyInfo.roomId}`;
			let ws = new WebSocket('ws://localhost:8080' + route);
			let messageStore = createMessageStore(ws);
			ws.onmessage = (event) => {
				console.log(event.data);
				const incomingMessages = JSON.parse(event.data) as message[];
				for (const incomingMessage of incomingMessages) {
					messageStore.update((messages) => [...messages, incomingMessage]);
				}
			};
			return messageStore;
		}
		return undefined;
	};

	let messageStore: ReturnType<typeof createMessageStore> | undefined = undefined;

	onMount(async () => {
		messageStore = await initWebSocket();
	});

	const postMessage = (message: string) => {
		messageStore?.addMessages([
			{
				author: 'test',
				content: message,
				timeStamp: new Date().toISOString()
			}
		]);
	};
</script>

Welcome to lobby

<button on:click={() => postMessage('New Message')}> Add Message </button>

{JSON.stringify($messageStore)}
