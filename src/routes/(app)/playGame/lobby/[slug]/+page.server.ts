// +page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import z from 'zod';
import { prisma } from '$api/clients/prisma.server';

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
		const mysteryPactLobby = await prisma.mysteryPactLobby.create({
			data: {
				maxPlayers: 8,
				name: 'Mystery Pact Lobby',
				players: {
					connect: {
						id: hybridCtx.sessionUser.userId
					}
				}
			}
		});
		throw redirect(307, `/playGame/lobby/${mysteryPactLobby.id}`);
	} else {
		const lobby = await prisma.mysteryPactLobby.findUnique({
			where: {
				id: roomId
			}
		});

		if (!lobby) {
			throw redirect(307, `/playGame`);
		}
	}

	const mysteryPactLobby = await prisma.mysteryPactLobby.update({
		where: {
			id: roomId
		},
		data: {
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
