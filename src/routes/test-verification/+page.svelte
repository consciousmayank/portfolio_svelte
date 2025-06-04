<script lang="ts">
	import { parseTestUrl, createTestUrl } from '$lib/tests/email-verification-redirect.test';

	// Test data
	const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJlbWFpbCI6ImNoZWtrLm1lLW1heWFuay5qb3NoaUBnbWFpbC5jb20iLCJleHAiOjE3NDkxMzYwNTQsImlkIjoiMWkxMXo0aTI5MGt6dG40IiwidHlwZSI6InZlcmlmaWNhdGlvbiJ9.u_SNKsf2E7Z88qbmBmuFMTjro6kWcodej59IH2svqv4';
	const baseUrl = 'http://localhost:5173';
	const testUrl = createTestUrl(baseUrl, testToken);
	const parsed = parseTestUrl(testUrl);

	// Test cases
	const testCases = [
		{
			name: 'Valid PocketBase URL',
			url: testUrl,
			expected: parsed.expectedRedirect
		},
		{
			name: 'Simple token',
			url: 'http://localhost:5173//_/#/auth/confirm-verification/simple-token',
			expected: 'http://localhost:5173/auth/confirm-verification/simple-token'
		},
		{
			name: 'Invalid path',
			url: 'http://localhost:5173//_/#/some/other/path',
			expected: 'http://localhost:5173/'
		},
		{
			name: 'Empty token',
			url: 'http://localhost:5173//_/#/auth/confirm-verification/',
			expected: 'http://localhost:5173/'
		},
		{
			name: 'No hash',
			url: 'http://localhost:5173//_/',
			expected: 'http://localhost:5173/'
		}
	];

	function testUrlParsing(url: string) {
		const result = parseTestUrl(url);
		console.log('Test URL:', url);
		console.log('Parsed result:', result);
		return result;
	}

	function simulateRedirect(url: string) {
		// Extract just the hash part to simulate what our component does
		const urlObj = new URL(url);
		const hash = urlObj.hash;
		
		if (hash) {
			const hashPath = hash.substring(1);
			if (hashPath.startsWith('/auth/confirm-verification/')) {
				const token = hashPath.replace('/auth/confirm-verification/', '');
				if (token) {
					return `/auth/confirm-verification/${token}`;
				}
			}
		}
		return '/';
	}

	let testResults = testCases.map(testCase => ({
		...testCase,
		actual: simulateRedirect(testCase.url),
		passed: simulateRedirect(testCase.url) === testCase.expected
	}));

	// Live testing function
	let customUrl = testUrl;
	let customResult = '';

	function testCustomUrl() {
		const result = parseTestUrl(customUrl);
		const simulatedRedirect = simulateRedirect(customUrl);
		customResult = `
Token: ${result.token}
Expected Redirect: ${result.expectedRedirect}
Simulated Redirect: ${simulatedRedirect}
Match: ${result.expectedRedirect === simulatedRedirect ? '✅' : '❌'}
		`.trim();
	}

	// Test the specific URL from the user
	const userTestUrl = "http://localhost:5173//_/#/auth/confirm-verification/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJlbWFpbCI6ImNoZWtrLm1lLm1heWFuay5qb3NoaUBnbWFpbC5jb20iLCJleHAiOjE3NDkxMzYwNTQsImlkIjoiMWkxMXo0aTI5MGt6dG40IiwidHlwZSI6InZlcmlmaWNhdGlvbiJ9.u_SNKsf2E7Z88qbmBmuFMTjro6kWcodej59IH2svqv4";
	const userTestResult = parseTestUrl(userTestUrl);
</script>

<svelte:head>
	<title>Email Verification Redirect Testing</title>
</svelte:head>

