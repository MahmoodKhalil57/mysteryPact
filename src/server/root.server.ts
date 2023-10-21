import type { APIType } from '$lib/apiUtils/server/ApiUtils.type.server';
import authRouter from '$api/routes/authRouter.server';
import callback from '$api/routes/callback.server';
import testRouter from '$api/routes/testRouter.server';
import mysteryPotGameRouter from '$api/routes/mysteryPotGameRouter.server';

export const API = {
	authRouter,
	callback,
	testRouter,
	mysteryPotGameRouter
} satisfies APIType;
