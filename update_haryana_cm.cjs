const fs = require('fs');
let c = fs.readFileSync('src/data/projects.ts', 'utf8');

// The project already has these auto-generated imports in L101-112:
// haryanaCmGalleryImg0 to haryanaCmGalleryImg11

// Replace the empty gallery for "haryana-cm-secretariat-interior"
const galleryMatch = /slug:\s*"haryana-cm-secretariat-interior"[\s\S]*?gallery:\s*\[\s*\]/;
if (galleryMatch.test(c)) {
    const galleryItems = [];
    for(let i=0; i<=11; i++) {
        galleryItems.push(`haryanaCmGalleryImg${i}`);
    }
    c = c.replace(galleryMatch, (match) => match.replace('gallery: []', `gallery: [${galleryItems.join(', ')}]`));
    fs.writeFileSync('src/data/projects.ts', c);
    console.log('Successfully updated Haryana CM gallery');
} else {
    console.log('Project block not found or gallery not empty');
}
