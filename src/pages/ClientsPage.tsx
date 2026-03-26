import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Dynamically import all logos from the logo folder to allow Vite to bundle them correctly
const logoModules = import.meta.glob<{ default: string }>('../assets/logo/*.{png,jpg,jpeg,svg,webp}', { eager: true });

const extractClientNameFromFilename = (path: string): string => {
  let filename = path.split('/').pop()?.replace(/\.[^/.]+$/, '') || '';
  filename = filename.replace(/_logo$/i, '').replace(/_/g, ' ').trim();
  return filename;
};

const clientsData = Object.entries(logoModules).map(([path, module]) => ({
  title: extractClientNameFromFilename(path),
  logoUrl: module.default
}));

const ClientCard = ({ client, index }: { client: { title: string; logoUrl: string }; index: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const delay = (index % 6) * 100;

  return (
    <div
      ref={domRef}
      className={`
        flex flex-col items-center justify-center text-center
        bg-white rounded-xl border border-stone-200/60 p-5 md:p-7
        shadow-sm hover:shadow-md hover:border-accent/40 hover:-translate-y-1 hover:scale-[1.02]
        transition-all duration-500 ease-out group aspect-[4/3]
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {!imageError ? (
        <img
          src={client.logoUrl}
          alt={client.title}
          className="max-w-[140px] h-auto object-contain transition-transform duration-300"
          onError={() => setImageError(true)}
        />
      ) : null}
      <span className="sr-only">{client.title}</span>
    </div>
  );
};

const ClientsPage: React.FC = () => {
  useEffect(() => {
    document.title = "Clients | Bachitter Singh Associates";
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f2ee] flex flex-col">
      <Navbar />
      <main className="flex-1 pt-14 md:pt-16">
        {/* Full-width Brown Background Header Strip */}
        <div className="bg-[#2A221D] py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 w-full">
          <div className="max-w-7xl mx-auto">
            {/* Section Heading */}
            <div className="text-left animate-fade-up">
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400 mb-4">Our Network</p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-light text-white leading-tight">
                Trusted By <em className="italic text-white">Leading Organizations</em>
              </h1>
              <p className="mt-4 sm:mt-6 text-white/60 text-sm sm:text-base max-w-xl leading-relaxed">
                We take pride in our collaborations with esteemed institutions, government bodies, and leading enterprises across various sectors.
              </p>
            </div>
          </div>
        </div>

        {/* Client Logos Grid Section - Light Background */}
        <section className="bg-[#f5f2ee] py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-7">
              {clientsData.map((client, index) => (
                <ClientCard key={index} client={client} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ClientsPage;
