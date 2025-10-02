// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

const isDev = process.env.NODE_ENV !== 'production'

const DEV_HOST = process.env.VITE_DEV_HOST || '0.0.0.0'
const DEV_PORT = Number(process.env.VITE_DEV_PORT || 5173)
const HMR_HOST = process.env.VITE_DEV_HMR_HOST || undefined // e.g. ""

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: isDev
    ? {
      host: DEV_HOST,
      port: DEV_PORT,
      strictPort: true,
      hmr: HMR_HOST
        ? { host: HMR_HOST, protocol: 'ws', port: DEV_PORT }
        : true,
    }
    : undefined,
  preview: { host: '0.0.0.0', port: 4173 },
})
