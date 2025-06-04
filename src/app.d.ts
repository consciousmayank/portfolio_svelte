// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { ApiClient } from '$lib/api-client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: ApiClient;
			user: any | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
