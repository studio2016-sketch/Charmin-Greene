const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
// Run browser script through a two-page journey, restricted storage and private paths.
const script=fs.readFileSync('booking-attribution.js','utf8');
const storage=new Map();const ctx={window:{location:{pathname:'/weddings',origin:'https://brand.test',search:'?utm_source=google&utm_medium=organic'}},document:{referrer:'https://www.google.com/search?q=private'},sessionStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},URL,URLSearchParams,Date};
vm.runInNewContext(script,ctx);ctx.window.location.pathname='/';ctx.window.location.search='';ctx.document.referrer='https://brand.test/weddings';const first=ctx.window.wgosAttribution();assert.equal(first.landingPath,'/weddings');assert.equal(first.utmSource,'google');assert.equal(first.referrer,'https://www.google.com');
ctx.window.location.pathname='/proposal/private';assert.equal(Object.keys(ctx.window.wgosAttribution()).length,0);
ctx.window.location.pathname='/';ctx.sessionStorage.getItem=()=>{throw Error('Blocked');};ctx.sessionStorage.setItem=()=>{throw Error('Blocked');};assert.doesNotThrow(()=>ctx.window.wgosAttribution());
console.log('First-touch navigation, private-path exclusion and restricted storage checks passed.');
