import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TemplateTypescriptPackage',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => {
        switch (format) {
          case 'es': return 'index.mjs'
          case 'cjs': return 'index.cjs'
          case 'umd': return 'bundle.js'
          default: return `index.${format}.js`
        }
      },
    },
    rollupOptions: {
      external: [],
      output: { globals: {} },
    },
    sourcemap: true,
    minify: 'terser',
  },
})