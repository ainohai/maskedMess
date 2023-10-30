import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		commonjsOptions: {include: []}
	},
	optimizeDeps: {
		disabled:false
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
