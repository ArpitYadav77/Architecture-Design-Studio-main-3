const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Simple inline Instagram SVG icon
  const InstagramIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8 flex-shrink-0"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );

  return (
    <footer className="bg-[#f5f3ef] border-t border-neutral-300">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-14 sm:py-20">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-sm">
          
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-semibold tracking-wide text-neutral-900">
              Bachitter Singh Associates<span></span>
            </h2>

          <a
  href="https://www.google.com/maps/place/Bachitter+Singh+Associates/@30.7344236,76.8017605,832m/data=!3m2!1e3!4b1!4m6!3m5!1s0x390fed19c0d0c17f:0x5f0e9906a199f69c!8m2!3d30.7344236!4d76.8017605!16s%2Fg%2F1tf7qj43?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-block"
>
  <p className="text-neutral-700 leading-relaxed relative inline-block">
    1514, Sector 7C <br />
    Chandigarh – 160019

    {/* Animated underline */}
    <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
  </p>
</a>

            
          </div>
          

          {/* Contact */}
          <div className="space-y-6 md:pl-8">
            <h3 className="uppercase tracking-[0.25em] text-xs text-neutral-900">
              Contact
            </h3>

            <div className="flex flex-col gap-4 text-neutral-800">
              <a href="tel:+911722792283" className="hover-link">
                +91 172 2792283
              </a>

              <a href="tel:+918860372037" className="hover-link">
                +91 8860372037
              </a>

              <a href="mailto:bachittersingh@yahoo.com" className="hover-link pt-2">
                bachittersingh@yahoo.com
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-6 md:text-right">
            <h3 className="uppercase tracking-[0.25em] text-xs text-neutral-900 invisible md:visible">
              Social
            </h3>

            <div className="flex flex-col gap-4 text-neutral-800 md:items-end">
              <a href="https://www.instagram.com/bachitter_singh_associates?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-neutral-300 text-center text-xs text-neutral-600 tracking-wide">
          © {currentYear} Bachitter Singh Associates. All rights reserved.
        </div>

      </div>

      {/* Underline Animation */}
      <style>{`
        .hover-link {
          position: relative;
          display: inline-block;
          width: fit-content;
        }

        .hover-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 1px;
          background-color: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .hover-link:hover::after {
          transform: scaleX(1);
        }
      `}</style>
    </footer>
  );
};

export default Footer;