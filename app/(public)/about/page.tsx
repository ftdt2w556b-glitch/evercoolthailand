import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "EverCool Thailand is a branch of Ever Cool HK and sister company of Tech Free. 20+ years in HVAC and IAQ solutions across Hong Kong, Macau and now Thailand.",
};

const CERTIFICATIONS = [
  { code: "ISO 9001", desc: "Quality Management System" },
  { code: "EN 1886", desc: "Air Handling Unit Performance" },
  { code: "AHRI 1350", desc: "Air-to-Air Energy Recovery" },
  { code: "AHRI 410", desc: "Forced-Circulation Air-Cooling Coils" },
  { code: "VDI 6022", desc: "Hygiene for Air Conditioning Systems" },
  { code: "BS 476", desc: "Fire Resistance Classification" },
  { code: "EN 13501", desc: "Fire Classification of Construction Products" },
];

const TIMELINE = [
  { year: "1998", event: "Founded as Ever Cool Refrigerating & Air Conditioning Co., Ltd. in Hong Kong, initially focused on HVAC and refrigerating product trading for Hong Kong and Macau markets." },
  { year: "1999", event: "Launched Dongguan Ever Cool Equipment Co., Ltd. in China to handle HVAC product trading and system installations in the mainland market." },
  { year: "2000", event: "Founded Hong Kong Tech Free Air Conditioning Technology Development Ltd. and established the TECH FREE manufacturing brand, producing Air Handlers, exhaust units, fresh air units, AHUs, and coils." },
  { year: "2008", event: "Integrated a certified Integrated Performance Test Laboratory within our factory, enabling in-house product testing to international standards." },
  { year: "2015", event: "Secured exclusive distribution rights for A-PLUS products in Hong Kong and Macau." },
  { year: "2016", event: "Secured exclusive distribution rights for BROAN ventilation products in Hong Kong and Macau." },
  { year: "2023", event: "Expanded into Thailand, establishing EverCool Thailand as the authorised BROAN distributor and TECH FREE representative for the Thai market." },
];

const PROJECTS = [
  {
    name: "The Londoner Hotel",
    location: "London, United Kingdom",
    desc: "The TECH FREE engineering team delivered a comprehensive HVAC solution covering system design, product development, control logic, and software programming for this flagship luxury hotel.",
  },
  {
    name: "Theme Park",
    location: "Macau",
    desc: "Full HVAC system design and implementation for a large-scale entertainment complex, including custom AHU units with integrated DDC control systems.",
  },
];

export default function AboutPage() {
  return (
    <main className="page-enter px-4 md:px-10 pt-6 pb-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-ec-teal uppercase tracking-widest mb-2">About EverCool Thailand</p>
        <h1 className="text-2xl md:text-3xl font-black text-ec-text leading-tight mb-3">
          25 Years of HVAC &amp; IAQ Excellence
        </h1>
        <p className="text-sm text-ec-text-muted leading-relaxed max-w-2xl">
          EverCool Thailand is a branch of Ever Cool HK and a proud sister company of Tech Free. We bring decades of international HVAC expertise to Thailand, offering custom air handling units, air quality consultation, and authorised Broan ventilation products.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { stat: "1998", label: "Year Founded" },
          { stat: "250,000+", label: "Sq ft Factory" },
          { stat: "VDI 6022", label: "Certified Team" },
          { stat: "7+", label: "Certifications" },
        ].map((item) => (
          <div key={item.stat} className="bg-ec-card rounded-2xl border border-ec-border p-4 text-center">
            <p className="text-lg font-black text-ec-teal leading-none mb-1">{item.stat}</p>
            <p className="text-[11px] text-ec-text-muted">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Company Story */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-ec-text mb-4">Our Story</h2>
        <div className="relative pl-4 border-l-2 border-ec-teal/20 flex flex-col gap-5">
          {TIMELINE.map((item) => (
            <div key={item.year} className="relative">
              <div className="absolute -left-[21px] top-0.5 w-4 h-4 rounded-full bg-ec-teal flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <p className="text-xs font-bold text-ec-teal mb-0.5">{item.year}</p>
              <p className="text-sm text-ec-text-muted leading-relaxed">{item.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-ec-text mb-4">Certifications &amp; Standards</h2>
        <p className="text-sm text-ec-text-muted mb-4 leading-relaxed">
          TECH FREE products comply with National Standard GBT14294 and are tested and certified to international standards. The manufacturing facility holds a Production License and Certificate of High &amp; New Technological Enterprise issued by the Chinese Government.
        </p>
        <div className="flex flex-col gap-2">
          {CERTIFICATIONS.map((cert) => (
            <div key={cert.code} className="flex items-center gap-3 bg-ec-card rounded-xl border border-ec-border px-4 py-3">
              <span className="text-xs font-bold text-ec-teal bg-ec-teal/10 px-2.5 py-1 rounded-lg shrink-0 min-w-[80px] text-center">
                {cert.code}
              </span>
              <span className="text-sm text-ec-text-muted">{cert.desc}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-ec-text-muted mt-3">
          Also: Danfoss Strategic Partner · Green Building Association Member
        </p>
      </section>

      {/* Notable Projects */}
      <section className="mb-8">
        <h2 className="text-base font-bold text-ec-text mb-4">Notable Projects</h2>
        <div className="flex flex-col md:flex-row gap-3">
          {PROJECTS.map((project) => (
            <div key={project.name} className="flex-1 bg-ec-card rounded-2xl border border-ec-border p-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-ec-teal/10 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-ec-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-ec-text leading-tight">{project.name}</p>
                  <p className="text-xs text-ec-teal font-medium mt-0.5">{project.location}</p>
                  <p className="text-xs text-ec-text-muted mt-2 leading-relaxed">{project.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manufacturing */}
      <section className="mb-8">
        <div className="bg-ec-navy rounded-2xl p-5 text-white">
          <h2 className="text-base font-bold mb-2">Our Manufacturing Facility</h2>
          <p className="text-sm text-white/70 leading-relaxed mb-4">
            The TECH FREE factory spans over 250,000 sq ft across three manufacturing phases, purpose-built to meet growing market demands. The facility includes a certified Integrated Performance Test Laboratory for rigorous in-house product validation.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Boosted Production Capacity" },
              { label: "Optimised Logistics" },
              { label: "Enhanced Work Environment" },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                <p className="text-xs font-semibold text-white/80 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/contact"
          className="flex-1 bg-ec-teal hover:bg-ec-teal-light text-white font-bold text-sm rounded-2xl py-3.5 text-center transition-all active:scale-[0.98]"
        >
          Contact Us
        </Link>
        <Link
          href="/services"
          className="flex-1 bg-ec-card border border-ec-border text-ec-text font-semibold text-sm rounded-2xl py-3.5 text-center hover:border-ec-teal/30 transition-all active:scale-[0.98]"
        >
          Our Services
        </Link>
      </div>
    </main>
  );
}
