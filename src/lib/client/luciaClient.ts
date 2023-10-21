import { apiSend } from '$lib/client/apiClient';
import { sessionHybridUserStore } from '$lib/stores/userStore';
import { responseStatus } from '$lib/utils/serverResponse';

export const signOut = async () => {
	const response = await apiSend().authRouter.signOut.POST({}, true);
	if (response.status === responseStatus.SUCCESS) {
		sessionHybridUserStore.update(($sessionHybridUserStore) => {
			if ($sessionHybridUserStore) {
				$sessionHybridUserStore.sessionUser = undefined;
			}
			return $sessionHybridUserStore;
		});
		window.location.reload();
	}
};

export const signUpEmail = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string
) => {
	const payload = {
		firstName,
		lastName,
		email,
		password
	};
	const response = await apiSend().authRouter.signUpEmail.POST(payload, false);
	return response;
};

export const signInEmail = async (email: string, password: string) => {
	const payload = {
		email,
		password
	};
	const response = await apiSend().authRouter.signInEmail.POST(payload, false);
	if (response.status === responseStatus.SUCCESS) {
		sessionHybridUserStore.update(($sessionHybridUserStore) => {
			if ($sessionHybridUserStore) {
				$sessionHybridUserStore.sessionUser = undefined;
			}
			return $sessionHybridUserStore;
		});
	}
	// setUserStore();
};

export const signOnGoogle = async () => {
	const response = await apiSend().authRouter.signOnGoogle.POST({}, false);
	window.location.href = response.body.data.url.toString();
};
