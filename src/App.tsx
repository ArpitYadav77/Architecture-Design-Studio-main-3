import { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Loader from "@/components/ui/Loader";

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

// Minimal page-transition fallback (no spinner — just an immediate fade)
const PageFallback = () => (
  <div className="min-h-screen bg-background" aria-busy="true" />
);

/** Lightweight fade wrapper — uses CSS class + key = path for route transitions */
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div
      key={location.pathname}
      className="animate-page-fade"
    >
      <Suspense fallback={<PageFallback />}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
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

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
      {/* Loader overlays the already-mounted app — no cold-mount delay */}
      {loading && <Loader onFinish={() => setLoading(false)} />}
    </TooltipProvider>
  );
};

export default App;