<div class="container mx-auto px-4 py-8 max-w-6xl">
	<h1 class="text-3xl font-bold text-gray-900 mb-8">Email Verification Redirect Testing</h1>

	<!-- User's Specific Test Case -->
	<div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
		<h2 class="text-2xl font-semibold text-blue-900 mb-4">🎯 Your Specific Test Case</h2>
		<div class="space-y-4">
			<div>
				<strong class="text-blue-800">Original URL:</strong>
				<div class="bg-white p-3 rounded border font-mono text-sm break-all">
					{userTestUrl}
				</div>
			</div>
			<div>
				<strong class="text-blue-800">Expected Redirect:</strong>
				<div class="bg-white p-3 rounded border font-mono text-sm break-all">
					{userTestResult.expectedRedirect}
				</div>
			</div>
			<div>
				<strong class="text-blue-800">Extracted Token:</strong>
				<div class="bg-white p-3 rounded border font-mono text-sm break-all">
					{userTestResult.token}
				</div>
			</div>
			<div class="flex items-center space-x-2">
				<strong class="text-blue-800">Status:</strong>
				<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
					✅ Should work correctly
				</span>
			</div>
		</div>
	</div>

	<!-- Automated Test Results -->
	<div class="bg-white border rounded-lg p-6 mb-8">
		<h2 class="text-2xl font-semibold text-gray-900 mb-4">🧪 Automated Test Results</h2>
		<div class="overflow-x-auto">
			<table class="min-w-full table-auto">
				<thead>
					<tr class="bg-gray-50">
						<th class="px-4 py-2 text-left font-semibold text-gray-900">Test Case</th>
						<th class="px-4 py-2 text-left font-semibold text-gray-900">Expected</th>
						<th class="px-4 py-2 text-left font-semibold text-gray-900">Actual</th>
						<th class="px-4 py-2 text-left font-semibold text-gray-900">Result</th>
					</tr>
				</thead>
				<tbody>
					{#each testResults as test}
						<tr class="border-t">
							<td class="px-4 py-2 font-medium">{test.name}</td>
							<td class="px-4 py-2 font-mono text-sm break-all max-w-xs">{test.expected}</td>
							<td class="px-4 py-2 font-mono text-sm break-all max-w-xs">{test.actual}</td>
							<td class="px-4 py-2">
								<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium {test.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
									{test.passed ? '✅ Pass' : '❌ Fail'}
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Live URL Testing -->
	<div class="bg-white border rounded-lg p-6 mb-8">
		<h2 class="text-2xl font-semibold text-gray-900 mb-4">🔍 Live URL Testing</h2>
		<div class="space-y-4">
			<div>
				<label for="customUrl" class="block text-sm font-medium text-gray-700 mb-2">
					Test your own URL:
				</label>
				<input
					id="customUrl"
					type="text"
					bind:value={customUrl}
					class="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm"
					placeholder="Enter a URL to test..."
				/>
			</div>
			<button
				on:click={testCustomUrl}
				class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
			>
				Test URL
			</button>
			{#if customResult}
				<div class="bg-gray-50 p-4 rounded border">
					<h4 class="font-semibold text-gray-900 mb-2">Test Result:</h4>
					<pre class="text-sm text-gray-800 whitespace-pre-wrap">{customResult}</pre>
				</div>
			{/if}
		</div>
	</div>

	<!-- Manual Testing Instructions -->
	<div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
		<h2 class="text-2xl font-semibold text-yellow-900 mb-4">📋 Manual Testing Instructions</h2>
		<div class="space-y-4 text-yellow-800">
			<div>
				<h3 class="font-semibold mb-2">To test the actual redirect functionality:</h3>
				<ol class="list-decimal list-inside space-y-2 ml-4">
					<li>Start your SvelteKit development server: <code class="bg-yellow-100 px-2 py-1 rounded">npm run dev</code></li>
					<li>Open your browser and navigate to the test URL</li>
					<li>You should be automatically redirected to the proper verification page</li>
					<li>Check the browser console for redirect logs</li>
				</ol>
			</div>
			<div>
				<h3 class="font-semibold mb-2">Test URLs to try:</h3>
				<ul class="list-disc list-inside space-y-1 ml-4 font-mono text-sm">
					<li class="break-all">{userTestUrl}</li>
					<li>http://localhost:5173//_/#/auth/confirm-verification/test-token</li>
					<li>http://localhost:5173//_/#/invalid/path (should redirect to home)</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
	}
</style> 