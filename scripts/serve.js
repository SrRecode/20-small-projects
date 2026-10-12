import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Tiny dependency-free static server so the gallery can be previewed locally. */

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function safeJoin(requestPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(requestPath.split('?')[0]);
  } catch {
    return null;
  }
  const relative = decoded.startsWith('/') ? decoded : `/${decoded}`;
  const target = resolve(root, `.${relative}`);
  if (target !== root && !target.startsWith(root + sep)) return null;
  return target === root ? join(root, 'index.html') : target;
}

const server = createServer(async (req, res) => {
  const filePath = safeJoin(req.url ?? '/');
  const fallback = filePath && join(filePath, 'index.html');
  for (const candidate of [filePath, fallback]) {
    if (!candidate) continue;
    try {
      const data = await readFile(candidate);
      res.writeHead(200, { 'Content-Type': MIME[extname(candidate).toLowerCase()] ?? 'application/octet-stream' });
      res.end(data);
      return;
    } catch {
      /* try next candidate */
    }
  }
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
});

const port = Number(process.env.PORT ?? 4180);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`20 Small Projects gallery on http://localhost:${port}`);
});
