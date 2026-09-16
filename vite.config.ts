import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function photoUploadPlugin(): Plugin {
  return {
    name: 'photo-upload-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];

        if (url === '/api/upload-photo' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const base64Data = (data.image || '').replace(/^data:image\/\w+;base64,/, '');
              if (!base64Data) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: 'No image data received' }));
                return;
              }
              const buffer = Buffer.from(base64Data, 'base64');

              const targetPaths = [
                path.resolve(__dirname, 'public/profile.jpg'),
                path.resolve(__dirname, 'src/assets/images/profile.jpg'),
                path.resolve(__dirname, 'profile.jpg'),
              ];

              if (fs.existsSync(path.resolve(__dirname, 'dist'))) {
                targetPaths.push(path.resolve(__dirname, 'dist/profile.jpg'));
              }
              if (fs.existsSync(path.resolve(__dirname, 'docs'))) {
                targetPaths.push(path.resolve(__dirname, 'docs/profile.jpg'));
              }
              if (fs.existsSync(path.resolve(__dirname, 'assets'))) {
                targetPaths.push(path.resolve(__dirname, 'assets/profile.jpg'));
              }

              for (const p of targetPaths) {
                fs.mkdirSync(path.dirname(p), { recursive: true });
                fs.writeFileSync(p, buffer);
              }

              const timestamp = Date.now();
              const meta = {
                hasCustomPhoto: true,
                timestamp,
                updatedAt: new Date().toISOString(),
              };

              const metaPaths = [
                path.resolve(__dirname, 'public/photo-meta.json'),
                path.resolve(__dirname, 'src/data/photo-meta.json'),
              ];
              if (fs.existsSync(path.resolve(__dirname, 'dist'))) {
                metaPaths.push(path.resolve(__dirname, 'dist/photo-meta.json'));
              }
              if (fs.existsSync(path.resolve(__dirname, 'docs'))) {
                metaPaths.push(path.resolve(__dirname, 'docs/photo-meta.json'));
              }

              for (const mp of metaPaths) {
                fs.mkdirSync(path.dirname(mp), { recursive: true });
                fs.writeFileSync(mp, JSON.stringify(meta, null, 2));
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  timestamp,
                  url: `./profile.jpg?v=${timestamp}`,
                  message: 'Photo successfully saved to server. Visible across all devices!',
                })
              );
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message || 'Server error' }));
            }
          });
          return;
        }

        if (url === '/api/photo-meta' && req.method === 'GET') {
          try {
            const metaPath = path.resolve(__dirname, 'public/photo-meta.json');
            if (fs.existsSync(metaPath)) {
              const content = fs.readFileSync(metaPath, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(content);
              return;
            }
          } catch {
            // fallback
          }
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(JSON.stringify({ hasCustomPhoto: false, timestamp: 0 }));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), photoUploadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
