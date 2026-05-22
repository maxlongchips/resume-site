import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/resume-site/',
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'content-hmr',
      handleHotUpdate({ file, server }) {
        if (file.includes('data/content')) {
          server.ws.send({ type: 'full-reload' })
          return []
        }
      },
    },
  ],
})
