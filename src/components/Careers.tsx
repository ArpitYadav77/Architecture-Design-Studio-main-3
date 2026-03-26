import ScrollReveal from "./ScrollReveal";

const Careers = () => {
  return (
    <section id="careers" className="bg-background">
      {/* Page header band */}
      <div className="bg-[#2A221D] py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400 mb-4">Join the Firm</p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-light text-white leading-tight">
              Careers at<br />
              <em className="italic">Bachitter Singh Associates</em>
            </h1>
            <p className="mt-4 sm:mt-6 text-white/60 text-sm sm:text-base max-w-xl leading-relaxed">
              We are always looking for talented architects, planners, and designers who share 
              our commitment to enduring, purposeful work. Join a practice with over 40 years 
              of landmark projects across India.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-14 sm:py-20">
        <ScrollReveal>
          <div className="border border-foreground/10 bg-[#f5f2ee] p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-700 mb-2">We'd love to hear from you</p>
              <h3 className="font-serif text-2xl font-light text-neutral-900">
                Send us your <em className="italic">resume</em>
              </h3>
              <p className="text-neutral-600 text-sm mt-2 max-w-md leading-relaxed">
                We are always interested in hearing from talented architects and designers. 
                Email your portfolio and CV to{" "}
                <a href="mailto:bachittersingh@yahoo.com" className="text-amber-700 underline underline-offset-2">
                  bachittersingh@yahoo.com
                </a>{" "}
                and we will be in touch.
              </p>
            </div>
            <a
              href="mailto:bachittersingh@yahoo.com"
              className="flex-shrink-0 bg-[#2A221D] hover:bg-amber-800 text-white text-xs uppercase tracking-[0.2em] px-10 py-4 transition-colors duration-300 whitespace-nowrap"
            >
              Email Us
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Careers;
