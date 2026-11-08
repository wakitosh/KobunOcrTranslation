import { defineConfig } from 'vite';
export default defineConfig({
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: { outDir: 'asset/dist', emptyOutDir: true,
    lib: { entry: { workspace: 'ui/main.tsx', llm: 'ui/llm.ts', 'public-layout': 'ui/public-layout.tsx' }, formats: ['es'], fileName: (_format, name) => `${name}.js`, cssFileName: 'workspace' },
  },
});
