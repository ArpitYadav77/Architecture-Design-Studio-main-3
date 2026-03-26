import React from "react";
import ClientLogoCard from "./ClientLogoCard";
import { ProjectData } from "@/data/projects";

interface ClientLogoGridProps {
  projects: ProjectData[];
}

const ClientLogoGrid: React.FC<ClientLogoGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {projects.map((project) => (
        <ClientLogoCard key={project.slug} project={project} />
      ))}
    </div>
  );
};

export default ClientLogoGrid;
