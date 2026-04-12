"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Tab data ───────────────────────────────────────────── */
const TABS = [
  { id: "frame", label: "Frame & Insulation" },
  { id: "fans",  label: "Fans & Motors" },
  { id: "control", label: "Smart Control" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ─── FAQ data ───────────────────────────────────────────── */
const FAQS = [
  {
    q: "What are the primary IAQ parameters monitored in Thailand?",
    a: "The key parameters aligned with Thai EGAT/DEDE and ASHRAE 62.1 guidelines are: CO2 concentration (target below 1,000 ppm), PM2.5 (below 25 µg/m³ indoors), relative humidity (40-65% RH), supply air temperature, TVOC, and formaldehyde. Hospitals and pharmaceutical plants additionally monitor differential pressure between zones and total particle counts.",
  },
  {
    q: "How frequently should HEPA filters be replaced?",
    a: "In typical commercial environments, HEPA H13 filters should be replaced every 6-9 months. Pre-filters (G4/F7 class) should be inspected monthly and replaced every 3 months. In medical or pharmaceutical applications, replacement intervals should be determined by differential pressure readings across the filter bank rather than by calendar alone. Units with DDC control can trigger filter replacement alarms automatically.",
  },
  {
    q: "What warranty coverage applies to TECH FREE AHU units?",
    a: "Mechanical casing components carry a 12-month warranty. EC motors are covered by a 5-year manufacturer warranty against defects in material and workmanship. DDC controllers and electronic assemblies carry a 2-year warranty. Coils and heat exchangers are warranted for 12 months. Extended service contracts covering preventive maintenance are available through EverCool Thailand.",
  },
  {
    q: "Can TECH FREE AHUs integrate with an existing building BMS?",
    a: "Yes. The onboard DDC controller supports RS485 (Modbus RTU), BACnet MS/TP, and 0-10 V analogue interfaces as standard. Integration points include supply and return air temperature and humidity, fan speed feedback and command, filter differential pressure, valve position, and fault status. EverCool provides a full BACnet or Modbus point list at commissioning.",
  },
  {
    q: "What is the manufacturing lead time for a custom AHU?",
    a: "Standard modular configurations with no special materials typically ship in 6-8 weeks ex-works from the TECH FREE factory. Units requiring stainless steel casing, special coatings, non-standard coil circuits, or VDI 6022 hygienic specification require 10-14 weeks. EverCool Thailand handles customs clearance, local delivery, and commissioning as part of the distribution agreement.",
  },
  {
    q: "What is the energy efficiency difference between EC and AC fan motors?",
    a: "EC (Electronically Commutated) motors with permanent magnet rotors typically deliver 20-30% energy savings versus conventional AC induction motors at rated speed, and up to 50% savings at partial load conditions common in tropical climates with variable occupancy. EC motors also operate at lower temperatures, reducing bearing wear and extending service life. All EC motors supplied by TECH FREE carry ErP 2015 compliance documentation.",
  },
  {
    q: "Is VDI 6022 certification required for Thai hospital projects?",
    a: "VDI 6022 is a German hygienic standard increasingly specified by Thai private hospital groups, international hotel operators, and pharmaceutical GMP facilities as part of their internal quality frameworks. While not yet mandated by Thai law, many tender specifications for hospitals, cleanrooms, and food processing facilities now explicitly require VDI 6022 Part 1 compliance for AHU units. TECH FREE Hygienic AHUs carry full VDI 6022.1 certification.",
  },
];

/* ─── Shared sub-components ──────────────────────────────── */

function SpecRow({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-ec-border last:border-0">
      <span className="text-xs text-ec-text-muted w-44 shrink-0">{label}</span>
      <div className="text-right">
        <span className="text-xs font-semibold text-ec-text">{value}</span>
        {note && <p className="text-[10px] text-ec-text-muted mt-0.5">{note}</p>}
      </div>
    </div>
  );
}

function FeatureChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-ec-card border border-ec-border rounded-xl px-3 py-2.5">
      <span className="text-ec-teal shrink-0">{icon}</span>
      <span className="text-xs font-medium text-ec-text">{label}</span>
    </div>
  );
}

