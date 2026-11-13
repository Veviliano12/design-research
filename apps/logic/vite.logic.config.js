import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ROOT = path.dirname(fileURLToPath(import.meta.url))

// Lean GitHub Pages build of the research-logic overview only.
// Relative base works under /design-research/vfx-logic/.
// publicDir is disabled so the 8MB case/lightup image tree is not shipped.
export default defineConfig({
  base: './',
  plugins: [react()],
  // Only the handful of captioned gate examples, not the 8MB case tree.
  publicDir: 'public-logic',
  define: {
    'import.meta.env.VITE_LOGIC_ONLY': JSON.stringify('true'),
  },
  build: {
    outDir: path.resolve(ROOT, '../../site/vfx-logic'),
    emptyOutDir: true,
    assetsDir: 'assets',
  },
})
