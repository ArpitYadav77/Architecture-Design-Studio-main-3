import { useParams, useNavigate, Link } from "react-router-dom";
import { useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import { portfolioProjects, allProjectsSorted } from "@/data/projects";
import { useSanityProjects } from "@/hooks/useSanityProjects";
import { useMemo } from "react";


// Competition always last
const categories = [
  "Institutional",
  "Commercial",
  "Corporate",
  "Hospitality",
  "Interior",
  "Residential",
  "Urban",
  "Competition",
  "Misc",
];

const categoryPath = (cat: string) =>
  cat === "All" ? "/projects" : `/projects/${cat.toLowerCase()}`;

const ProjectsPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const activeCategory = category
    ? categories.find((c) => c.toLowerCase() === category.toLowerCase()) ?? "All"
    : "All";

  const { projects: sanityProjects } = useSanityProjects();

  const combinedProjects = useMemo(() => {
    // Map sanity data to match the project shape
    const mappedSanity = sanityProjects.map((p) => ({
      ...p,
      image: p.coverImage, // Use Sanity's cover image instead of local static image
      year: String(p.year),
    }));
    // Merge sanity data (showing up first) and static data together
    return [...mappedSanity, ...allProjectsSorted];
  }, [sanityProjects]);

  const combinedPortfolioProjects = useMemo(() => {
     // A similar approach for matching the default portfolio array
    const mappedSanity = sanityProjects.map((p) => ({
      ...p,
      image: p.coverImage,
      year: String(p.year),
    }));
    return [...mappedSanity, ...portfolioProjects];
  }, [sanityProjects]);

  const filtered =
    activeCategory === "All"
      ? combinedPortfolioProjects
      : combinedProjects
          .filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase())
          .sort((a, b) => {
            const getPriority = (obj: any) => {
              if (typeof obj.priority === "number") return obj.priority;
              if (typeof obj.P === "number") return obj.P;
              return Infinity;
            };

            const ap = getPriority(a);
            const bp = getPriority(b);

            if (ap !== bp) return ap - bp;
            return a.title.localeCompare(b.title);
          });


  const handleNav = useCallback(
    (cat: string) => navigate(categoryPath(cat)),
    [navigate]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 sm:pt-24 pb-14 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        {/* Breadcrumb + heading */}
        <ScrollReveal>
          <div className="mb-4 flex items-center gap-2">
            <Link
              to="/"
              className="text-xs text-foreground/50 hover:text-foreground transition-colors uppercase tracking-widest"
              style={{ letterSpacing: "0.15em" }}
            >
              Home
            </Link>
            <span className="text-foreground/30 text-xs">›</span>
            <span
              className="text-xs text-accent uppercase tracking-widest"
              style={{ letterSpacing: "0.15em" }}
            >
              Portfolio
            </span>
            {activeCategory !== "All" && (
              <>
                <span className="text-foreground/30 text-xs">›</span>
                <span className="text-xs text-foreground/70 uppercase tracking-widest" style={{ letterSpacing: "0.15em" }}>
                  {activeCategory}
                </span>
              </>
            )}
          </div>

          <h1 className="heading-lg text-foreground mb-2">
            {activeCategory === "All" ? (
              <>Selected <em className="italic">Works</em></>
            ) : (
              <>{activeCategory} <em className="italic">Projects</em></>
            )}
          </h1>
          {activeCategory !== "All" && (
            <p className="text-foreground/50 text-sm mt-2">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </p>
          )}
        </ScrollReveal>

        {/* Category navigation */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-4 sm:gap-8 mt-8 sm:mt-10 mb-10 sm:mb-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleNav(cat)}
                className="relative group text-sm text-foreground/60 hover:text-foreground transition-colors duration-300 py-2"
                style={{ letterSpacing: "0.12em" }}
              >
                {cat.toUpperCase()}
                <span
                  className={`absolute bottom-0 left-0 h-[1px] bg-accent transition-all duration-300 ease-out ${
                    activeCategory === cat ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* ── PROJECTS GRID ── */}

        {/* Projects grid */}
        {filtered.length === 0 ? (
          <ScrollReveal delay={150}>
            <div className="py-24 text-center">
              <p className="text-foreground/40 text-sm uppercase tracking-widest" style={{ letterSpacing: "0.15em" }}>
                No projects in this category yet
              </p>
              <button
                onClick={() => navigate("/projects")}
                className="mt-8 text-sm text-accent border border-accent/30 px-6 py-3 hover:bg-accent/5 transition-colors"
                style={{ letterSpacing: "0.1em" }}
              >
                VIEW ALL WORKS
              </button>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 100}>
                <ProjectCard
                  slug={project.slug}
                  image={project.image}
                  title={project.title}
                  category={project.category}
                  location={project.location}
                  year={project.year}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProjectsPage;

