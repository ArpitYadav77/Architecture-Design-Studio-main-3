import { useParams, useNavigate, Link } from "react-router-dom";
import { useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import { portfolioProjects, landmarkProjects, allProjectsSorted } from "@/data/projects";

// Competition always last
const categories = [
  "Education",
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

const filtered =
  activeCategory === "All"
    ? portfolioProjects
    : allProjectsSorted
        .filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())
        .sort((a, b) => {
          const getPriority = (obj: typeof a) => {
            if (typeof obj.priority === "number") return obj.priority;
            if (typeof (obj as any).P === "number") return (obj as any).P;
            return Infinity;
          };

          const ap = getPriority(a);
          const bp = getPriority(b);

          if (ap !== bp) return ap - bp;
          return a.title.localeCompare(b.title);
        });

  const showLandmarks = activeCategory === "All";

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

        {/* ── LANDMARK / PRESTIGE PROJECTS ── */}
        {showLandmarks && (
          <div className="mb-20">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-1 h-8 bg-accent" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-accent mb-1">Prestige Works</p>
                  <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground">
                    Landmark <em className="italic">Projects</em>
                  </h2>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {landmarkProjects.map((project, i) => (
                <ScrollReveal key={project.slug} delay={i * 120}>
                  <ProjectCard
                    slug={project.slug}
                    image={project.image}
                    title={project.title}
                    category={project.category}
                    location={project.location}
                    year={project.year}
                    isLandmark
                    tagline={project.tagline}
                  />
                </ScrollReveal>
              ))}
            </div>

            {/* All works divider */}
            <ScrollReveal delay={200}>
              <div className="flex items-center gap-4 mt-16 mb-2">
                <div className="w-1 h-8 bg-foreground/20" />
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40 mb-1">Portfolio</p>
                  <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground">
                    All <em className="italic">Works</em>
                  </h2>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}

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

