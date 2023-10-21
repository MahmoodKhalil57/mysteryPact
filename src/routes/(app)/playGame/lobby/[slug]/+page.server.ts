// +page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import z from 'zod';
import { prisma } from '$api/clients/prisma.server';
import { nanoid } from 'nanoid';

export const load: PageServerLoad = async ({ url, parent }) => {
	const { hybridCtx } = await parent();

	let roomId = url.toString().split('/').pop();

	if (!hybridCtx.sessionUser) {
		// return to login page
		throw redirect(307, `/`);
	}

	if (!z.string().safeParse(roomId).success) {
		throw redirect(307, `/playGame`);
	}

	if (roomId === 'createLobby') {
		const newRoomId = nanoid();
		throw redirect(307, `/playGame/lobby/${newRoomId}`);
	}

	const mysteryPactLobby = await prisma.mysteryPactLobby.upsert({
		where: {
			id: roomId
		},
		create: {
			id: roomId,
			maxPlayers: 8,
			name: 'Mystery Pact Lobby',
			players: {
				connect: {
					id: hybridCtx.sessionUser.userId
				}
			}
		},
		update: {
			players: {
				connect: {
					id: hybridCtx.sessionUser.userId
				}
			}
		}
	});

	const lobbyInfo = {
		roomId
	};
	return {
		lobbyInfo
	};
};
