const fs = require('fs');
let d = fs.readFileSync('src/data/projects.ts', 'utf8');

const imports = `
// Rajasthan Bhavan
import rajasthan1 from "@/assets/RAJASTHAN BHAVAN/WhatsApp Image 2026-04-02 at 12.15.54.jpeg";
import rajasthan2 from "@/assets/RAJASTHAN BHAVAN/WhatsApp Image 2026-04-02 at 12.15.55 (1).jpeg";
import rajasthan3 from "@/assets/RAJASTHAN BHAVAN/WhatsApp Image 2026-04-02 at 12.15.55.jpeg";
`;

const projectData = `
  {
    slug: "rajasthan-bhavan",
    title: "Rajasthan Bhavan",
    category: "Civic",
    location: "Rajasthan, India",
    year: "2026",
    image: rajasthan1,
    gallery: [rajasthan1, rajasthan2, rajasthan3],
    tagline: "A representation of Rajasthan's heritage.",
    description: "Rajasthan Bhavan is a civic project intended to showcase the rich cultural heritage and architectural grandeur of Rajasthan. Spaces are designed to act as a cultural embassy, offering a blend of traditional motifs and modern functionality.",
    area: "Varies",
    client: "Government of Rajasthan",
    status: "Under Construction"
  },
`;

if (!d.includes('rajasthan-bhavan')) {
  d = d.replace(/(export const projectsData: ProjectData\[\] = \[)/, imports + '\n$1');
  d = d.replace(/(export const projectsData: ProjectData\[\] = \[\s*)/, '$1' + projectData);
  fs.writeFileSync('src/data/projects.ts', d);
  console.log('Added Rajasthan Bhavan');
} else {
  console.log('Already exists');
}
