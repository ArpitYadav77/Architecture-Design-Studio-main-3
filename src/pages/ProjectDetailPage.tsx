import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Layers, User, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { getProjectBySlug, allProjects } from "@/data/projects";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
          <p className="text-foreground/40 text-sm uppercase tracking-widest" style={{ letterSpacing: "0.18em" }}>
            Project not found
          </p>
          <Link
            to="/projects"
            className="text-sm text-accent border border-accent/30 px-6 py-3 hover:bg-accent/5 transition-colors"
            style={{ letterSpacing: "0.1em" }}
          >
            ← BACK TO PORTFOLIO
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Related projects — same category, exclude current, max 3
  const related = allProjects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);
  const fallbackRelated = allProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);
  const relatedProjects = related.length > 0 ? related : fallbackRelated;

  const paragraphs = project.description.split("\n\n");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO BANNER ──────────────────────────────────────────────────── */}
      <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[72vh] lg:h-[80vh] overflow-hidden opacity-0 animate-fade-in">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover scale-105 animate-scale-in"
          style={{ animationDuration: "1.4s" }}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        {/* Landmark badge */}
        {project.isLandmark && (
          <div className="absolute top-24 left-6 md:left-12 lg:left-24 z-10">
            <span className="bg-accent/90 text-white text-[10px] uppercase tracking-widest px-3 py-1">
              Landmark Project
            </span>
          </div>
        )}
        {/* Title over image */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 md:px-12 lg:px-24 pb-8 sm:pb-10 md:pb-14">
          <p
            className="text-accent text-[11px] font-semibold uppercase mb-3 opacity-0 animate-fade-up"
            style={{ letterSpacing: "0.18em", animationDelay: "0.2s" }}
          >
            {project.category}
          </p>
          <h1
            className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.06] opacity-0 animate-fade-up"
            style={{ animationDelay: "0.35s" }}
          >
            {project.title}
          </h1>
          <p
            className="text-white/70 text-sm mt-3 flex items-center gap-2 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            <MapPin size={13} className="text-accent" />
            {project.location} &nbsp;·&nbsp; {project.year}
          </p>
        </div>
      </div>

      {/* ── BREADCRUMB + BACK ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 pt-8 sm:pt-10 pb-2 flex items-center justify-between">
        <nav className="flex items-center gap-2 text-xs text-foreground/40 uppercase tracking-widest" style={{ letterSpacing: "0.14em" }}>
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="text-foreground/20">›</span>
          <Link to="/projects" className="hover:text-foreground transition-colors">Portfolio</Link>
          <span className="text-foreground/20">›</span>
          <span className="text-accent">{project.title}</span>
        </nav>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs text-foreground/50 hover:text-foreground transition-colors uppercase"
          style={{ letterSpacing: "0.12em" }}
        >
          <ArrowLeft size={14} />
          Back
        </button>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">

        {/* Left — metadata panel */}
        <ScrollReveal>
          <aside className="space-y-0">
            <div className="border-t border-foreground/10 pt-8 space-y-6">
              {[
                { icon: <Layers size={14} />, label: "Category", value: project.category },
                { icon: <MapPin size={14} />, label: "Location", value: project.location },
                { icon: <Calendar size={14} />, label: "Year", value: project.year },
                project.area   ? { icon: <Activity size={14} />, label: "Area",   value: project.area   } : null,
                project.client ? { icon: <User     size={14} />, label: "Client", value: project.client } : null,
                project.status ? { icon: <Activity size={14} />, label: "Status", value: project.status } : null,
              ]
                .filter(Boolean)
                .map((item) => (
                  <div key={item!.label} className="flex items-start gap-4 pb-6 border-b border-foreground/10 last:border-0">
                    <span className="text-accent mt-0.5">{item!.icon}</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-1" style={{ letterSpacing: "0.16em" }}>
                        {item!.label}
                      </p>
                      <p className="text-sm text-foreground font-medium">{item!.value}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* CTA */}
            <div className="pt-8">
              <Link
                to="/contact"
                className="block w-full text-center px-6 py-4 bg-foreground text-background text-xs uppercase tracking-widest hover:bg-accent transition-colors duration-300"
                style={{ letterSpacing: "0.15em" }}
              >
                Enquire About This Project
              </Link>
            </div>
          </aside>
        </ScrollReveal>

        {/* Right — description */}
        <ScrollReveal delay={150}>
          <div>
            <p className="text-accent text-[10px] uppercase mb-6 font-semibold" style={{ letterSpacing: "0.2em" }}>Project Overview</p>
            <div className="space-y-5">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="text-foreground/80 text-base md:text-lg leading-relaxed font-light">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* ── GALLERY ──────────────────────────────────────────────────────── */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 pb-16 sm:pb-20">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-1 h-8 bg-accent" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent mb-1">Visual Record</p>
                <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground">
                  Image <em className="italic">Gallery</em>
                </h2>
              </div>
            </div>
          </ScrollReveal>

          {/* Primary large image */}
          <ScrollReveal delay={50}>
            <div className="aspect-[16/7] overflow-hidden bg-muted mb-4">
              <img
                src={project.gallery[0]}
                alt={`${project.title} — main view`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </ScrollReveal>

          {/* Secondary images — stacked vertically (1 col) or grid (2-3 cols) */}
          {project.gallery.length > 1 && (() => {
            const secondary = project.gallery.slice(1);
            const gridCols =
              secondary.length === 1
                ? "grid-cols-1"
                : secondary.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-3";
            return (
              <div className={`grid ${gridCols} gap-4`}>
                {secondary.map((img, idx) => (
                  <ScrollReveal key={idx} delay={idx * 80 + 100}>
                    <div className="aspect-[4/3] overflow-hidden bg-muted group">
                      <img
                        src={img}
                        alt={`${project.title} — view ${idx + 2}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* ── RELATED PROJECTS ─────────────────────────────────────────────── */}
      {relatedProjects.length > 0 && (
        <div
          className="py-20 border-t border-foreground/10"
          style={{ backgroundColor: "#F9F7F4" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
            <ScrollReveal>
              <p className="text-accent text-[10px] uppercase mb-2 font-semibold" style={{ letterSpacing: "0.2em" }}>Continue Exploring</p>
              <h2 className="text-2xl md:text-3xl font-serif font-light text-foreground mb-12">
                Related <em className="italic">Works</em>
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel, i) => (
                <ScrollReveal key={rel.slug} delay={i * 100}>
                  <Link
                    to={`/project/${rel.slug}`}
                    className="group block cursor-pointer overflow-hidden"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ backgroundColor: "rgba(28, 23, 20, 0.45)" }}
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-accent transition-colors duration-300">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-foreground/60 mt-1 uppercase" style={{ letterSpacing: "0.1em" }}>
                        {rel.category} · {rel.location}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── BACK TO PORTFOLIO ────────────────────────────────────────────── */}
      <div className="py-16 flex justify-center border-t border-foreground/10">
        <Link
          to="/projects"
          className="flex items-center gap-3 text-sm text-foreground/60 hover:text-foreground transition-colors uppercase group"
          style={{ letterSpacing: "0.14em" }}
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
