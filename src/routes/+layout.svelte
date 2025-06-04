<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FloatingDownButton from '$lib/components/FloatingDownButton.svelte';
	import MouseTrail from '$lib/components/MouseTrail.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<!-- Animated Background -->
<div class="animated-background">
	<!-- Gradient Animation -->
	<div class="gradient-layer"></div>

	<!-- Floating Particles -->
	<div class="particles">
		{#each Array(12) as _, i}
			<div class="particle" style="--delay: {i * 0.5}s; --duration: {8 + (i % 4)}s;"></div>
		{/each}
	</div>

	<!-- Geometric Shapes -->
	<div class="shapes">
		<div class="shape shape-1"></div>
		<div class="shape shape-2"></div>
		<div class="shape shape-3"></div>
	</div>
</div>

<div
	class="flex min-h-screen flex-col text-gray-900 transition-colors duration-300 dark:text-gray-100"
>
	<!-- Mouse trail background effect -->
	<MouseTrail />

	<Header name={data.personal?.name ?? 'Portfolio'} />
	<main class="flex-grow">
		{@render children()}
		<FloatingDownButton />
	</main>
	<Footer personal={data.personal} />
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	.animated-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		overflow: hidden;
	}

	/* Gradient Animation Layer */
	.gradient-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
		background-size: 400% 400%;
		animation: gradientShift 20s ease infinite;
		opacity: 0.85;
	}

	@keyframes gradientShift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	/* Floating Particles */
	.particles {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.particle {
		position: absolute;
		width: 8px;
		height: 8px;
		background: rgba(255, 255, 255, 0.6);
		border-radius: 50%;
		bottom: -10px;
		left: var(--x, 50%);
		animation: float var(--duration, 10s) var(--delay, 0s) infinite linear;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
	}

	.particle:nth-child(1) {
		--x: 10%;
	}
	.particle:nth-child(2) {
		--x: 20%;
	}
	.particle:nth-child(3) {
		--x: 30%;
	}
	.particle:nth-child(4) {
		--x: 40%;
	}
	.particle:nth-child(5) {
		--x: 50%;
	}
	.particle:nth-child(6) {
		--x: 60%;
	}
	.particle:nth-child(7) {
		--x: 70%;
	}
	.particle:nth-child(8) {
		--x: 80%;
	}
	.particle:nth-child(9) {
		--x: 90%;
	}
	.particle:nth-child(10) {
		--x: 15%;
	}
	.particle:nth-child(11) {
		--x: 35%;
	}
	.particle:nth-child(12) {
		--x: 75%;
	}

	@keyframes float {
		0% {
			transform: translateY(0) rotate(0deg);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translateY(-100vh) rotate(360deg);
			opacity: 0;
		}
	}

	/* Geometric Shapes */
	.shapes {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.shape {
		position: absolute;
		border: 2px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
	}

	.shape-1 {
		width: 200px;
		height: 200px;
		top: 20%;
		left: 10%;
		animation: rotate 25s linear infinite;
	}

	.shape-2 {
		width: 150px;
		height: 150px;
		top: 60%;
		right: 15%;
		animation: rotate 20s linear infinite reverse;
	}

	.shape-3 {
		width: 100px;
		height: 100px;
		top: 40%;
		left: 60%;
		animation: rotate 30s linear infinite;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Main content */
	main {
		position: relative;
		z-index: 1;
		min-height: 100vh;
		backdrop-filter: blur(0.5px);
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.particle {
			width: 6px;
			height: 6px;
		}

		.shape-1 {
			width: 120px;
			height: 120px;
		}
		.shape-2 {
			width: 100px;
			height: 100px;
		}
		.shape-3 {
			width: 80px;
			height: 80px;
		}
	}
</style>
