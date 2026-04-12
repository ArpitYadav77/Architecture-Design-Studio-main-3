import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import welcomeImage from "@/assets/image.png";

interface WelcomePageProps {
  onEnter: () => void;
  onStartReveal: () => void;
}

const WelcomePage = ({ onEnter, onStartReveal }: WelcomePageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    onStartReveal();
    setIsExiting(true);
    // Wait for slide-up animation before calling onEnter
    setTimeout(() => onEnter(), 1000);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9998] flex flex-col items-center justify-center transition-all duration-1000 cubic-bezier(0.85, 0, 0.15, 1) bg-black",
        isVisible ? "opacity-100" : "opacity-0",
        isExiting ? "-translate-y-full pointer-events-none" : "translate-y-0"
      )}
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <img
          src={welcomeImage}
          alt="Bachitter Singh Associates Welcome"
          className={cn(
            "w-full h-full object-cover transition-all duration-2000 ease-out",
            isVisible ? "opacity-60 scale-100 animate-ken-burns" : "opacity-0 scale-110"
          )}
        />
        {/* Elegant Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 text-center relative z-10">
        {/* Decorative element */}
        <div
          className={cn(
            "mb-10 h-px bg-accent/60 mx-auto transition-all duration-1000 delay-300",
            isVisible ? "w-32" : "w-0"
          )}
        />

        <div className="space-y-8">
          <div className="overflow-hidden">
            <p
              className={cn(
                "body-sm text-white/60 transition-all duration-700 delay-500",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              )}
            >
              since 1983
            </p>
          </div>

          <h1
            className={cn(
              "font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none text-white transition-all duration-1000 delay-700",
              isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
            )}
          >
            Bachitter Singh <br />
            <span className="italic text-accent">Associates</span>
          </h1>

          <div className="overflow-hidden">
            <p
              className={cn(
                "body-lg text-white/80 max-w-xl mx-auto transition-all duration-700 delay-1000",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
              )}
            >
              Over four decades of architectural excellence, shaping civic and cultural landmarks across India.
            </p>
          </div>
        </div>

        <div
          className={cn(
            "mt-16 transition-all duration-1000 delay-[1300ms]",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}
        >
          <Button
            onClick={handleEnter}
            variant="default"
            size="lg"
            className="group relative px-12 py-8 bg-transparent hover:bg-white text-white hover:text-black border border-white/30 transition-all duration-300 rounded-none uppercase tracking-[0.3em] text-xs"
          >
            <span className="relative z-10">View Portfolio</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>
        </div>
      </div>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.1] -z-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
    </div>
  );
};

export default WelcomePage;
