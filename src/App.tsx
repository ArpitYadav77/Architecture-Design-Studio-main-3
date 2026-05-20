import { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Loader from "@/components/ui/Loader";
import { cn } from "@/lib/utils";

// ── Lazy-loaded pages — each page gets its own chunk ──────────────────────
const Index = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ClientsPage = lazy(() => import("./pages/ClientsPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Minimal page-transition fallback (no spinner — just immediate black)
const PageFallback = () => (
  <div className="min-h-screen bg-black" aria-busy="true" />
);

/** Lightweight fade wrapper — uses CSS class + key = path for route transitions */
const AnimatedRoutes = ({ isStarted }: { isStarted: boolean }) => {
  const location = useLocation();
  return (
    <div
      key={location.pathname}
      className="animate-page-fade"
    >
      <Suspense fallback={<PageFallback />}>
        <Routes location={location}>
          <Route path="/" element={<Index isStarted={isStarted} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:category" element={<ProjectsPage />} />
          <Route path="/project/:slug" element={<ProjectDetailPage />} />
          <Route path="/careers" element={<CareersPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

import WelcomePage from "@/components/WelcomePage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  // Prevent welcome overlay from re-appearing on remount/navigation.
  const WELCOME_DONE_KEY = "welcomeDone";
  const hasWelcomeDone = typeof window !== "undefined" && window.sessionStorage.getItem(WELCOME_DONE_KEY) === "1";
  const [isHeroActive, setIsHeroActive] = useState(false);

  // Hero content animates when it becomes active
  const isStarted = !loading && isHeroActive;

  const handleFadeStart = () => {
    if (hasWelcomeDone) return;
    setShowWelcome(true);
  };

  const handleLoaderFinish = () => {
    setLoading(false);
  };

  const handleStartReveal = () => {
    setIsHeroActive(true);
  };

  const handleWelcomeEnd = () => {
    setShowWelcome(false);
    try {
      window.sessionStorage.setItem(WELCOME_DONE_KEY, "1");
    } catch {
      // ignore
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      <div className={cn("transition-opacity duration-500", !isHeroActive ? "opacity-0" : "opacity-100")}>
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes isStarted={isStarted} />
        </BrowserRouter>
      </div>
      
      {/* 
        The Welcome phase sits between the initial Loader and the main Hero.
        Loader fades -> Welcome appears underneath -> Loader unmounts -> App reveal.
      */}
      {loading && (
        <Loader 
          onFinish={handleLoaderFinish} 
          onFadeStart={handleFadeStart} 
        />
      )}
      
      {showWelcome && (
        <WelcomePage 
          onEnter={handleWelcomeEnd} 
          onStartReveal={handleStartReveal} 
        />
      )}
    </TooltipProvider>
  );
};

export default App;
