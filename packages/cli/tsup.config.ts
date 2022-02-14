import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli.ts'],
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  format: ['esm'],
  target: 'node14',
  watch: process.env.NODE_ENV === 'development'
})