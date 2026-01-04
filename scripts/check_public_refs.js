const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'public');
let missing = [];

function walk(dir){
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for(const it of items){
    const full = path.join(dir, it.name);
    if(it.isDirectory()){ walk(full); }
    else if(it.isFile() && full.endsWith('.html')){ checkFile(full); }
  }
}

function isLocal(href){
  if(!href) return false;
  href = href.trim();
  if(href.startsWith('http:') || href.startsWith('https:') || href.startsWith('//') || href.startsWith('data:') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  if(href.startsWith('#')) return false;
  return true;
}

function normalizeHref(href){
  // strip query and hash
  return href.split('?')[0].split('#')[0];
}

function checkFile(file){
  const html = fs.readFileSync(file,'utf8');
  const re = /(?:src|href)\s*=\s*"([^"]+)"/g;
  let m;
  while((m=re.exec(html))){
    const raw = m[1];
    if(!isLocal(raw)) continue;
    const href = normalizeHref(raw);
    // resolve relative to file
    const resolved = path.resolve(path.dirname(file), href);
    if(!fs.existsSync(resolved)){
      missing.push({file: path.relative(root, file), ref: raw, resolved: path.relative(root, resolved)});
    }
  }
}

walk(root);

if(missing.length===0){
  console.log('No missing local references found under public/.');
  process.exit(0);
}

console.log('Missing references:');
missing.forEach(m=>{
  console.log(`- In ${m.file}: '${m.ref}' -> expected ${m.resolved}`);
});
process.exit(2);
