// Podium offline support: stores a full copy of the app on the device.
const CACHE = 'podium-v6';
const SHELL = './';
const fresh = () => fetch(new Request(SHELL, { cache: 'reload' }));
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => fresh().then(r => { if (!r.ok) throw new Error('shell'); return c.put(SHELL, r); })).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html')) {
    // Always open from the stored copy, then quietly refresh it for next time.
    e.respondWith(caches.open(CACHE).then(c => c.match(SHELL).then(hit => {
      const update = fresh().then(r => { if (r.ok) c.put(SHELL, r.clone()); return r; });
      if (hit) { update.catch(() => {}); return hit; }
      return update;
    })));
  }
});
