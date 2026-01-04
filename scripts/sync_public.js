const fs = require('fs');
const path = require('path');

// Copies top-level HTML files and assets into the public/ folder to prepare for Vercel static deploy.
// Usage: node scripts/sync_public.js

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

const files = fs.readdirSync(root);
files.forEach(f => {
  if (!f.toLowerCase().endsWith('.html')) return;
  const src = path.join(root, f);
  const dest = path.join(publicDir, f);
  const stat = fs.statSync(src);
  if (stat.isFile()) {
    fs.copyFileSync(src, dest);
    console.log('Copied', f, '-> public/');
  }
});

// Copy assets folder if present
const assetsSrc = path.join(root, 'assets');
const assetsDest = path.join(publicDir, 'assets');
function copyFolder(src, dest){
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const items = fs.readdirSync(src);
  items.forEach(item => {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    const st = fs.statSync(s);
    if (st.isDirectory()) copyFolder(s,d); else fs.copyFileSync(s,d);
  });
}
copyFolder(assetsSrc, assetsDest);
console.log('Assets synced to public/assets/ (if present)');
