// import React from "react";
// import chandigarhSquare from "@/assets/Chandigarh Square.png";

// const ClientLogoCard = ({ project }: any) => {
//   return (
//     <div className="flex items-center justify-center p-6 bg-white border border-stone-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 aspect-[3/2]">
//       <img
//         src={chandigarhSquare}
//         alt="Chandigarh Square"
//         className="max-w-[200px] h-auto object-contain"
//       />
//     </div>
//   );
// };

// export default ClientLogoCard;
import React from "react";
import { ProjectData } from "@/data/projects";

// Import logos manually
import galaxyMall from "@/assets/Galaxy_world_Mall.png";
import farmhouse from "@/assets/farmhouse4.png";
import hpTower from "@/assets/Hewlett-Packard Tower.png";
import haryanaCM from "@/assets/haryana_cm.png";

// Map project names to logos
const logoMap: Record<string, string> = {
  "Galaxy World Mall": galaxyMall,
  "Farmhouse": farmhouse,
  "Hewlett-Packard Tower": hpTower,
  "Haryana Chief Minister Secretariat Building": haryanaCM,
};

interface ClientLogoCardProps {
  project: ProjectData;
}

const ClientLogoCard: React.FC<ClientLogoCardProps> = ({ project }) => {
  const logoUrl = logoMap[project.title];

  return (
    <div className="flex items-center justify-center p-4 bg-white border border-stone-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 aspect-[3/2]">
      {logoUrl && (
        <img
          src={logoUrl}
          alt={project.title}
          className="max-w-[140px] h-auto object-contain"
        />
      )}
    </div>
  );
};

export default ClientLogoCard;