import { auth } from '$api/clients/luciaClient.server';
import { responseStatus } from '$lib/apiUtils/server/apiUtils.server';
import type { Cookies } from '@sveltejs/kit';

export const getContext = (cookies: Cookies, request: Request) => {
	const authRequest = auth.handleRequest({ cookies, request });
	let status = responseStatus.INTERNAL_SERVER_ERROR as responseStatus;

	return {
		cookies,
		authRequest,
		status
	};
};
