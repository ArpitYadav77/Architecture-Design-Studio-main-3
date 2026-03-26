import { ReactNode, memo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageLayoutProps {
  children: ReactNode;
  /** Set false to hide footer (e.g. on detail pages that render their own) */
  showFooter?: boolean;
  /** Additional className for the page wrapper */
  className?: string;
}

/**
 * Shared page layout — renders Navbar + Footer once
 * instead of duplicating them in every page component.
 */
const PageLayout = memo(({ children, showFooter = true, className = "" }: PageLayoutProps) => (
  <div className={`min-h-screen bg-background ${className}`}>
    <Navbar />
    {children}
    {showFooter && <Footer />}
  </div>
));

PageLayout.displayName = "PageLayout";

export default PageLayout;
