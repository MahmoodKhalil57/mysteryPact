import { updateHybridUserStore } from '$lib/stores/userStore';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data }) => {
	updateHybridUserStore(data?.hybridCtx ?? null);
};
