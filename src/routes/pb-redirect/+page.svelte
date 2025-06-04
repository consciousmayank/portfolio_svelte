<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		// Get the hash from the URL
		const hash = window.location.hash;
		
		if (hash) {
			// Remove the # and check if it starts with /auth/confirm-verification/
			const hashPath = hash.substring(1); // Remove the #
			
			if (hashPath.startsWith('/auth/confirm-verification/')) {
				// Extract the token from the hash path
				const token = hashPath.replace('/auth/confirm-verification/', '');
				
				if (token) {
					// Redirect to our proper SvelteKit route
					console.log('Redirecting to:', `/auth/confirm-verification/${token}`);
					goto(`/auth/confirm-verification/${token}`);
					return;
				}
			}
		}
		
		// If we get here, redirect to home page
		console.log('No valid hash found, redirecting to home');
		goto('/');
	});
</script>

<svelte:head>
	<title>Redirecting...</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
	<div class="max-w-md w-full text-center">
		<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
		<h1 class="text-xl font-semibold text-gray-900 mb-2">Redirecting...</h1>
		<p class="text-gray-600">Processing your verification link</p>
	</div>
</div>

<style>
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
	.animate-spin {
		animation: spin 1s linear infinite;
	}
</style> 