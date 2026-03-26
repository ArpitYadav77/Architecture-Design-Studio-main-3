import { memo } from "react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  slug: string;
  image: string;
  title: string;
  category: string;
  location: string;
  year: string;
  /** Optional — landmark badge */
  isLandmark?: boolean;
  /** Optional — landmark tagline shown on hover */
  tagline?: string;
}

/**
 * Memoized project card — avoids re-renders when parent list re-renders
 * with the same data (e.g. category filter unchanged).
 */
const ProjectCard = memo<ProjectCardProps>(
  ({ slug, image, title, category, location, year, isLandmark, tagline }) => (
    <Link
      to={`/project/${slug}`}
      className="group block cursor-pointer overflow-hidden relative"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {isLandmark && (
          <div className="absolute top-4 left-4 bg-accent/90 text-white text-[10px] uppercase tracking-widest px-3 py-1">
            Landmark
          </div>
        )}
        {/* Dark overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: isLandmark ? "rgba(28,23,20,0.78)" : "rgba(28,23,20,0.60)" }}
        />
        {/* Hover info */}
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 sm:p-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <p
            className="text-[10px] text-accent uppercase font-semibold mb-2"
            style={{ letterSpacing: "0.18em" }}
          >
            {category}
          </p>
          <h3
            className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-white mb-2"
            style={{ letterSpacing: "0.02em" }}
          >
            {title}
          </h3>
          {tagline ? (
            <p className="text-white/80 text-sm leading-relaxed">{tagline}</p>
          ) : (
            <p
              className="text-white/70 text-xs uppercase"
              style={{ letterSpacing: "0.12em" }}
            >
              {location} · {year}
            </p>
          )}
          <span
            className="mt-4 text-[10px] text-white/90 border border-white/40 px-4 py-2 uppercase tracking-widest"
            style={{ letterSpacing: "0.15em" }}
          >
            View Project
          </span>
        </div>
      </div>
      {/* Always-visible info */}
      <div className="mt-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground group-hover:text-accent transition-colors duration-300">
              {title}
            </h3>
            <p className="label-text text-foreground/70 mt-1 font-medium">
              {category} · {location}
            </p>
          </div>
          {isLandmark && (
            <span className="text-xs text-accent font-medium uppercase tracking-widest mt-1">
              {year}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
