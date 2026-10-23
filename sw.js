const C='ela-v4',A=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&x.startsWith('ela-')).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// tarmoq birinchi (6 soniya kutadi), tarmoq bo‘lmasa yoki sekin bo‘lsa — keshdan
const net=r=>new Promise((ok,no)=>{const t=setTimeout(()=>no(new Error('timeout')),6000);fetch(r).then(x=>{clearTimeout(t);ok(x)},e=>{clearTimeout(t);no(e)})});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
if(r.method!=='GET'||u.origin!==location.origin||r.headers.has('range'))return;
e.respondWith(net(r).then(res=>{if(res.ok&&res.type==='basic'){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}return res})
.catch(async()=>(await caches.match(r,{ignoreSearch:true}))||(r.mode==='navigate'?await caches.match('./index.html'):null)||Response.error()))});
