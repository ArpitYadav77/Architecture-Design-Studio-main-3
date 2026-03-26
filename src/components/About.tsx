import ScrollReveal from "./ScrollReveal";
import architectPortrait from "@/assets/bachitter-singh.jpg";

const stats = [
  { number: "1983", label: "Year Established" },
  { number: "40+", label: "Years of Practice" },
  { number: "200+", label: "Projects Delivered" },
  { number: "420+", label: "Acres Master Planned" },
];

const milestones = [
  { year: "1983", event: "Firm founded by Ar. Bachitter Singh in Chandigarh. Early commissions set the foundation for a practice devoted to civic and institutional architecture." },
  { year: "1990s", event: "Landmark government and judiciary projects including the Punjab & Haryana High Court complex — cementing the firm's standing in institutional design at the highest level." },
  { year: "2000s", event: "Appointed for Vidhan Sabha work and major legislative campus design — a hallmark of public trust and architectural authority." },
  { year: "2010s", event: "Expanded practice into master planning, urban design, and educational campuses. Pan-India institutional presence established with 420+ acres planned." },
  { year: "Present", event: "Over 200 completed projects. A legacy practice spanning residential, cultural, civic, hospitality, and urban sectors across India." },
];

const team = [
  {
    name: "Bachitter Singh",
    designation: "Principal Architect",
    qualification: "B. Arch",
    experience: "44 years",
    since: "1981",
    image: architectPortrait,
  },
  {
    name: "Priyaas B Singh",
    designation: "Team Leader (Sr Architect)",
    qualification: "B. Arch",
    experience: "13 years",
    since: "2016",
    image: null,
  },
  {
    name: "Saanch Singh",
    designation: "Sr Architect",
    qualification: "B. Arch",
    experience: "9 years",
    since: "2017",
    image: null,
  },
  {
    name: "Himali Sukhija",
    designation: "Architect",
    qualification: "B. Arch",
    experience: "5 years",
    since: "2021",
    image: null,
  },
  {
    name: "Aniket",
    designation: "Architect",
    qualification: "Diploma in Architecture",
    experience: "6 years",
    since: "2019",
    image: null,
  },
  {
    name: "Jatinder Goswami",
    designation: "Civil Engineer",
    qualification: "B.Tech (Civil)",
    experience: "14 years",
    since: "2017",
    image: null,
  },
  {
    name: "Vivek Kalsia",
    designation: "Structural Engineer",
    qualification: "M.Tech (Str.)",
    experience: "9 years",
    since: "2021",
    image: null,
  },
  {
    name: "S.K. Kaushal",
    designation: "Electrical Engineer",
    qualification: "B.Tech (Electrical)",
    experience: "47 years",
    since: "2017",
    image: null,
  },
];

