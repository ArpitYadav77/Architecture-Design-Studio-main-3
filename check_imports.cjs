const fs = require('fs');
const content = fs.readFileSync('src/data/projects.ts', 'utf8');

// Match everything inside quotes next to @/assets/
const regex = /import\s+.*?\s+from\s+['"]@\/assets\/([^'"]+)['"]/g;

let match;
let missing = [];

while ((match = regex.exec(content)) !== null) {
  const relPath = match[1];
  const fullPath = 'src/assets/' + relPath;
  if (!fs.existsSync(fullPath)) {
    missing.push(fullPath);
  }
}

console.log("MISSING:", missing);
fs.writeFileSync('missing.json', JSON.stringify(missing, null, 2));
