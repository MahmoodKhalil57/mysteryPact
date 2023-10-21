// +page.server.ts
import { getContext } from '$api/preRequest/context.server';
import { hybridUserProcedure } from '$api/preRequest/middleware.server';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, request }) => {
	const ctx = getContext(cookies, request);
	const { hybridCtx } = await hybridUserProcedure(ctx);
	return { hybridCtx };
};
