<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	interface Particle {
		id: number;
		x: number;
		y: number;
		opacity: number;
		scale: number;
		color: string;
	}

	let particles: Particle[] = [];
	let particleId = 0;
	let mouseX = 0;
	let mouseY = 0;
	let isMouseMoving = false;
	let lastMoveTime = 0;

	// Beautiful gradient colors for the trail
	const colors = [
		'rgb(147, 51, 234)', // purple-600
		'rgb(168, 85, 247)', // purple-500
		'rgb(196, 181, 253)', // purple-300
		'rgb(59, 130, 246)', // blue-500
		'rgb(99, 102, 241)', // indigo-500
		'rgb(168, 162, 158)', // gray-400
		'rgb(236, 72, 153)', // pink-500
		'rgb(244, 114, 182)' // pink-400
	];

	function getRandomColor(): string {
		return colors[Math.floor(Math.random() * colors.length)];
	}

	function createParticle(x: number, y: number): void {
		const particle: Particle = {
			id: particleId++,
			x,
			y,
			opacity: 1,
			scale: Math.random() * 0.5 + 0.5,
			color: getRandomColor()
		};
		particles = [...particles, particle];
	}

	function updateParticles(): void {
		particles = particles
			.map((particle) => ({
				...particle,
				opacity: particle.opacity - 0.02,
				scale: particle.scale * 0.98
			}))
			.filter((particle) => particle.opacity > 0);
	}

	function handleMouseMove(event: MouseEvent): void {
		mouseX = event.clientX;
		mouseY = event.clientY;
		isMouseMoving = true;
		lastMoveTime = Date.now();

		// Create particles less frequently for better performance
		if (Math.random() > 0.7) {
			createParticle(mouseX, mouseY);
		}
	}

	function animate(): void {
		updateParticles();
		
		// Stop creating particles if mouse hasn't moved for a while
		if (Date.now() - lastMoveTime > 100) {
			isMouseMoving = false;
		}

		requestAnimationFrame(animate);
	}

	onMount(() => {
		if (browser) {
			window.addEventListener('mousemove', handleMouseMove);
			animate();

			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
			};
		}
	});
</script>

<!-- Mouse trail container -->
<div class="mouse-trail-container" aria-hidden="true">
	{#each particles as particle (particle.id)}
		<div
			class="particle"
			style="
				left: {particle.x}px;
				top: {particle.y}px;
				opacity: {particle.opacity};
				transform: scale({particle.scale});
				background: radial-gradient(circle, {particle.color}, transparent);
			"
		></div>
	{/each}
</div>

<style>
	.mouse-trail-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: 1;
		overflow: hidden;
	}

	.particle {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		pointer-events: none;
		transform-origin: center;
		transition: opacity 0.1s ease-out;
		will-change: transform, opacity;
	}

	/* Blur effect for smoother trails */
	.particle::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		background: inherit;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		filter: blur(1px);
		opacity: 0.6;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.particle {
			width: 15px;
			height: 15px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.mouse-trail-container {
			display: none;
		}
	}
</style> 