const AboutAndTeam = () => {
  return (
    <>
      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="py-14 sm:py-20 md:py-28 bg-[#f5f2ee] text-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">

          <ScrollReveal>
            <p className="uppercase tracking-[0.3em] text-xs text-amber-700 mb-10">
              About the Firm
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-start">

            {/* LEFT CONTENT */}
            <div>
              <ScrollReveal delay={100}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light leading-tight mb-6 sm:mb-8">
                  Architecture that harmonises <br className="hidden sm:block" />
                  <span className="italic">vision, function & legacy</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <p className="text-lg leading-relaxed text-neutral-700 mb-6">
                  Established in <strong>1983</strong> by <strong>Ar. Bachitter Singh</strong>, our practice has shaped 
                  institutional, civic, and large-scale developments across India for over four decades. 
                  Our work integrates architectural excellence with engineering precision, creating spaces 
                  that reflect permanence, purpose, and public trust.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <p className="text-base leading-relaxed text-neutral-600 mb-6">
                  From high-level government infrastructure — including the <strong>Vidhan Sabha</strong> and 
                  the <strong>Punjab &amp; Haryana High Court</strong> — to expansive master-planned 
                  townships and educational campuses, our portfolio reflects the confidence placed in us 
                  by the highest levels of governance and institutional leadership.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={360}>
                <p className="text-base leading-relaxed text-neutral-600 mb-12">
                  Headquartered at <strong>1514, Sector 7C, Chandigarh</strong>, we design environments 
                  that balance spatial intelligence, cultural sensitivity, and long-term sustainability — 
                  with a commitment to architecture that truly endures.
                </p>
              </ScrollReveal>

              {/* STATS */}
              <ScrollReveal delay={420}>
                <div className="border-t border-neutral-300 pt-10 grid grid-cols-2 md:grid-cols-4 gap-10">
                  {stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-serif text-3xl md:text-4xl font-light text-neutral-900">
                        {stat.number}
                      </p>
                      <p className="uppercase text-xs tracking-wider text-neutral-500 mt-2">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* RIGHT IMAGE */}
            <ScrollReveal delay={200}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={architectPortrait}
                  alt="Ar. Bachitter Singh — Principal Architect"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-[center_20%]"
                />
                <div className="absolute bottom-8 left-8 bg-[#b37a45] text-white px-10 py-6 shadow-2xl">
                  <p className="uppercase tracking-[0.35em] text-xs">
                    Ar.BACHITTER SINGH
                  </p>
                  <p className="font-serif text-xl font-light mt-2">
                    Principal Architect 
                  </p>
                  <p className="text-xs text-white/70 mt-1 uppercase tracking-widest">Est. 1983 · Chandigarh</p>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ================= OUR TEAM SECTION (commented out) =================
      <section id="team" className="py-14 sm:py-20 md:py-28 bg-white text-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">

          <ScrollReveal>
            <p className="uppercase tracking-[0.3em] text-xs text-amber-700 mb-6">
              Our Team
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-4">
              The people behind <span className="italic">our practice</span>
            </h2>
            <p className="text-neutral-500 text-base font-light mb-16 max-w-xl leading-relaxed">
              Architects, designers, and thinkers — every one of whom brings focused craft and shared conviction to the work we build together.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 80}>
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden bg-neutral-100 mb-5 relative">
                    {member.image ? (
                      <>
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top transition-all duration-500 ease-in-out grayscale group-hover:grayscale-0 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-200 group-hover:bg-neutral-300 transition-colors duration-300">
                        <span className="font-serif text-5xl font-light text-neutral-500 group-hover:text-amber-700 transition-colors duration-300 select-none">
                          {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-neutral-200 pt-4">
                    <h3 className="font-serif text-lg font-medium text-neutral-900 group-hover:text-amber-700 transition-colors duration-300 leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs uppercase tracking-[0.14em] text-amber-700 mt-1 font-medium">
                      {member.designation}
                    </p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs text-neutral-500">
                        <span className="uppercase tracking-wider text-neutral-400">Qualification</span><br />
                        {member.qualification}
                      </p>
                      <p className="text-xs text-neutral-500">
                        <span className="uppercase tracking-wider text-neutral-400">Experience</span><br />
                        {member.experience}
                      </p>
                      <p className="text-xs text-neutral-500">
                        <span className="uppercase tracking-wider text-neutral-400">With Firm Since</span><br />
                        {member.since}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      ================= END OUR TEAM SECTION ================= */}

      {/* ================= MILESTONES SECTION ================= */}
      <section id="milestones" className="py-14 sm:py-20 md:py-28 bg-[#2A221D] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">

          <ScrollReveal>
            <p className="uppercase tracking-[0.3em] text-xs text-amber-400 mb-6">
              Firm History
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight mb-20">
              Four decades of <span className="italic">shaping India</span>
            </h2>
          </ScrollReveal>

          <div className="relative border-l border-white/20 pl-10 space-y-14">
            {milestones.map((m, i) => (
              <ScrollReveal key={m.year} delay={i * 120}>
                <div className="relative">
                  {/* dot */}
                  <span className="absolute -left-[44px] top-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-[#2A221D]" />
                  <p className="text-amber-400 text-xs uppercase tracking-[0.25em] mb-2">{m.year}</p>
                  <p className="text-white/80 text-base leading-relaxed">{m.event}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutAndTeam;
