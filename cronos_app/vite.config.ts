import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	base:"/cronos_app/",
	plugins: [sveltekit()]
});
