import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.tsx'],
	format: ['esm', 'cjs'],
	dts: true,
	sourcemap: true,
	clean: true,
	treeshake: true,
	minify: true,
	// Consumers bring their own React; never inline it.
	external: ['react', 'react-dom']
})
