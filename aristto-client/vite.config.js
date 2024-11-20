import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'
import jsconfigPaths from 'vite-jsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    jsconfigPaths({
      parseNative: false,
    }),
    
  ],
  build: {
    outDir: 'build',
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    open: true,
    port: 3000,
  },
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      '/': '/src',
      config: '/src/config',
      utils: '/src/utils',
      core: '/src/core',
      pages: '/src/pages',
      layouts: '/src/layouts',
      context: '/src/context',
      // assets: '/src/assets',
      // routes: '/src/routes',
      // 'ui-component': '/src/ui-component',
      // 'menu-items': '/src/menu-items',
      // store: '/src/store',
      // themes: '/src/themes',
      // utils: '/src/utils',
      // views: '/src/views',
      // api: '/src/api',
    },
  },
  optimizeDeps: {
    include: [
      '@mui/icons-material',
      '@mui/material',
      '@mui/base',
      '@mui/styles',
      '@mui/system',
      '@mui/utils',
    ],
    exclude: [],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
