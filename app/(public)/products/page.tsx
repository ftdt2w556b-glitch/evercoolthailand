import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ProductDashboard from "@/components/public/ProductDashboard";

export const metadata: Metadata = {
  title: "Products | TECH FREE AHU Systems",
  description:
    "Explore TECH FREE air handling units, heat pipe units, dry coolers, coils and more. ISO 9001, EN1886, AHRI certified. Distributed by EverCool Thailand.",
};

const PRODUCT_CATEGORIES = [
  {
    id: "ahu",
    label: "Air Handling Units",
    color: "bg-sky-500/10 text-sky-600 border-sky-500/20",
    dot: "bg-sky-500",
  },
  {
    id: "heat",
    label: "Heat Recovery",
    color: "bg-violet-500/10 text-violet-600 border-violet-500/20",
    dot: "bg-violet-500",
  },
  {
    id: "outdoor",
    label: "Outdoor Units",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  {
    id: "components",
    label: "Components",
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    dot: "bg-amber-500",
  },
  {
    id: "ventilation",
    label: "Ventilation",
    color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    dot: "bg-cyan-500",
  },
];

const PRODUCTS = [
  {
    id: "modular-ahu",
    name: "Modular Air Handling Unit",
    category: "ahu",
    image: "/images/products/modular-ahu-2.png",
    certifications: ["EN 1886", "AHRI 1350"],
    highlights: [
      "High-strength anodized aluminum frame",
      "Double-skin PU insulation panels",
      "Reduces structural weight by up to 40%",
      "Multiple functional sections: cooling, heating, filtration, humidification, UV sterilization",
      "Customizable for any airflow and static pressure requirement",
    ],
    desc: "Achieves high standards in quality, performance, flexibility, reliability, energy efficiency, and cleanliness. The aluminum structure provides excellent corrosion resistance and reduces overall unit weight by up to 40%, lowering structural support costs. Tested and certified to EN1886:2007 and AHRI 1350.",
  },
  {
    id: "integrated-ahu",
    name: "Integrated Multi-Functional AHU",
    category: "ahu",
    image: "/images/products/integrated-ahu.jpg",
    certifications: ["Patent ZL202022480496.0", "EN 1886", "AHRI 1350"],
    highlights: [
      "MiMEP: Mechanical, Electrical and Plumbing pre-integrated",
      "Built-in DDC intelligent control system",
      "All pipes and wiring factory-assembled",
      "RS485 / BMS integration ready",
      "Site installation: connect water and power only",
    ],
    desc: "Applies the MiMEP concept, combining power panels and water-side accessories directly onto the unit. All pipes and electrical systems are pre-assembled at the factory, enabling plug-and-play installation on site. Micro-computer DDC controller with fault self-diagnosis, scheduling, and BMS communication.",
  },
  {
    id: "hygienic-ahu",
    name: "Hygienic Air Handling Unit",
    category: "ahu",
    image: "/images/products/ahu-horizontal.png",
    certifications: ["VDI 6022"],
    highlights: [
      "All internal surfaces stainless steel with anti-corrosion treatment",
      "Smooth, flat surfaces for easy cleaning",
      "VDI 6022.1 certified for hygiene environments",
      "Ideal for hospitals, food factories, pharmaceutical plants",
      "Filter bypass leakage F9 per EN 1886",
    ],
    desc: "All internal surfaces are stainless steel with anti-corrosion treatment. Dirt and germs can be easily cleaned from the smooth, flat surfaces. Units are certified to VDI 6022.1, making them ideal for hospitals, food production, and pharmaceutical environments.",
  },
  {
    id: "mini-ahu",
    name: "Mini Air Handling Unit",
    category: "ahu",
    image: "/images/products/ahu-vertical.jpg",
    certifications: ["EN 1886"],
    highlights: [
      "Anodized aluminum casing, 30mm PU insulation",
      "Variable speed EC fan saves 20-30% energy",
      "Max 2,500 CFM / 450 Pa static pressure",
      "Slim 450mm height fits compact ceilings",
      "4-row coil: superior fresh air handling vs. FCU",
    ],
    desc: "Constructed with anodized aluminum casing and 30mm PU insulation for lighter weight and better durability. The variable speed EC fan saves up to 20-30% energy by adjusting to actual airflow demand. Suitable for malls, atriums, hospitals, and lobbies.",
  },
  {
    id: "heat-pipe-unit",
    name: "Heat Pipe Unit / Fresh Air Handler",
    category: "heat",
    image: "/images/products/heat-pipe-unit.png",
    certifications: ["AHRI 410"],
    highlights: [
      "Heat Pipe technology for energy-free moisture removal",
      "Pre-cooling and reheating without electrical energy",
      "Heat Recovery type and Dehumidification type",
      "Horizontal and vertical configurations",
      "Ideal for high-humidity tropical climates",
    ],
    desc: "Uses temperature differential and a unique tube circuit to obtain energy for moisture removal, pre-cooling, and reheating of fresh air without any additional electrical energy. Available in Heat Recovery and Dehumidification configurations, in horizontal or vertical layouts.",
  },
  {
    id: "dual-system-heat-recovery",
    name: "Dual System Heat Recovery Unit",
    category: "heat",
    image: "/images/products/dual-system-heat-recovery.jpg",
    certifications: ["EN 1886", "AHRI 1350"],
    highlights: [
      "Sub-cooling ensures precise moisture removal",
      "Sensible reheat controls relative humidity",
      "DDC software program control",
      "Energy regulating valve for precision",
      "Simultaneous or independent coil operation",
    ],
    desc: "Addresses poor dehumidification caused by high-temperature chilled water. Sub-cooling ensures moisture removal while reheat controls relative humidity. Heat recovery greatly reduces energy consumption. Software DDC control and energy regulating valves enable precise temperature and humidity management.",
  },
  {
    id: "heat-recovery-unit",
    name: "Heat Recovery Unit",
    category: "heat",
    image: "/images/products/heat-recovery-plate.png",
    certifications: ["EN 1886"],
    highlights: [
      "Plate type and rotary wheel options",
      "Recovers energy from exhaust air stream",
      "Reduces fresh air conditioning load",
      "Low maintenance design",
      "Compatible with all AHU configurations",
    ],
    desc: "Available in plate heat exchanger and rotary wheel configurations. Recovers thermal energy from exhaust air to pre-condition incoming fresh air, significantly reducing the cooling or heating load on the system and improving overall energy efficiency.",
  },
  {
    id: "packaged-unit",
    name: "Packaged Rooftop / Outdoor Unit",
    category: "outdoor",
    image: "/images/products/packaged-unit.png",
    certifications: ["AHRI 1350"],
    highlights: [
      "Industry-leading R410A scroll compressor",
      "Air-cooled: suitable where water is limited",
      "Quiet operation, minimal vibration",
      "High static pressure capability",
      "Excellent corrosion and UV resistance",
    ],
    desc: "Equipped with industry-leading R410A scroll compressor. Versatile for commercial, industrial, institutional, transportation, and specialized buildings. Air-cooled design is particularly suitable for regions where water sources are limited, such as rooftop and remote installations.",
  },
  {
    id: "dry-cooler",
    name: "Dry Cooler (TFDC)",
    category: "outdoor",
    image: "/images/products/dry-cooler.png",
    certifications: [],
    highlights: [
      "Heat rejection 15kW to 250kW per unit",
      "Water and glycol solution as cooling media",
      "Modular or single unit configurations",
      "Powder coated G.I. sheet, high UV resistance",
      "Epoxy / hot-dip / copper fins for corrosive environments",
    ],
    desc: "Uses water and glycol solution as cooling media. Heat rejection capacity from 15kW to 250kW per unit. Available in modular or single unit options. Powder-coated G.I. casing offers high corrosion and UV resistance, with optional epoxy or hot-dip coatings for harsh environments.",
  },
  {
    id: "coils",
    name: "Heat Exchange Coils",
    category: "components",
    image: "/images/products/coils.png",
    certifications: ["AHRI 410"],
    highlights: [
      "Selected per AHRI 410 standard",
      "Seamless copper tube with waved fins",
      "High thermal conductivity, low pressure drop",
      "Copper, tinned copper, or hydrophilic aluminum fins",
      "S/S frame optional for corrosive environments",
    ],
    desc: "Selected to AHRI 410 standard. Constructed with seamless copper tube mechanically bonded to waved fins, offering high thermal conductivity, low pressure drop, and less scaling. Available as water coil, condenser coil, or DX coil. Multiple fin material options for different environments.",
  },
  {
    id: "ec-fan-coil",
    name: "EC Fan Coil Unit",
    category: "components",
    image: "/images/products/ec-fan-coil.png",
    certifications: [],
    highlights: [
      "Variable speed EC motor for demand-based control",
      "Low noise operation",
      "Compact design for ceiling or floor mounting",
      "High efficiency at part load",
      "Compatible with DDC and BMS systems",
    ],
    desc: "EC (Electronically Commutated) motor technology allows variable speed operation matched to actual thermal load, reducing energy consumption significantly versus traditional fan coil units. Low noise and compact design suit a wide range of commercial and hospitality applications.",
  },
  {
    id: "fresh-air-unit",
    name: "Fresh Air Unit / Exhaust Unit",
    category: "ventilation",
    image: "/images/products/fresh-air-unit.png",
    certifications: [],
    highlights: [
      "Compact structure, simple installation",
      "Low noise, stable operation",
      "High temperature resistance",
      "Standard and Deluxe configurations",
      "Suits restaurants, hotels, hospitals, offices",
    ],
    desc: "Compact and reliable, the TFF series fresh air and exhaust units feature low noise operation and high temperature resistance. Suitable for restaurants, hotels, office buildings, theaters, commercial buildings, shopping malls, hospitals, and general factory ventilation. Available in standard and deluxe configurations.",
  },
];

const CERT_BADGES = ["ISO 9001", "EN 1886", "AHRI 1350", "AHRI 410", "VDI 6022", "BS 476"];

export default function ProductsPage() {
  return (
    <main className="pb-8">

      {/* Dashboard hero */}
      <div className="bg-gradient-to-r from-ec-navy via-slate-900 to-ec-navy px-4 md:px-8 pt-8 pb-7 border-b border-white/8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-ec-teal uppercase tracking-widest mb-2">
              Product Catalog
            </p>
            <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
              HVAC &amp; IAQ Equipment
            </h1>
            <p className="text-sm text-white/55 max-w-lg leading-relaxed">
              Browse and filter our complete range of TECH FREE and Broan products for
              commercial, medical and industrial projects across Thailand.
            </p>
          </div>
          <Link
            href="/quote?service=custom-ahu"
            className="shrink-0 hidden md:inline-flex items-center gap-1.5 text-xs font-semibold bg-ec-teal hover:bg-ec-teal-light text-white px-4 py-2.5 rounded-xl transition-colors mt-1"
          >
            Get a Quote
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Interactive dashboard (client component) */}
      <ProductDashboard />

      {/* Hero */}
      <div className="bg-ec-navy px-4 md:px-10 pt-8 pb-10">
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-ec-teal uppercase tracking-widest bg-ec-teal/10 border border-ec-teal/20 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-ec-teal inline-block" />
            TECH FREE Certified Products
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-3">
          Industrial-Grade<br />
          <span className="text-ec-teal">HVAC Equipment</span>
        </h1>
        <p className="text-sm text-white/70 leading-relaxed max-w-xl mb-5">
          EverCool Thailand distributes and installs TECH FREE air handling units, heat recovery systems, and HVAC components. All products are manufactured in a 250,000+ sqft ISO 9001 certified factory.
        </p>
        {/* Cert strip */}
        <div className="flex flex-wrap gap-2">
          {CERT_BADGES.map((cert) => (
            <span
              key={cert}
              className="text-[10px] font-semibold text-white/60 bg-white/8 border border-white/10 rounded-lg px-2.5 py-1"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>

      {/* Category filter row */}
      <div className="sticky top-[57px] z-30 bg-ec-bg border-b border-ec-border px-4 md:px-10 py-2.5 flex gap-2 overflow-x-auto scrollbar-hide">
        {PRODUCT_CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className={`shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${cat.color}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${cat.dot} inline-block`} />
            {cat.label}
          </a>
        ))}
      </div>

      {/* Products by category */}
      <div className="px-4 md:px-10 pt-6 space-y-10">
        {PRODUCT_CATEGORIES.map((cat) => {
          const catProducts = PRODUCTS.filter((p) => p.category === cat.id);
          if (catProducts.length === 0) return null;
          return (
            <section key={cat.id} id={cat.id}>
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${cat.dot}`} />
                <h2 className="text-[15px] font-bold text-ec-text">{cat.label}</h2>
                <span className="text-xs text-ec-text-muted">({catProducts.length})</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {catProducts.map((product) => (
                  <ProductCard key={product.id} product={product} catColor={cat.color} catDot={cat.dot} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mx-4 md:mx-10 mt-10 bg-ec-navy rounded-2xl p-6 text-center">
        <p className="text-xs font-semibold text-ec-teal uppercase tracking-widest mb-2">Custom Solutions</p>
        <h3 className="text-lg font-bold text-white mb-2">Need a specific configuration?</h3>
        <p className="text-sm text-white/60 mb-5 max-w-sm mx-auto">
          Our TECH FREE engineering team can design and manufacture a custom AHU to your exact specification. Contact us for a consultation.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/quote?service=custom-ahu"
            className="bg-ec-teal hover:bg-ec-teal-light text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            Get a Quote
          </Link>
          <Link
            href="/contact"
            className="bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}

function ProductCard({
  product,
  catColor,
  catDot,
}: {
  product: (typeof PRODUCTS)[0];
  catColor: string;
  catDot: string;
}) {
  return (
    <div className="bg-ec-card rounded-2xl border border-ec-border overflow-hidden flex flex-col">
      {/* Product image */}
      <div className="relative h-44 bg-slate-950 dark:bg-slate-950 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${catColor}`}>
            <span className={`w-1 h-1 rounded-full ${catDot}`} />
            {PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-ec-text mb-1">{product.name}</h3>

        {/* Certifications */}
        {product.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2.5">
            {product.certifications.map((cert) => (
              <span
                key={cert}
                className="text-[9px] font-bold text-ec-teal bg-ec-teal/8 border border-ec-teal/20 px-1.5 py-0.5 rounded-md uppercase tracking-wide"
              >
                {cert}
              </span>
            ))}
          </div>
        )}

        <p className="text-xs text-ec-text-muted leading-relaxed mb-3 flex-1">{product.desc}</p>

        {/* Highlights */}
        <ul className="space-y-1 mb-4">
          {product.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-1.5 text-[11px] text-ec-text-muted">
              <svg className="w-3 h-3 text-ec-teal mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {h}
            </li>
          ))}
        </ul>

        <Link
          href={`/quote?product=${product.id}`}
          className="block w-full text-center text-xs font-semibold text-ec-teal bg-ec-teal/8 hover:bg-ec-teal/15 border border-ec-teal/20 rounded-xl py-2.5 transition-colors"
        >
          Request Information
        </Link>
      </div>
    </div>
  );
}
