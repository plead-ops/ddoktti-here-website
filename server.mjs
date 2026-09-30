import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
const root=resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
createServer(async(req,res)=>{
 const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Content-Security-Policy':"default-src 'none'; style-src 'self'; img-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'",'Cache-Control':'public, max-age=300'};
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{...headers,Allow:'GET, HEAD'});return res.end();}
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(pathname==='/healthz'){res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});return res.end(req.method==='HEAD'?undefined:'{"status":"ok"}');}
  if(['/privacy/','/terms/'].includes(pathname)){res.writeHead(308,{...headers,Location:pathname.slice(0,-1)});return res.end();}
  const route={'/':'/index.html','/privacy':'/privacy/index.html','/terms':'/terms/index.html'}[pathname]??pathname;
  const file=resolve(root,'.'+route);
  if(!file.startsWith(root+'/'))throw Error('invalid path');
  const data=await readFile(file);res.writeHead(200,{...headers,'Content-Type':types[extname(file)]??'application/octet-stream'});res.end(req.method==='HEAD'?undefined:data);
 }catch{res.writeHead(404,{...headers,'Content-Type':'text/html; charset=utf-8'});res.end(req.method==='HEAD'?undefined:await readFile(root+'/404.html'));}
}).listen(Number(process.env.PORT??3000),'0.0.0.0',()=>console.log('Website listening'));
