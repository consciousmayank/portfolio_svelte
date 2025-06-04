import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { pb } from '$lib/api-client';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email, token } = await request.json();
		
		if (!email || !token) {
			return json(
				{ error: 'Email and token are required' },
				{ status: 400 }
			);
		}

		// Verify the email using API client
		await pb.confirmEmailVerification(token);

		return json(
			{ message: 'Email verified successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Email verification error:', error);
		return json(
			{ error: 'Failed to verify email' },
			{ status: 500 }
		);
	}
};

export const GET: RequestHandler = async ({ url }) => {
	try {
		const token = url.searchParams.get('token');
		
		if (!token) {
			return json(
				{ error: 'Token is required' },
				{ status: 400 }
			);
		}

		// Verify the email using API client
		await pb.confirmEmailVerification(token);

		return json(
			{ message: 'Email verified successfully' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Email verification error:', error);
		return json(
			{ error: 'Failed to verify email' },
			{ status: 500 }
		);
	}
}; 