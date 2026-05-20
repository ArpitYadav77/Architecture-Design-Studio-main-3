const fs = require('fs');
let d = fs.readFileSync('src/data/projects.ts', 'utf8');

// Find all occurrences of "image: \s*\n" 
// and replace with a generic fallback or we can extract the first gallery image.
// RegEx to capture the empty image line and the next gallery line:
const regex = /image:\s*,?\s*\n(\s*)gallery:\s*\[\s*([a-zA-Z0-9_]+)/g;

d = d.replace(regex, (match, spaces, firstGalleryItem) => {
    console.log(`Fixing empty image line using ${firstGalleryItem}`);
    return `image: ${firstGalleryItem},\n${spaces}gallery: [${firstGalleryItem}`;
});

// Also in case it didn't have gallery elements:
d = d.replace(/image:\s*,?\s*\n(\s*)gallery:\s*\[\s*\]/g, (match, spaces) => {
    console.log(`Fixing empty image line using ""`);
    return `image: "",\n${spaces}gallery: []`;
});

fs.writeFileSync('src/data/projects.ts', d);
