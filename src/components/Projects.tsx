import { memo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import ProjectCard from "./ProjectCard";
import { portfolioProjects } from "@/data/projects";

const categories = ["All", "Commercial", "Corporate", "Cultural", "Education", "Hospitality", "Interior", "Residential", "Urban", "Competition", "Misc"];

const Projects = memo(() => {
  const navigate = useNavigate();

  const handleCategoryChange = useCallback(
    (category: string) => {
      navigate(category === "All" ? "/projects" : `/projects/${category.toLowerCase()}`);
    },
    [navigate]
  );

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <p className="text-accent mb-6 text-xs tracking-widest uppercase" style={{ letterSpacing: "0.15em" }}>
            PORTFOLIO
          </p>
          <h2 className="heading-lg text-foreground mb-12">
            Selected <em className="italic">Works</em>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-4 sm:gap-8 mb-10 sm:mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className="relative group text-sm text-foreground/60 hover:text-foreground transition-colors duration-300 py-2"
                style={{ letterSpacing: "0.12em" }}
              >
                {cat.toUpperCase()}
                <span className="absolute bottom-0 left-0 h-[1px] bg-accent transition-all duration-300 ease-out w-0 group-hover:w-full" />
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioProjects.map((project, i) => (
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

        <ScrollReveal delay={300}>
          <div className="mt-16 text-center">
            <Link
              to="/projects"
              className="inline-block text-sm uppercase border border-foreground/20 px-10 py-4 hover:bg-foreground hover:text-background transition-all duration-300"
              style={{ letterSpacing: "0.15em" }}
            >
              View Full Portfolio
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;
