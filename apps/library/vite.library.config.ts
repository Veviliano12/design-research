import { rename, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';
import { createReadStream, existsSync, statSync } from 'node:fs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PLATFORM = path.resolve(ROOT, '../../site');
const OUT = path.join(PLATFORM, 'vfx-map');

function servePlatformThumbs(): Plugin {
  const send = (server: { middlewares: ViteDevServer['middlewares'] }) => {
    server.middlewares.use((req, res, next) => {
      const url = req.url?.split('?')[0] ?? '';
      if (!url.startsWith('/thumbs/')) return next();
      const rel = decodeURIComponent(url.replace(/^\/+/, ''));
      if (rel.includes('..')) {
        res.statusCode = 403;
        res.end();
        return;
      }
      const abs = path.join(PLATFORM, rel);
      if (!existsSync(abs) || !statSync(abs).isFile()) {
        res.statusCode = 404;
        res.end();
        return;
      }
      const ext = path.extname(abs).toLowerCase();
      const types: Record<string, string> = {
        '.webp': 'image/webp',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
      };
      res.setHeader('Content-Type', types[ext] ?? 'application/octet-stream');
      createReadStream(abs).pipe(res);
    });
  };
  return { name: 'serve-platform-thumbs', configureServer: send, configurePreviewServer: send };
}

function renameLibraryHtml(): Plugin {
  return {
    name: 'rename-library-html',
    apply: 'build',
    async closeBundle() {
      const from = path.join(OUT, 'library.html');
      const to = path.join(OUT, 'index.html');
      if (!existsSync(from)) return;
      await rename(from, to);
      if (existsSync(from)) await unlink(from);
    },
  };
}

export default defineConfig({
  plugins: [react(), servePlatformThumbs(), renameLibraryHtml()],
  base: './',
  publicDir: false,
  server: {
    port: 5181,
    strictPort: true,
    host: '127.0.0.1',
    fs: { allow: [ROOT, PLATFORM] },
  },
  preview: {
    port: 5181,
    strictPort: true,
    host: '127.0.0.1',
  },
  build: {
    outDir: OUT,
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: path.join(ROOT, 'library.html'),
    },
  },
});
