import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { label: "Projects", path: "/projects" },
    { label: "About", path: "/about" },
    { label: "Clients", path: "/clients" },
    { label: "Services", path: "/services" },
    { label: "Careers", path: "/careers" },
    { label: "Contact", path: "/contact" },
  ];

  const isActiveLink = (path: string) => {
    if (path === "/projects") return location.pathname === "/projects" || location.pathname.startsWith("/projects/");
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  };

  return (
    <>
      {/* ── Top Bar ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#E9E6E2]/95 backdrop-blur-md border-b border-stone-300 shadow-sm"
            : "bg-[#E9E6E2]/90 backdrop-blur-sm"
        }`}
        style={{ height: "60px" }}
      >
        <div className="flex items-center justify-between w-full h-full px-5 md:px-12 lg:px-24">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-lg md:text-2xl font-medium tracking-wide text-[#2A221D] hover:text-black transition-colors"
          >
             Bachitter Singh Associates<span className="text-accent">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="relative group text-sm font-medium text-[#6B645A] hover:text-black transition-colors duration-300 py-2"
                style={{ letterSpacing: "0.1em" }}
              >
                {link.label.toUpperCase()}
                <span
                  className={`absolute bottom-0 left-0 h-[1px] bg-black transition-all duration-300 ${
                    isActiveLink(link.path) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Hamburger – mobile only */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px]"
            aria-label="Open menu"
            style={{ width: 28, height: 28 }}
          >
            <span className="block w-6 h-[2px] bg-[#2A221D]" />
            <span className="block w-6 h-[2px] bg-[#2A221D]" />
            <span className="block w-6 h-[2px] bg-[#2A221D]" />
          </button>
        </div>
      </nav>

      {/* ── Full-screen Mobile Overlay ── */}
      <div
        className={`fixed inset-0 z-[100] bg-white transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* Overlay header */}
        <div
          className="flex items-center justify-between w-full px-5"
          style={{ height: "60px" }}
        >
          <span className="font-serif text-lg font-medium text-[#2A221D]">
            BSA<span className="text-accent">.</span>
          </span>

          <button
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center text-[#2A221D] hover:opacity-60 transition-opacity"
            aria-label="Close menu"
            style={{ width: 28, height: 28 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Links – centered vertically */}
        <div className="flex flex-col items-center justify-center gap-6" style={{ height: "calc(100vh - 60px)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`font-serif text-2xl transition-opacity ${
                isActiveLink(link.path)
                  ? "text-[#2A221D] font-medium"
                  : "text-[#2A221D]/80 hover:text-[#2A221D]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;