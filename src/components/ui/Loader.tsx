import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Loader renders as a fixed overlay ON TOP of the already-mounted app.
 * Incorporates a squeeze/pop entrance and then zooms massively into the center of the logo.
 */
const Loader = ({ onFinish }: { onFinish: () => void }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Phase 1: Logo sequence (bounce + massive zoom) is ~2.4s
    // Phase 2: Fade out the background completely at the end of zoom (~1.9s)
    const leaveTimeout = setTimeout(() => setIsLeaving(true), 1900);
    
    // Phase 3: Unmount fully once animation completes
    const finishTimeout = setTimeout(() => onFinish(), 2500);

    return () => {
      clearTimeout(leaveTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onFinish]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ease-in-out",
        isLeaving ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
      style={{
        backgroundColor: "#fdfcfb", // Force light premium background
      }}
    >
      <div className="relative flex items-center justify-center">
        <img
          src="/logo1.png"
          alt="Firm Logo"
          className="w-[120px] md:w-[160px] h-auto animate-logo-sequence origin-center"
          style={{
            filter: "brightness(0.95)", // Subtle high-end feel
          }}
        />
        {/* Subtle shadow/glow for depth */}
        <div className={cn(
          "absolute inset-0 bg-primary/5 blur-3xl rounded-full -z-10 transition-opacity duration-300",
          isLeaving ? "opacity-0" : "opacity-100"
        )} />
      </div>
    </div>
  );
};

export default Loader;