const fs = require('fs');
let d = fs.readFileSync('src/data/projects.ts', 'utf8');

const replacements = [
  // Amritsar
  [/import amritsarCover .*/g, 'import amritsarCover from "@/assets/Amritsar/Le_meriden_Hero.jpeg";'],
  [/import amritsarInt1 .*/g, ''],
  [/import amritsarInt2 .*/g, ''],
  [/import amritsarInt3 .*/g, ''],
  [/import amritsarInt4 .*/g, ''],
  [/import amritsarExterior .*/g, ''],
  [/import amInt1Png .*/g, ''],
  [/amritsarExterior, amritsarInt1, amritsarInt2, amritsarInt3, amritsarInt4, amInt1Png, /g, ''],

  // Haryana CM
  [/import haryanaCMInterior .*/g, 'import haryanaCMInterior from "@/assets/Haryana_CM/HaryanaCm_hero.jpeg";'],
  [/import haryanaCmPng .*/g, 'import haryanaCmPng from "@/assets/Haryana_CM/HaryanaCm_hero.jpeg";'],

  // Kasauli
  [/import kasauliCover .*/g, 'import kasauliCover from "@/assets/Kasauli/Kasuli_cover.png";'],
  [/import kasauliInterior .*/g, 'import kasauliInterior from "@/assets/Kasauli/kasuli_interior.png";'],
  [/import kasauliSideview .*/g, 'import kasauliSideview from "@/assets/Kasauli/sideview_Kasuli.png";'],
  [/import kasauliInt2 .*/g, ''],
  [/import kasauliInt3 .*/g, 'import kasauliInt3 from "@/assets/Kasauli/kasuli_exterior3.png";'],
  
  // Chandigarh Square
  [/import chandigarhSqCover .*/g, 'import chandigarhSqCover from "@/assets/chandigarh_square/chandigarh_square.png";'],
  [/import chandigarhSq2 .*/g, ''],
  
  // Hotel Barog Valley
  [/import hbv1 .*/g, 'import hbv1 from "@/assets/Hotel_Barog_Valley/WhatsApp Image 2026-04-02 at 12.01.55.jpeg";'],
  [/import hbv2 .*/g, 'import hbv2 from "@/assets/Hotel_Barog_Valley/WhatsApp Image 2026-04-02 at 12.01.55 (1).jpeg";'],
  [/import hbv3 .*/g, 'import hbv3 from "@/assets/Hotel_Barog_Valley/WhatsApp Image 2026-04-02 at 12.01.56.jpeg";'],
  [/import hbv4 .*/g, 'import hbv4 from "@/assets/Hotel_Barog_Valley/WhatsApp Image 2026-04-02 at 12.01.57.jpeg";'],
  
  // Farmhouse
  [/import farmhouseCover .*/g, 'import farmhouseCover from "@/assets/farmhouse/image copy.png";'],
  [/import farmhouseExt1 .*/g, 'import farmhouseExt1 from "@/assets/farmhouse/image.png";'],
  [/import farmhouseExt2 .*/g, 'import farmhouseExt2 from "@/assets/farmhouse/image copy 2.png";'],
  
  // Mohali Club
  [/import mohaliClubCover .*/g, 'import mohaliClubCover from "@/assets/mohali_club2.png";'],
  [/import mohaliClubInt1 .*/g, ''],
  [/import mohaliInt2 .*/g, '']
];

for (const [regex, replacement] of replacements) {
  d = d.replace(regex, replacement);
}

fs.writeFileSync('src/data/projects.ts', d);
console.log('Fixed imports');
