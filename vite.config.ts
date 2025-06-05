import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	build: {
		// Disable gzip size reporting to prevent hanging
		reportCompressedSize: false,
		// Optimize for production builds
		minify: 'esbuild',
		// Reduce memory usage
		rollupOptions: {
			output: {
				// Split chunks to reduce bundle size
				manualChunks: {
					vendor: ['svelte', '@sveltejs/kit'],
					utils: ['gsap', 'lucide-svelte', 'svelte-typewriter']
				}
			}
		}
	}
});
