const fs = require('fs');

const d = fs.readFileSync('src/data/projects.ts', 'utf8');
const assets = require('./updated_assets.json');

let newTs = d;

// Helper to inject imports
function injectImports(ts, projSlug, folder, files) {
  let importsStr = `\n// Auto generated imports for ${folder}\n`;
  const varNames = [];
  files.forEach((f, i) => {
    let varName = `${projSlug}Img${i}`;
    // don't include hero in gallery if it exists but why not, let's just add all to gallery.
    importsStr += `import ${varName} from "@/assets/${folder}/${f}";\n`;
    varNames.push(varName);
  });
  
  // place it before export const projectsData
  ts = ts.replace(/(export const projectsData)/, importsStr + '\n$1');
  return { ts, varNames };
}

function updateGallery(ts, titleKeyword, varNames) {
  const regex = new RegExp(`(title:\\s*["'](?:.*)?${titleKeyword}(?:.*)?["'][\\s\\S]*?gallery:\\s*\\[)(.*?)(\\])`);
  if(ts.match(regex)) {
    ts = ts.replace(regex, `$1${varNames.join(', ')}$3`);
  }
  return ts;
}

// Amritsar (we already added Le_meriden_Hero as cover, but gallery needs the rest)
// Wait, we manually added am9 to am19 before? Let's just override it to be safe.
// Wait, we don't want to duplicate imports if they exist, but it's simpler to just let the bundler handle unused ones or simply rebuild all.
// Actually, earlier I manually added `am10` through `am19`. Let's just rebuild carefully.

// Let's just focus on folders that have WhatsApp images that I haven't added to the gallery yet:
const projectsToUpdate = [
  { folder: 'Hotel_Barog_Valley', titleKeyword: 'Hotel Barog', projSlug: 'hbvGallery' },
  { folder: 'Kasauli', titleKeyword: 'Kasauli', projSlug: 'kasauliGallery' },
  { folder: 'chandigarh_square', titleKeyword: 'Paras Downtown', projSlug: 'chandigarhSqGallery' },
  { folder: 'farmhouse', titleKeyword: 'Farmhouse', projSlug: 'fhGallery' },
  { folder: 'Golf_club', titleKeyword: 'Chandigarh Golf', projSlug: 'golfGallery' },
  { folder: 'clinic', titleKeyword: 'Clinic', projSlug: 'clinicGallery' },
  { folder: 'Haryana_CM', titleKeyword: 'CM Residence', projSlug: 'haryanaCmGallery' }
];

for (const p of projectsToUpdate) {
  if (!assets[p.folder]) continue;
  // filter files
  const files = assets[p.folder];
  
  const { ts, varNames } = injectImports(newTs, p.projSlug, p.folder, files);
  newTs = ts;
  newTs = updateGallery(newTs, p.titleKeyword, varNames);
}

fs.writeFileSync('src/data/projects.ts', newTs);
console.log('Galleries have been updated with all files from directories.');
