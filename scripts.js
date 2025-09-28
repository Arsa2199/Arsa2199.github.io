/* Gift Tracker - Vanilla JS
   - Keeps data in localStorage (key: giftTracker_v1)
   - Supports images (base64), add/edit, mark bought, filter/search, export
*/

// ---------- Utilities ----------
const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));
const LS_KEY = 'giftTracker_v1';

const uid = () => 'id_' + Math.random().toString(36).slice(2,9);

// safe image to base64
function fileToDataUrl(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

// CSV export helper
function toCSV(items){
  const header = ['id','name','category','bought','imageData','notes'];
  const rows = items.map(it => [
    it.id,
    `"${String(it.name).replace(/"/g,'""')}"`,
    `"${String(it.category).replace(/"/g,'""')}"`,
    it.bought ? '1' : '0',
    it.imageData ? `"${it.imageData.slice(0,100).replace(/"/g,'""')}..."` : '',
    `"${(it.notes||'').replace(/"/g,'""')}"`
  ]);
  return [header.join(','), ...rows.map(r=>r.join(','))].join('\n');
}

// ---------- Default data (from user's list) ----------
const DEFAULT_ITEMS = [
  // MAKE UP
  {name:'Backstage Glow Face Pallete shade universa (Dior)', category:'MAKE UP'},
  {name:'Eyelash curler (lashboss)', category:'MAKE UP'},
  {name:'Addict Refillable shine lipstick shade 727 (Dior)', category:'MAKE UP'},
  {name:'Ysl touche glow pact cushion shade B20 (Ysl)', category:'MAKE UP'},
  {name:'Brush 3 pcs (aeris)', category:'MAKE UP'},
  {name:'Loose powder shade fair light (something)', category:'MAKE UP'},
  {name:'Beautybland (haquhara)', category:'MAKE UP'},
  {name:'Airbrush flawless setting spray (charlotte tilbury)', category:'MAKE UP'},
  {name:'Lume baked powder blush shade maja (guele)', category:'MAKE UP'},
  {name:'Cream blush (shade hope)', category:'MAKE UP'},
  {name:'Embryolisse lait cream (30ml)', category:'MAKE UP'},
  {name:'Noir lash mascara (instaperfect)', category:'MAKE UP'},

  // PERLENGKAPAN IBADAH
  {name:'Mukena (Heylocal)', category:'PERLENGKAPAN IBADAH'},
  {name:'Sajadah (howel & co)', category:'PERLENGKAPAN IBADAH', bought:true},
  {name:'Al quran mini', category:'PERLENGKAPAN IBADAH', bought:true},
  {name:'Tasbih', category:'PERLENGKAPAN IBADAH'},

  // SKINCARE
  {name:'Cleansing Oil (Centella madagascar 1004)', category:'SKINCARE'},
  {name:'Sabun cuci muka low Ph (Cosrx)', category:'SKINCARE'},
  {name:'Soothing toner (anua)', category:'SKINCARE'},
  {name:'Brightning capsule ampule (Centella skin 1004)', category:'SKINCARE'},
  {n
