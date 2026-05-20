const fs = require('fs');
let c = fs.readFileSync('src/data/projects.ts', 'utf8');

const target = `// Kasauli Retreat
import kasauliCover from "@/assets/Kasauli/Kasuli_cover.png";

import kasauliSideview from "@/assets/Kasauli/sideview_Kasuli.png";

import kasauliInt3 from "@/assets/Kasauli/kasuli_exterior3.png";`;

const replacement = `// Kasauli Retreat
import kasauliCover from "@/assets/Kasauli/Kasuli_cover.png";
import kasauliImg1 from "@/assets/Kasauli/WhatsApp Image 2026-04-02 at 12.01.49 (1).jpeg";
import kasauliImg2 from "@/assets/Kasauli/WhatsApp Image 2026-04-02 at 12.01.49 (2).jpeg";
import kasauliImg3 from "@/assets/Kasauli/WhatsApp Image 2026-04-02 at 12.01.49.jpeg";
import kasauliImg4 from "@/assets/Kasauli/WhatsApp Image 2026-04-02 at 12.01.50 (1).jpeg";
import kasauliImg5 from "@/assets/Kasauli/WhatsApp Image 2026-04-02 at 12.01.50.jpeg";
import kasauliImg6 from "@/assets/Kasauli/image copy.png";
import kasauliImg7 from "@/assets/Kasauli/image.png";
import kasauliImg8 from "@/assets/Kasauli/kasuli_exterior3.png";`;

// We need to handle potential CRLF by normalizing search/replace if string match fails
const normalize = (s) => s.replace(/\r\n/g, '\n').trim();

if (normalize(c).includes(normalize(target))) {
    // Attempt direct replacement first
    let newC = c.replace(target, replacement);
    if (newC === c) {
        // Fallback to CRLF target
        const targetCRLF = target.replace(/\n/g, '\r\n');
        const replacementCRLF = replacement.replace(/\n/g, '\r\n');
        newC = c.replace(targetCRLF, replacementCRLF);
    }
    fs.writeFileSync('src/data/projects.ts', newC);
    console.log('Successfully updated Kasauli imports');
} else {
    console.log('Target section not found');
}
