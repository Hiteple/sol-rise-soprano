import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import contentCollections from '@content-collections/vite'

// Netlify sets CONTEXT / NETLIFY during CI builds; enable CDN transforms in those builds.
const netlifyImageCdn =
  process.env.NETLIFY === 'true' ||
  Boolean(process.env.CONTEXT) ||
  Boolean(process.env.DEPLOY_PRIME_URL)

const config = defineConfig({
  define: {
    'import.meta.env.VITE_NETLIFY_IMAGE_CDN': JSON.stringify(netlifyImageCdn ? 'true' : 'false'),
  },
  server: {
    allowedHosts: [
      '.netlify.app',
      'devserver-preview--opera-singer-portfolio.netlify.app',
    ],
  },
  plugins: [
    contentCollections(),
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    netlify(),
    viteReact(),
  ],
})

export default config