function CertBadge({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-bold text-ec-teal bg-ec-teal/8 border border-ec-teal/20 px-2 py-1 rounded-lg uppercase tracking-wide">
      {label}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold text-ec-teal uppercase tracking-widest mb-3">
      {children}
    </p>
  );
}

/* ─── Tab panels ─────────────────────────────────────────── */

function FrameTab() {
  return (
    <div className="space-y-8">
      {/* Factory photo */}
      <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/images/solutions/solutions-sf-img-10.jpg"
          alt="TECH FREE AHU manufacturing facility"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-0.5">TECH FREE</p>
          <p className="text-sm font-bold text-white">Manufacturing &amp; Assembly Facility</p>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-gradient-to-br from-ec-navy to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-ec-teal/15 border border-ec-teal/25 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-ec-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold mb-1">Anti-Cold Bridge Aluminum Frame</h3>
            <p className="text-sm text-white/60 leading-relaxed max-w-lg">
              Anodized 6063-T5 aluminum alloy profiles with integrated thermal breaks eliminate
              cold spots and condensation risk. Double-skin PU panels achieve EN 1886 Leakage
              Class L2/L3 and Thermal Bridging Class TB2.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Spec table */}
        <div>
          <SectionLabel>Panel Specifications</SectionLabel>
          <div className="bg-ec-card border border-ec-border rounded-2xl px-4 py-1">
            <SpecRow label="Casing Leakage Class" value="L2 / L3" note="EN 1886:2007" />
            <SpecRow label="Thermal Bridging Class" value="TB2" note="EN 1886:2007" />
            <SpecRow label="Insulation Thickness" value="30 mm standard" note="50 mm available" />
            <SpecRow label="Insulation Material" value="Rigid CFC-free PU foam" note="High density, closed cell" />
            <SpecRow label="Outer Skin" value="0.6 mm pre-painted GI steel" />
            <SpecRow label="Inner Liner" value="0.5 mm galvanized or stainless" />
            <SpecRow label="Frame Profile" value="Anodized 6063-T5 aluminum" />
            <SpecRow label="Max Static Pressure" value="±2,500 Pa" />
            <SpecRow label="Weight vs. Steel Frame" value="Up to 40% lighter" />
          </div>
        </div>

        {/* Feature chips + certs */}
        <div className="space-y-6">
          <div>
            <SectionLabel>Key Construction Features</SectionLabel>
            <div className="grid grid-cols-1 gap-2">
              <FeatureChip
                icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>}
                label="Thermally broken corner profiles"
              />
              <FeatureChip
                icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>}
                label="EPDM gaskets on all panel joints"
              />
              <FeatureChip
                icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                label="Smooth inner surfaces: no ledges or pockets"
              />
              <FeatureChip
                icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>}
                label="Modular panel system for on-site assembly"
              />
              <FeatureChip
                icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>}
                label="Stainless steel internals for hygienic spec"
              />
            </div>
          </div>

          <div>
            <SectionLabel>Certifications</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {["EN 1886:2007", "AHRI 1350", "VDI 6022", "ISO 9001"].map((c) => (
                <CertBadge key={c} label={c} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FansTab() {
  return (
    <div className="space-y-8">
      {/* Performance lab photo */}
      <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/images/solutions/solutions-img-03.jpg"
          alt="TECH FREE fan performance testing laboratory"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-0.5">TECH FREE</p>
          <p className="text-sm font-bold text-white">Integrated Performance Testing Laboratory</p>
        </div>
      </div>

      {/* EC vs AC comparison */}
      <div>
        <SectionLabel>Motor Technology Comparison</SectionLabel>
        <div className="grid md:grid-cols-2 gap-4">
          {/* EC */}
          <div className="bg-ec-card border-2 border-ec-teal/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black text-white bg-ec-teal px-2 py-0.5 rounded-full uppercase tracking-wide">
                Recommended
              </span>
              <h4 className="text-sm font-bold text-ec-text">EC Fan Motor</h4>
            </div>
            <p className="text-xs text-ec-text-muted leading-relaxed mb-4">
              Electronically Commutated motors with permanent magnet rotor. Variable speed
              via 0-10 V or RS485. ErP 2015 compliant.
            </p>
            <div className="space-y-2">
              {[
                "20-30% energy savings at rated speed",
                "Up to 50% savings at partial load",
                "Speed range: 10-100% continuously variable",
                "Operates at lower temperature, extending bearing life",
                "Low EMI emissions, Class F insulation",
                "5-year manufacturer warranty",
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-2 text-xs text-ec-text-muted">
                  <span className="w-1 h-1 rounded-full bg-ec-teal mt-1.5 shrink-0" />
                  {pt}
                </div>
              ))}
            </div>
          </div>

          {/* AC */}
          <div className="bg-ec-card border border-ec-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <h4 className="text-sm font-bold text-ec-text">AC Direct Fan Motor</h4>
            </div>
            <p className="text-xs text-ec-text-muted leading-relaxed mb-4">
              Conventional induction motor with direct drive or belt drive. Suitable for
              budget-constrained projects or simple on/off sequences.
            </p>
            <div className="space-y-2">
              {[
                "Fixed or multi-speed (2 or 3 step) operation",
                "Lower initial capital cost",
                "Star-delta or DOL starting",
                "Belt drive available for large airflow units",
                "Class F insulation, IP54 minimum",
                "Standard 12-month warranty",
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-2 text-xs text-ec-text-muted">
                  <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                  {pt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specs table */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <SectionLabel>Fan Performance Specifications</SectionLabel>
          <div className="bg-ec-card border border-ec-border rounded-2xl px-4 py-1">
            <SpecRow label="Fan Type" value="Backward-curved centrifugal" note="Plug fan / direct drive" />
            <SpecRow label="Airflow Range" value="500 to 150,000+ CFM" />
            <SpecRow label="Max Static Pressure (EC)" value="1,200 Pa" />
            <SpecRow label="Max Static Pressure (AC)" value="800 Pa" />
            <SpecRow label="Motor IP Rating" value="IP54 (IP55 available)" />
            <SpecRow label="Motor Insulation Class" value="Class F" />
            <SpecRow label="Speed Control" value="0-10 V DC or RS485 digital" />
            <SpecRow label="Efficiency Standard" value="ErP 2015 compliant" />
            <SpecRow label="EC Motor Warranty" value="5 years" />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <SectionLabel>Available Fan Configurations</SectionLabel>
            <div className="grid grid-cols-1 gap-2">
              {[
                { icon: "◎", label: "Plug fan: open impeller, large AHUs" },
                { icon: "◉", label: "Direct drive EC: compact units, low maintenance" },
                { icon: "⊙", label: "Belt drive AC: high airflow, vibration isolated" },
                { icon: "◈", label: "Twin-fan arrangement: N+1 redundancy option" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3 bg-ec-card border border-ec-border rounded-xl px-3 py-2.5">
                  <span className="text-ec-teal font-mono text-sm shrink-0">{icon}</span>
                  <span className="text-xs font-medium text-ec-text">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Warranty Summary</SectionLabel>
            <div className="bg-amber-400/8 border border-amber-400/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span className="text-xs font-bold text-amber-400">5-Year EC Motor Warranty</span>
              </div>
              <p className="text-xs text-ec-text-muted leading-relaxed">
                All EC motors supplied by TECH FREE carry a 5-year warranty covering defects
                in material and workmanship. Standard AC motors and mechanical components are
                covered for 12 months.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlTab() {
  const protocols = ["RS485", "Modbus RTU", "BACnet MS/TP", "0-10 V DC", "LON (optional)"];
  const bmsPartners = ["Siemens DESIGO", "Honeywell EBI", "Schneider EcoStruxure", "Johnson Controls", "Generic BACnet IP"];

  return (
    <div className="space-y-8">
      {/* Intro card */}
      <div className="bg-gradient-to-br from-ec-navy to-slate-900 rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-ec-teal/15 border border-ec-teal/25 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-ec-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold mb-1">DDC Intelligent Control System</h3>
            <p className="text-sm text-white/60 leading-relaxed max-w-lg">
              Microprocessor-based Direct Digital Control with 7-inch colour touchscreen, full
              BMS integration via open protocols, and mobile app monitoring for PM2.5 and CO2
              in real time.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Specs */}
        <div>
          <SectionLabel>Controller Specifications</SectionLabel>
          <div className="bg-ec-card border border-ec-border rounded-2xl px-4 py-1">
            <SpecRow label="Controller Type" value="DDC microprocessor" note="Self-diagnosing, fault logging" />
            <SpecRow label="Display" value="7-inch colour touchscreen" note="Optional" />
            <SpecRow label="Communication" value="RS485, Modbus, BACnet" />
            <SpecRow label="Analogue I/O" value="0-10 V DC in/out" note="Valve and fan control" />
            <SpecRow label="Sensors (onboard)" value="Temp, RH, CO2, PM2.5" note="Configurable" />
            <SpecRow label="Scheduler" value="7-day + holiday mode" />
            <SpecRow label="Data Logging" value="On-board + cloud sync" />
            <SpecRow label="Mobile App" value="iOS and Android" note="PM2.5, CO2, temp monitoring" />
            <SpecRow label="Controller Warranty" value="2 years" />
          </div>
        </div>

        <div className="space-y-6">
          {/* Control sequences */}
          <div>
            <SectionLabel>Standard Control Sequences</SectionLabel>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Supply air temp control",
                "Chilled water valve modulation",
                "EC fan speed control",
                "Filter DP alarm",
                "Dehumidification sequence",
                "Heat recovery bypass",
                "Frost protection",
                "Economiser mode",
                "CO2 demand control",
                "PM2.5 alert thresholds",
                "Fault self-diagnosis",
                "Holiday override",
              ].map((seq) => (
                <div key={seq} className="flex items-center gap-1.5 text-[11px] text-ec-text-muted">
                  <span className="w-1 h-1 rounded-full bg-ec-teal shrink-0" />
                  {seq}
                </div>
              ))}
            </div>
          </div>

          {/* Protocols */}
          <div>
            <SectionLabel>Communication Protocols</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {protocols.map((p) => (
                <span key={p} className="text-[10px] font-bold text-violet-400 bg-violet-400/8 border border-violet-400/20 px-2 py-1 rounded-lg">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* BMS partners */}
          <div>
            <SectionLabel>Compatible BMS Platforms</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {bmsPartners.map((b) => (
                <span key={b} className="text-[10px] font-semibold text-ec-text-muted bg-ec-card border border-ec-border px-2 py-1 rounded-lg">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ Accordion ──────────────────────────────────────── */
function AccordionItem({
  faq,
  open,
  onToggle,
}: {
  faq: { q: string; a: string };
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border-b border-ec-border transition-colors ${open ? "" : "hover:bg-ec-card/40"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-4 text-left"
      >
        <span className={`text-sm font-semibold leading-snug transition-colors ${open ? "text-ec-teal" : "text-ec-text"}`}>
          {faq.q}
        </span>
        <span className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all mt-0.5 ${
          open
            ? "border-ec-teal bg-ec-teal/10 text-ec-teal rotate-45"
            : "border-ec-border text-ec-text-muted"
        }`}>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {open && (
        <p className="text-sm text-ec-text-muted leading-relaxed pb-4 pr-10">
          {faq.a}
        </p>
      )}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function SolutionsDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("frame");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* ── SECTION 1: Hero header ─────────────────────────── */}
      <div className="bg-gradient-to-r from-ec-navy via-slate-900 to-ec-navy px-4 md:px-10 pt-10 pb-8 border-b border-white/8">
        <p className="text-[10px] font-bold text-ec-teal uppercase tracking-widest mb-3">
          TECH FREE Authorised Distributor · Thailand
        </p>
        <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
          Ever Cool Air Conditioning Thailand offers a variety of solutions to fit your custom needs.
        </h1>
        <p className="text-sm text-white/55 max-w-xl leading-relaxed mb-7">
          Custom air handling units, IAQ systems, and integrated HVAC solutions for hospitals, pharmaceutical facilities, data centres, hotels, and commercial buildings across Thailand.
        </p>

        {/* Key stats */}
        <div className="flex flex-wrap gap-4">
          {[
            { value: "7+", label: "Certifications" },
            { value: "5 yr", label: "EC Motor Warranty" },
            { value: "±2,500 Pa", label: "Max Static Pressure" },
            { value: "L2/L3", label: "EN 1886 Leakage Class" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-center min-w-[90px]">
              <div className="text-base font-black text-white">{stat.value}</div>
              <div className="text-[10px] text-white/50 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: Product Hero ────────────────────────── */}
      <div className="px-4 md:px-10 py-12 bg-ec-bg border-b border-ec-border">
        <p className="text-[10px] font-bold text-ec-teal uppercase tracking-widest mb-3">
          Featured Solution
        </p>
        <h2 className="text-xl md:text-2xl font-black text-ec-text mb-8">
          The TECH FREE Integrated Multi-Functional Air Handling Unit
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Left: image grid */}
          <div className="md:flex-1 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white">
              <Image
                src="/images/products/integrated-ahu.jpg"
                alt="TECH FREE Integrated AHU"
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-slate-950">
              <Image
                src="/images/products/modular-ahu-2.png"
                alt="TECH FREE Modular AHU"
                fill
                className="object-contain rounded-2xl"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>

          {/* Right: details */}
          <div className="md:flex-1 space-y-4">
            {/* Patent badge */}
            <span className="inline-block text-[10px] font-bold text-ec-teal bg-ec-teal/8 border border-ec-teal/20 px-2.5 py-1 rounded-lg uppercase tracking-wide">
              Patent No. ZL202022480496.0
            </span>

            <p className="text-sm text-ec-text-muted leading-relaxed">
              A versatile solution tailored to your indoor environment needs. This unit features customizable functional sections including cooling, heating, filtration, heat pipe, heat recovery, humidification, and UV sterilization. All pipes and electrical systems are pre-assembled at the factory. On-site installation requires only connecting water pipes and power supply.
            </p>

            <p className="text-sm text-ec-text-muted leading-relaxed">
              Designed for energy efficiency, minimal noise, robust static pressure, precision control, low vibration, exceptional corrosion resistance, and secure sealing. Suitable for outdoor installation.
            </p>

            {/* Applications */}
            <div>
              <p className="text-[10px] font-bold text-ec-teal uppercase tracking-widest mb-2">
                Applications
              </p>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                {[
                  "Hospitals",
                  "Pharmaceutical Facilities",
                  "Hotels",
                  "Data Centres",
                  "Shopping Malls",
                  "Laboratories",
                  "Office Complexes",
                  "Transportation Hubs",
                  "Exhibition Centres",
                  "Airports",
                  "Cleanrooms",
                  "Railway Infrastructure",
                ].map((app) => (
                  <span
                    key={app}
                    className="text-[10px] font-semibold text-ec-text-muted bg-ec-card border border-ec-border px-2 py-1 rounded-lg"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 3: 8 Components Grid ──────────────────── */}
      <div className="-mx-4 md:-mx-10 bg-ec-card border-y border-ec-border px-4 md:px-10 py-12">
        <p className="text-[10px] font-bold text-ec-teal uppercase tracking-widest mb-3">
          Unit Components
        </p>
        <h2 className="text-xl md:text-2xl font-black text-ec-text mb-2">
          The Main Components of the Unit
        </h2>
        <p className="text-sm text-ec-text-muted max-w-2xl leading-relaxed">
          Every TECH FREE AHU is built from precision-engineered subsystems, each independently certified to international standards.
        </p>

        {/* Main components image */}
        <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden mt-8 bg-white shadow-lg">
          <Image
            src="/images/products/integrated-ahu.jpg"
            alt="TECH FREE Integrated AHU - main components overview"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* 1. Frame */}
          <div className="bg-ec-bg border border-ec-border rounded-2xl p-5 border-l-4 border-l-sky-500">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-sky-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
              <span className="text-sm font-bold text-ec-text">High-Strength Aluminum Frame</span>
            </div>
            <p className="text-xs text-ec-text-muted leading-relaxed my-2">
              Featuring an anti-cold bridge structure with thermally broken corner profiles, this frame meets TB1 Class standards. Anodized 6063-T5 aluminum alloy profiles eliminate cold spots and condensation risk.
            </p>
            <div className="flex flex-wrap gap-1">
              {["TB1 Class", "Anti-Cold Bridge", "6063-T5 Alloy"].map((tag) => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-wide text-ec-text-muted bg-ec-card border border-ec-border px-1.5 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 2. EC Fan */}
          <div className="bg-ec-bg border border-ec-border rounded-2xl p-5 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M18.364 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
              <span className="text-sm font-bold text-ec-text">High Efficiency EC Fan</span>
            </div>
            <p className="text-xs text-ec-text-muted leading-relaxed my-2">
              High-efficiency, durable EC fans ensure low vibration, minimal noise, and energy-conscious operation delivering 20-30% savings at rated speed and up to 50% at partial load. Options include belt drive and AC direct fans.
            </p>
            <div className="flex flex-wrap gap-1">
              {["20-30% Energy Saving", "ErP 2015", "5-Year Warranty"].map((tag) => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-wide text-ec-text-muted bg-ec-card border border-ec-border px-1.5 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 3. Insulation Panel */}
          <div className="bg-ec-bg border border-ec-border rounded-2xl p-5 border-l-4 border-l-violet-500">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-violet-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-sm font-bold text-ec-text">Double-Layer Insulation Panel</span>
            </div>
            <p className="text-xs text-ec-text-muted leading-relaxed my-2">
              Superior heat insulation, acoustic insulation, and vibration reduction. Design and structure comply with EN1886 and AHRI 1350. Mechanical strength, casing air leakage rate, and thermal insulation adhere to the highest industry standards.
            </p>
            <div className="flex flex-wrap gap-1">
              {["EN 1886", "AHRI 1350", "30mm / 50mm PU"].map((tag) => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-wide text-ec-text-muted bg-ec-card border border-ec-border px-1.5 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 4. DDC Control */}
          <div className="bg-ec-bg border border-ec-border rounded-2xl p-5 border-l-4 border-l-amber-500">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-bold text-ec-text">DDC Intelligent Control System</span>
            </div>
            <p className="text-xs text-ec-text-muted leading-relaxed my-2">
              Micro-computer controller with backlit display for precise temperature and humidity control. Includes fault self-diagnosis, scheduling, automatic monitoring, and RS485 communication interface compatible with BMS.
            </p>
            <div className="flex flex-wrap gap-1">
              {["RS485", "BACnet", "7-Day Scheduler"].map((tag) => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-wide text-ec-text-muted bg-ec-card border border-ec-border px-1.5 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Heat Exchanger */}
          <div className="bg-ec-bg border border-ec-border rounded-2xl p-5 border-l-4 border-l-cyan-500">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-bold text-ec-text">High-Efficiency Heat Exchanger</span>
            </div>
            <p className="text-xs text-ec-text-muted leading-relaxed my-2">
              Selection of materials including hydrophilic aluminum fins, copper fins, tinned copper fins, and high corrosion-resistant aluminum fins. Ensures prolonged service life and optimal heat exchange efficiency.
            </p>
            <div className="flex flex-wrap gap-1">
              {["Multiple Fin Options", "High Corrosion Resistance", "AHRI 410"].map((tag) => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-wide text-ec-text-muted bg-ec-card border border-ec-border px-1.5 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 6. Filter */}
          <div className="bg-ec-bg border border-ec-border rounded-2xl p-5 border-l-4 border-l-rose-500">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              <span className="text-sm font-bold text-ec-text">Filter Section</span>
            </div>
            <p className="text-xs text-ec-text-muted leading-relaxed my-2">
              Ideal for environments with strict cleanliness requirements. Filtration level tailored to on-site conditions and client specification. Filter bypass leakage rate achieves the highest level F9 per EN1886 standards.
            </p>
            <div className="flex flex-wrap gap-1">
              {["F9 Class", "EN 1886", "Custom Filtration"].map((tag) => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-wide text-ec-text-muted bg-ec-card border border-ec-border px-1.5 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 7. Integrated Piping */}
          <div className="bg-ec-bg border border-ec-border rounded-2xl p-5 border-l-4 border-l-orange-500">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
              <span className="text-sm font-bold text-ec-text">Integrated Piping System</span>
            </div>
            <p className="text-xs text-ec-text-muted leading-relaxed my-2">
              All pipes and valves are pre-welded and assembled at the factory. On-site installation requires only connecting local water pipes and power supply. Significantly reduces labour costs and installation time.
            </p>
            <div className="flex flex-wrap gap-1">
              {["Factory Pre-assembled", "Plug and Play", "Reduced Labour"].map((tag) => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-wide text-ec-text-muted bg-ec-card border border-ec-border px-1.5 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 8. Drain Pan */}
          <div className="bg-ec-bg border border-ec-border rounded-2xl p-5 border-l-4 border-l-teal-500">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 9 2 14a10 10 0 0020 0c0-5-4.477-12-10-12z" />
              </svg>
              <span className="text-sm font-bold text-ec-text">Condensate Drain Pan</span>
            </div>
            <p className="text-xs text-ec-text-muted leading-relaxed my-2">
              Uniquely designed dry-type condensate drain pan and bottom foaming drain pan, granted a national patent certificate. Ensures effective drainage during operation, mitigating water retention. Adheres to the highest cleanliness and hygiene standards.
            </p>
            <div className="flex flex-wrap gap-1">
              {["National Patent", "VDI 6022", "Zero Retention"].map((tag) => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-wide text-ec-text-muted bg-ec-card border border-ec-border px-1.5 py-0.5 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 4: HVAC Solutions callout ─────────────── */}
      <div className="px-4 md:px-10 py-10">
        <div className="bg-gradient-to-r from-ec-navy via-slate-900 to-ec-navy rounded-2xl p-8 text-white text-center max-w-3xl mx-auto">
          <p className="text-[10px] font-bold text-ec-teal uppercase tracking-widest mb-2">
            One Stop Service
          </p>
          <h2 className="text-2xl font-black text-white">
            We Provide HVAC Solutions
          </h2>
          <p className="text-sm text-white/60 mt-2 mb-6 max-w-xl mx-auto">
            Custom installations from design through commissioning. Stable, reliable systems backed by over 25 years of HVAC engineering expertise.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="text-xs font-semibold text-ec-teal bg-ec-teal/10 border border-ec-teal/20 px-3 py-1.5 rounded-full">
              Custom Installations
            </span>
            <span className="text-xs font-semibold text-ec-teal bg-ec-teal/10 border border-ec-teal/20 px-3 py-1.5 rounded-full">
              Full Project Management
            </span>
          </div>
          <Link
            href="/quote"
            className="bg-ec-teal text-white font-bold rounded-xl px-6 py-3 mt-6 inline-block hover:bg-ec-teal-light transition-colors"
          >
            Get a Solution Quote
          </Link>
        </div>
      </div>

      {/* Sticky tab bar */}
      <div className="sticky top-[49px] z-20 bg-ec-bg border-b border-ec-border px-4 md:px-10">
        <div className="flex gap-0 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-5 py-3.5 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-ec-teal text-ec-teal"
                  : "border-transparent text-ec-text-muted hover:text-ec-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4 md:px-10 py-8">
        {activeTab === "frame" && <FrameTab />}
        {activeTab === "fans" && <FansTab />}
        {activeTab === "control" && <ControlTab />}
      </div>

      {/* CTA strip */}
      <div className="mx-4 md:mx-10 mb-8 bg-ec-card border border-ec-border rounded-2xl px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-ec-text mb-0.5">Ready to specify a unit?</p>
          <p className="text-xs text-ec-text-muted">Our engineers will size, select and submit a full submittal package.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link
            href="/quote?service=custom-ahu"
            className="text-xs font-semibold bg-ec-teal hover:bg-ec-teal-light text-white px-4 py-2.5 rounded-xl transition-colors"
          >
            Request a Quote
          </Link>
          <Link
            href="/contact"
            className="text-xs font-semibold bg-ec-card hover:bg-ec-border border border-ec-border text-ec-text px-4 py-2.5 rounded-xl transition-colors"
          >
            Talk to an Engineer
          </Link>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="px-4 md:px-10 pb-10">
        <p className="text-[10px] font-bold text-ec-teal uppercase tracking-widest mb-1">FAQ</p>
        <h2 className="text-xl font-black text-ec-text mb-6">Technical Questions</h2>
        <div className="max-w-3xl">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              open={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
