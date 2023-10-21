import { writable } from 'svelte/store';
import type { hybridUserProcedure } from '$api/preRequest/middleware.server';

export const sessionHybridUserStore = writable<
	Awaited<ReturnType<typeof hybridUserProcedure>>['hybridCtx'] | null
>();

export const updateProfilePictureStore = writable<number>(0);

export const updateHybridUserStore = (
	hybridUser: Awaited<ReturnType<typeof hybridUserProcedure>>['hybridCtx'] | null
) => {
	sessionHybridUserStore.update(($sessionHybridUserStore) => {
		$sessionHybridUserStore = hybridUser;

		return $sessionHybridUserStore;
	});
};

export const increaseProfilePictureStore = () => {
	updateProfilePictureStore.update(($updateProfilePictureStore) => {
		$updateProfilePictureStore += 1;
		return $updateProfilePictureStore;
	});
};
