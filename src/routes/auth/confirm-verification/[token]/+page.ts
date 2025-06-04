import type { PageLoad } from './$types';
import { pb } from '$lib/api-client';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async ({ params, url }) => {
	const { token } = params;
	
	if (!token) {
		throw redirect(302, '/auth/login?error=missing-token');
	}

	try {
		// Attempt to verify the email using the API client
		await pb.confirmEmailVerification(token);
		
		return {
			success: true,
			message: 'Email verified successfully! You can now log in.',
			token
		};
	} catch (error) {
		console.error('Email verification failed:', error);
		
		return {
			success: false,
			message: 'Email verification failed. The token may be invalid or expired.',
			token,
			error: error instanceof Error ? error.message : 'Unknown error'
		};
	}
}; 