import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/buddy/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Buddy – lokálne služby k vám domov',
        short_name: 'Buddy',
        description: 'Nájdi overeného odborníka v Bratislave a okolí, ktorý príde priamo k tebe.',
        theme_color: '#1B4332',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/buddy/',
        scope: '/buddy/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      }
    })
  ]
})
