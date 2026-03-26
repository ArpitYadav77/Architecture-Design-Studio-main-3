import { useEffect, useState, useRef, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import LazyVideo, { type LazyVideoHandle } from "./LazyVideo";

/* ═══════════════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════════════ */
const FADE_DURATION = 1_200;  // crossfade transition in ms

/* ═══════════════════════════════════════════════════════════════════
   Slide data — 5 cinematic background videos
   ═══════════════════════════════════════════════════════════════════ */
const slides = [
  {
    video: "/architecture/lord.mp4",
    poster: undefined,
    label: "Civic & Legislative",
    heading: "Bachitter Singh\nAssociates",
    sub: "Over four decades of shaping India's most enduring civic, institutional, and architectural landmarks.",
  },
  {
    video: "/architecture/farm%20house%20.mp4",
    poster: undefined,
    label: "Residential Design",
    heading: "Living\nWith Grace",
    sub: "Private residences and farmhouses where architecture frames landscape, light, and everyday life.",
  },
  {
    video: "/architecture/reception.mp4",
    poster: undefined,
    label: "Architecture & Civic Design",
    heading: "Where Form\nMeets Purpose",
    sub: "From high courts to legislative assemblies — spaces built for permanence, authority, and the public good.",
  },
  {
    video: "/architecture/school.mp4",
    poster: undefined,
    label: "Education & Institutional",
    heading: "Shaping\nFutures",
    sub: "State-of-the-art academic campuses and institutional buildings that inspire learning and lasting community.",
  },
  {
    video: "/architecture/building.mp4",
    poster: undefined,
    label: "Skyline & Urban Design",
    heading: "Defining\nSkylines",
    sub: "Bold silhouettes that reshape cityscapes — towers, complexes, and mixed-use developments designed at metropolitan scale.",
  },
  {
    video: "/architecture/colony.mp4",
    poster: undefined,
    label: "Urban & Community",
    heading: "Legacy\nIn Every Line",
    sub: "200+ delivered projects across India, master-planning 420+ acres of civic and cultural landscape.",
  },
  {
    video: "/architecture/traim_tower.mp4",
    poster: undefined,
    label: "Corporate Architecture",
    heading: "Towers of\nAmbition",
    sub: "Corporate towers and mixed-use developments that redefine the contemporary workplace and urban horizon.",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   Hero component

   Two-layer crossfade system:
   ─ Layer A and Layer B are always mounted (never remounted).
   ─ One plays while the other preloads the next video.
   ─ On slide change, opacity swaps — zero flicker, no DOM churn.
   ═══════════════════════════════════════════════════════════════════ */
const Hero = memo(() => {
  /* ── State ── */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* ── Refs ── */
  const videoRefs = useRef<(LazyVideoHandle | null)[]>([]);

  // Mutable mirrors — prevent stale closures inside setTimeout
  const indexRef = useRef(0);
  const busyRef = useRef(false);

  /* ── Core transition ──────────────────────────────────────────── */
  const goTo = useCallback(
    (target: number) => {
      if (busyRef.current || target === indexRef.current) return;
      busyRef.current = true;
      setIsTransitioning(true);

      const oldIndex = indexRef.current;
      const oldVideo = videoRefs.current[oldIndex];
      const newVideo = videoRefs.current[target];

      // Play the next video
      newVideo?.play();

      indexRef.current = target;
      setCurrentIndex(target);

      // After crossfade completes → housekeeping
      setTimeout(() => {
        // Pause the old video to prevent playing multiple high-res videos simultaneously,
        // which heavily consumes CPU/GPU resources and causes severe stutter.
        if (oldVideo) {
          oldVideo.pause();
          if (oldVideo.el) {
            oldVideo.el.currentTime = 0;
          }
        }
        busyRef.current = false;
        setIsTransitioning(false);
      }, FADE_DURATION);
    },
    [],
  );

  const nextSlide = useCallback(
    () => goTo((indexRef.current + 1) % slides.length),
    [goTo],
  );

  const prevSlide = useCallback(
    () => goTo((indexRef.current - 1 + slides.length) % slides.length),
    [goTo],
  );

  /* ── Bootstrap: play only the initial video ──────────────── */
  useEffect(() => {
    videoRefs.current[0]?.play();
  }, []);

  /* ── Near-end → pre-trigger crossfade for seamless looping ──────── */
  const handleVideoNearEnd = useCallback((index: number) => {
    if (index === indexRef.current) nextSlide();
  }, [nextSlide]);

  /* ── Video ended → fallback advance (only when that layer is active) */
  const handleVideoEnded = useCallback((index: number) => {
    if (index === indexRef.current) nextSlide();
  }, [nextSlide]);

  /* ── Render ───────────────────────────────────────────────────── */
  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden"
    >
      {/* ─── Video layers (all mounted to force auto preload) ─── */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          // Preload the current, previous, and next slides. Prevents
          // loading 7 giant original-quality video files simultaneously.
          const isAdjacent =
            index === currentIndex ||
            index === (currentIndex + 1) % slides.length ||
            index === (currentIndex - 1 + slides.length) % slides.length;

          return (
            <LazyVideo
              key={slide.video}
              ref={(el) => (videoRefs.current[index] = el)}
              initialSrc={slide.video}
              poster={slide.poster}
              isActive={currentIndex === index}
              fadeDuration={FADE_DURATION}
              onEnded={() => handleVideoEnded(index)}
              onNearEnd={() => handleVideoNearEnd(index)}
              autoPlay={currentIndex === index}
              preload={isAdjacent ? "auto" : "none"}
            />
          );
        })}
        {/* Dark gradient overlay — always above both video layers */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70"
          style={{ zIndex: 3 }}
        />
      </div>

      {/* ─── Firm identity bar — top left below navbar ─── */}
      <div
        className="absolute top-[76px] left-4 sm:left-6 md:left-12 lg:left-24 z-20 flex items-center gap-3 opacity-0 animate-fade-up"
        style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
      >
        <span className="text-[10px] text-white/70 uppercase font-medium tracking-[0.22em]">
          Est. 1983
        </span>
        <span className="w-8 h-[1px] bg-accent/80" />
        <span className="text-[10px] text-white/70 uppercase font-medium tracking-[0.22em]">
          Chandigarh, India
        </span>
      </div>

      {/* ─── Location badge — right side (desktop only) ─── */}
      <div
        className="absolute top-[76px] right-6 md:right-12 z-20 hidden md:flex items-center gap-2 opacity-0 animate-fade-up"
        style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
      >
        <MapPin className="w-4 h-4 text-accent" />
        <span className="text-[11px] text-white/80 uppercase tracking-[0.18em]">
          1514, Sector 7C, Chandigarh
        </span>
      </div>

      {/* ─── Left-aligned text content ─── */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 sm:pb-24 md:pb-32 px-4 sm:px-6 md:px-12 lg:px-24">
        {/* Slide label */}
        <p
          key={`label-${currentIndex}`}
          className="text-[10px] sm:text-[11px] text-accent font-semibold mb-4 sm:mb-5 opacity-0 animate-fade-up uppercase"
          style={{
            animationDelay: "0.2s",
            animationFillMode: "forwards",
            letterSpacing: "0.20em",
          }}
        >
          {slides[currentIndex].label}
        </p>

        {/* Main heading */}
        <h1
          key={`h-${currentIndex}`}
          className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.08] mb-4 sm:mb-6 text-white opacity-0 animate-fade-up"
          style={{
            animationDelay: "0.35s",
            animationFillMode: "forwards",
            letterSpacing: "0.01em",
            whiteSpace: "pre-line",
          }}
        >
          {slides[currentIndex].heading}
        </h1>

        {/* Accent line */}
        <div
          key={`line-${currentIndex}`}
          className="w-10 sm:w-12 h-[2px] bg-accent mb-4 sm:mb-6 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        />

        {/* Subtext */}
        <p
          key={`sub-${currentIndex}`}
          className="text-sm sm:text-base md:text-lg text-white/80 font-light mb-8 sm:mb-10 max-w-xl opacity-0 animate-fade-up"
          style={{
            animationDelay: "0.6s",
            animationFillMode: "forwards",
            letterSpacing: "0.02em",
            lineHeight: "1.7",
          }}
        >
          {slides[currentIndex].sub}
        </p>

        {/* CTAs — stack on very small screens, 44px min tap target */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.75s", animationFillMode: "forwards" }}
        >
          <Link
            to="/projects"
            className="px-8 sm:px-10 py-3.5 sm:py-4 bg-accent hover:bg-[#D4A45C] text-white text-xs sm:text-sm font-medium uppercase transition-colors duration-300 text-center min-h-[44px] flex items-center justify-center"
            style={{ letterSpacing: "0.12em" }}
          >
            View Portfolio
          </Link>
          <Link
            to="/contact"
            className="px-8 sm:px-10 py-3.5 sm:py-4 border border-white/40 hover:border-white text-white text-xs sm:text-sm font-medium uppercase transition-colors duration-300 hover:bg-white/10 text-center min-h-[44px] flex items-center justify-center"
            style={{ letterSpacing: "0.12em" }}
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* ─── Navigation arrows — 44px min tap target ─── */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
        aria-label="Previous slide"
      >
        <div className="p-3 sm:p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
      </button>

      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
        aria-label="Next slide"
      >
        <div className="p-3 sm:p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full transition-colors duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center">
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
      </button>

      {/* ─── Pagination dots — padded for mobile tap ─── */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            disabled={isTransitioning}
            className="group disabled:cursor-not-allowed p-2 -m-2"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-[1px] transition-all duration-500 ${
                index === currentIndex
                  ? "w-12 bg-accent"
                  : "w-8 bg-white/40 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;

