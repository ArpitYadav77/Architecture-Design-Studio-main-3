import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import { MapPin, Phone, Mail, Globe, Instagram } from "lucide-react";

const FORMSPREE_URL = "https://formspree.io/f/mojkadan";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: form.message }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-[#f5f2ee]">
      {/* Page header band */}
      <div className="bg-[#2A221D] py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400 mb-4">Contact</p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-light text-white leading-tight">
              Bachitter Singh<br />
              <em className="italic">Associates</em>
            </h1>
            <p className="mt-4 sm:mt-6 text-white/60 text-sm sm:text-base max-w-xl leading-relaxed" style={{ letterSpacing: "0.02em" }}>
              We welcome project enquiries, collaborations, and consultations. 
              Reach out through any of the channels below or send us a query directly.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">

          {/* LEFT — Contact Details */}
          <div>
            <ScrollReveal>
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 mb-8">Our Studio</p>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-5 border-b border-neutral-200 pb-8">
                  <div className="mt-1 w-8 h-8 flex items-center justify-center bg-[#2A221D] flex-shrink-0">
                    <MapPin className="w-4 h-4 text-amber-400 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Studio Address</p>
                    <p className="text-neutral-900 font-medium leading-relaxed">
                      1514, Sector 7C<br />
                      Chandigarh – 160019
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5 border-b border-neutral-200 pb-8">
                  <div className="mt-1 w-8 h-8 flex items-center justify-center bg-[#2A221D] flex-shrink-0">
                    <Phone className="w-4 h-4 text-amber-400 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Phone</p>
                    <p className="text-neutral-900 font-medium leading-relaxed">
                      +91 172 2792283<br />
                      +91 8860372037
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5 border-b border-neutral-200 pb-8">
                  <div className="mt-1 w-8 h-8 flex items-center justify-center bg-[#2A221D] flex-shrink-0">
                    <Mail className="w-4 h-4 text-amber-400 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Email</p>
                    <p className="text-neutral-900 font-medium leading-relaxed">
                      bachittersingh@yahoo.com<br />
                    
                    </p>
                  </div>
                </div>


                {/* Instagram */}
                <div className="flex items-start gap-5">
                  <div className="mt-1 w-8 h-8 flex items-center justify-center bg-[#2A221D] flex-shrink-0">
                    <Instagram className="w-4 h-4 text-amber-400 stroke-[1.5]" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-500 mb-1">Instagram</p>
                    <p className="text-neutral-900 font-medium">@bachittersinghassociates</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* RIGHT — Send Query Form */}
          <ScrollReveal delay={150}>
            <div className="bg-white p-10 shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700 mb-2">Send a Query</p>
              <h2 className="font-serif text-2xl font-light text-neutral-900 mb-8">
                Start a <em className="italic">conversation</em>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                    Full Name <span className="text-amber-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    maxLength={100}
                    required
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-amber-700 transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                    Email Address <span className="text-amber-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    maxLength={255}
                    required
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-amber-700 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    maxLength={20}
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-amber-700 transition-colors"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
                    Message <span className="text-amber-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    maxLength={1000}
                    rows={4}
                    required
                    className="w-full bg-transparent border-b border-neutral-300 py-3 text-sm font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-amber-700 transition-colors resize-none"
                    placeholder="Describe your project or inquiry..."
                  />
                </div>

                {status === "success" && (
                  <p className="text-sm text-green-700 bg-green-50 border border-green-200 px-4 py-3">
                    Thank you — your query has been submitted. We will be in touch shortly.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-4 w-full bg-[#2A221D] hover:bg-amber-800 disabled:opacity-60 text-white text-xs uppercase tracking-[0.2em] py-4 transition-colors duration-300"
                >
                  {status === "submitting" ? "Sending…" : "Submit Query"}
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
