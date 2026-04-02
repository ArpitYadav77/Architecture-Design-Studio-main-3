const fs = require('fs');

const d = fs.readFileSync('src/data/projects.ts', 'utf8');
const assets = require('./updated_assets.json');

let newTs = d;

function injectImports(ts, projSlug, folder, files) {
  let importsStr = `\n// Auto generated imports for ${folder}\n`;
  files.forEach((f, i) => {
    let varName = `${projSlug}Img${i}`;
    importsStr += `import ${varName} from "@/assets/${folder}/${f}";\n`;
  });
  
  // Just prepend to where export interface is
  ts = ts.replace(/(export interface ProjectData)/, importsStr + '\n$1');
  return ts;
}

const projectsToUpdate = [
  { folder: 'Hotel_Barog_Valley', projSlug: 'hbvGallery' },
  { folder: 'Kasauli', projSlug: 'kasauliGallery' },
  { folder: 'chandigarh_square', projSlug: 'chandigarhSqGallery' },
  { folder: 'farmhouse', projSlug: 'fhGallery' },
  { folder: 'Golf_club', projSlug: 'golfGallery' },
  { folder: 'clinic', projSlug: 'clinicGallery' },
  { folder: 'Haryana_CM', projSlug: 'haryanaCmGallery' }
];

// Wait, I also removed chandigarhSq2, mohaliClubInt1, mohaliInt2, kasauliInt2 from imports but they are still in the gallery array!
// Let me just replace those broken manual ones with empty strings in the gallery arrays since I didn't inject them.

for (const p of projectsToUpdate) {
  if (!assets[p.folder]) continue;
  newTs = injectImports(newTs, p.projSlug, p.folder, assets[p.folder]);
}

// Fix the manual lingering broken variables in gallery arrays
newTs = newTs.replace(/chandigarhSq2,?/g, '');
newTs = newTs.replace(/mohaliClubInt1,?/g, '');
newTs = newTs.replace(/mohaliInt2,?/g, '');
newTs = newTs.replace(/kasauliInt2,?/g, '');

fs.writeFileSync('src/data/projects.ts', newTs);
console.log('Fixed missing imports and removed lingering broken variables.');
