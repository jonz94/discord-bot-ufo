import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/main.mts'],
  format: 'esm',
  splitting: false,
  clean: true,
  minify: true,
})
