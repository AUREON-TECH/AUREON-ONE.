const CACHE = 'aureon-one-v2-public-shell';
const PREFIX = 'aureon-one-';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg'];
const SHELL_URLS = new Set(SHELL.map(path => new URL(path, self.location.href).href));

function isPublicShell(url) {
  return !url.search && SHELL_URLS.has(url.href);
}
function safeResponse(response) {
  if (!response || !response.ok || response.type !== 'basic' || response.redirected) return false;
  const cc = (response.headers.get('cache-control') || '').toLowerCase();
  if (cc.includes('private') || cc.includes('no-store')) return false;
  if (response.headers.has('set-cookie') || response.headers.has('content-range')) return false;
  const vary = (response.headers.get('vary') || '').toLowerCase().split(',').map(x => x.trim());
  return !vary.some(x => ['*', 'cookie', 'authorization', 'range', 'if-range'].includes(x));
}
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    for (const asset of SHELL) {
      try {
        const response = await fetch(asset, { credentials: 'omit', cache: 'no-store', redirect: 'error' });
        if (safeResponse(response)) await cache.put(asset, response.clone());
      } catch (_) { /* A missing asset must not block service worker installation. */ }
    }
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || request.headers.has('authorization') || request.headers.has('cookie') || request.headers.has('range') || request.headers.has('if-range')) return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !isPublicShell(url)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (request.mode === 'navigate') {
      try { return await fetch(request, { cache: 'no-store', redirect: 'error' }); }
      catch (_) { return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error(); }
    }
    const cached = await cache.match(request);
    if (cached) return cached;
    const response = await fetch(request, { credentials: 'omit', cache: 'no-store', redirect: 'error' });
    if (safeResponse(response)) await cache.put(request, response.clone());
    return response;
  })());
});
