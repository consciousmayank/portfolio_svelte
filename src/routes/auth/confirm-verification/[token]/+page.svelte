<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let countdown = 5;
	let closeTimer: number;

	onMount(() => {
		if (data.success) {
			// Auto-close tab after successful verification
			closeTimer = setInterval(() => {
				countdown--;
				if (countdown <= 0) {
					clearInterval(closeTimer);
					// Close the current tab/window
					window.close();
					// Fallback: if window.close() doesn't work (some browsers block it), 
					// redirect to a success page
					setTimeout(() => {
						window.location.href = '/';
					}, 1000);
				}
			}, 1000);
		}

		return () => {
			if (closeTimer) {
				clearInterval(closeTimer);
			}
		};
	});

	const handleManualClose = () => {
		if (closeTimer) {
			clearInterval(closeTimer);
		}
		window.close();
		// Fallback redirect if close doesn't work
		setTimeout(() => {
			window.location.href = '/';
		}, 500);
	};

	const handleGoToLogin = () => {
		if (closeTimer) {
			clearInterval(closeTimer);
		}
		window.location.href = '/auth/login' + (data.success ? '?verified=true' : '');
	};
</script>

<svelte:head>
	<title>Email Verification - Portfolio</title>
	<meta name="description" content="Email verification confirmation page" />
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
	<div class="max-w-md w-full space-y-8">
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-900 mb-6">Email Verification</h1>
			
			{#if data.success}
				<div class="bg-green-50 border border-green-200 rounded-lg p-6">
					<div class="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full mb-4">
						<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
						</svg>
					</div>
					<h2 class="text-xl font-semibold text-green-900 mb-2">Verification Successful!</h2>
					<p class="text-green-700 mb-4">{data.message}</p>
					<p class="text-green-700 mb-4">Your email has been verified successfully. You can now log in to your account.</p>
					<p class="text-sm text-green-600 mb-4">
						This tab will close automatically in {countdown} seconds...
					</p>
					<div class="space-y-2">
						<button
							on:click={handleManualClose}
							class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
						>
							Close Tab Now
						</button>
						
					</div>
				</div>
			{:else}
				<div class="bg-red-50 border border-red-200 rounded-lg p-6">
					<div class="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
						<svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</div>
					<h2 class="text-xl font-semibold text-red-900 mb-2">Verification Failed</h2>
					<p class="text-red-700 mb-4">{data.message}</p>
					{#if data.error}
						<p class="text-sm text-red-600 mb-4 font-mono bg-red-100 p-2 rounded">
							Error: {data.error}
						</p>
					{/if}
					<div class="space-y-2">
						<button
							on:click={handleGoToLogin}
							class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
						>
							Go to Login
						</button>
						<button
							on:click={() => window.location.href = '/auth/register'}
							class="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
						>
							Try Registering Again
						</button>
						<button
							on:click={handleManualClose}
							class="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
						>
							Close Tab
						</button>
					</div>
				</div>
			{/if}
		</div>

		<div class="text-center">
			<p class="text-sm text-gray-600">
				Need help? <a href="/contact" class="text-blue-600 hover:text-blue-500">Contact support</a>
			</p>
		</div>
	</div>
</div>

<style>
	/* Additional component-specific styles if needed */
</style> 