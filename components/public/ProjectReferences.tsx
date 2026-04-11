"use client";

import Link from "next/link";

const PROJECTS = [
  {
    name: "The Londoner Hotel",
    location: "London, United Kingdom",
    desc: "The TECH FREE engineering team delivered a full HVAC solution covering system design, product development, control logic, and software programming.",
    icon: (
      <svg className="w-5 h-5 text-ec-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    name: "Theme Park",
    location: "Macau",
    desc: "Holistic HVAC system design and implementation for a large-scale entertainment complex, including custom AHU units with integrated DDC control.",
    icon: (
      <svg className="w-5 h-5 text-ec-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const SECTORS = [
  "Government Buildings",
  "Hospitals",
  "Pharmaceutical",
  "Hotels",
  "Data Centres",
  "Laboratories",
  "Shopping Malls",
  "Airports",
];

const MARKETS = ["China", "Hong Kong", "Macau", "Singapore", "Japan", "USA", "Philippines", "Thailand"];

export default function ProjectReferences() {
  return (
    <section className="px-4 md:px-10 mt-8 mb-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[17px] font-bold text-ec-text">Project References</h2>
        <Link href="/about" className="text-xs font-semibold text-ec-teal hover:underline">
          About Us &rarr;
        </Link>
      </div>

      {/* Notable projects */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        {PROJECTS.map((p) => (
          <div key={p.name} className="flex-1 bg-ec-card rounded-2xl border border-ec-border p-4 flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-ec-teal/10 flex items-center justify-center shrink-0">
              {p.icon}
            </div>
            <div>
              <p className="text-sm font-bold text-ec-text leading-tight">{p.name}</p>
              <p className="text-[11px] font-semibold text-ec-teal mt-0.5">{p.location}</p>
              <p className="text-xs text-ec-text-muted mt-1.5 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sectors */}
      <div className="bg-ec-card rounded-2xl border border-ec-border p-4 mb-3">
        <p className="text-[10px] font-semibold text-ec-text-muted uppercase tracking-widest mb-2.5">Industries Served</p>
        <div className="flex flex-wrap gap-1.5">
          {SECTORS.map((s) => (
            <span key={s} className="text-[11px] font-medium text-ec-text bg-ec-bg border border-ec-border rounded-lg px-2.5 py-1">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Markets */}
      <div className="bg-ec-card rounded-2xl border border-ec-border p-4">
        <p className="text-[10px] font-semibold text-ec-text-muted uppercase tracking-widest mb-2.5">Global Markets</p>
        <div className="flex flex-wrap gap-1.5">
          {MARKETS.map((m) => (
            <span key={m} className="text-[11px] font-medium text-ec-teal bg-ec-teal/8 border border-ec-teal/20 rounded-lg px-2.5 py-1">
              {m}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-ec-text-muted mt-2.5 leading-relaxed">
          TECH FREE products are established across China, Hong Kong and Macau, with growing presence in Southeast Asia, Japan, and the USA.
        </p>
      </div>
    </section>
  );
}
