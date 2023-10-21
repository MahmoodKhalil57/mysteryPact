// +page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import z from 'zod';

export const load: PageServerLoad = async ({ url, parent }) => {
	const { hybridCtx } = await parent();

	// check if user has access to room
	const roomId = Number(url.toString().split('/').pop());

	if (!z.number().safeParse(roomId).success) {
		throw redirect(307, `/playGame`);
	}

	const lobbyInfo = {
		roomId
	};
	return {
		lobbyInfo
	};
};
