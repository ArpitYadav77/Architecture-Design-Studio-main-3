const fs = require('fs');

const file = 'src/data/projects.ts';
let d = fs.readFileSync(file, 'utf8');

const regex = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"]@\/assets\/([^'"]+)['"];/g;
let match;
let toRemoveImports = [];
let toRemoveVars = new Set();

while ((match = regex.exec(d)) !== null) {
  const varName = match[1];
  const relPath = match[2];
  const fullPath = 'src/assets/' + relPath;
  if (!fs.existsSync(fullPath)) {
    toRemoveImports.push(match[0]);
    toRemoveVars.add(varName);
  }
}

for (const imp of toRemoveImports) {
  d = d.replace(imp, '');
}

for (const v of toRemoveVars) {
  const vRegex = new RegExp(`\\b${v}\\b\\s*,?`, 'g');
  d = d.replace(vRegex, '');
}

d = d.replace(/,\s*]/g, ']');

fs.writeFileSync(file, d);
console.log('Removed missing variables: ' + toRemoveVars.size);
