import Link from "next/link";

const PHONE = "+66 95-562-2892";
const PHONE_RAW = "66955622892";
const EMAIL = "info@evercoolthailand.com";

const LINKS = {
  services: [
    { href: "/services", label: "All Services" },
    { href: "/book?service=ac-installation", label: "AC Installation" },
    { href: "/book?service=ac-repair", label: "AC Repair" },
    { href: "/book?service=ac-maintenance", label: "AC Maintenance" },
    { href: "/book?service=air-purifier", label: "Air Purifiers" },
  ],
  company: [
    { href: "/gallery", label: "Our Work" },
    { href: "/learn", label: "Learning Hub" },
    { href: "/contact", label: "Contact" },
    { href: "/account", label: "My Account" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ec-navy border-t border-white/10 mt-auto">
      <div className="mx-auto w-full max-w-[480px] px-4 py-8">

        {/* Brand */}
        <div className="mb-6">
          <p className="text-base font-black text-white">
            Ever<span className="text-ec-teal">Cool</span> Thailand
          </p>
          <p className="text-xs text-white/50 mt-0.5">Breathing Life into Your Indoors</p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Services</p>
            <ul className="flex flex-col gap-1.5">
              {LINKS.services.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Company</p>
            <ul className="flex flex-col gap-1.5">
              {LINKS.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-white/60 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-2 mb-6">
          <a
            href={`tel:${PHONE_RAW}`}
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-ec-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {PHONE}
          </a>
          <a
            href={`https://wa.me/${PHONE_RAW}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-white/60 hover:text-[#25D366] transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.844L0 24l6.335-1.61A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.796 9.796 0 01-5.031-1.388l-.361-.214-3.736.949.983-3.627-.235-.373A9.778 9.778 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
            </svg>
            WhatsApp Chat
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5 text-ec-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {EMAIL}
          </a>
        </div>

        {/* Area tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["Bangkok", "Koh Tao", "Surat Thani"].map((area) => (
            <span key={area} className="text-[10px] font-semibold text-white/40 border border-white/10 rounded-lg px-2 py-0.5">
              {area}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-4 flex flex-col gap-1">
          <p className="text-[10px] text-white/30">© {year} Evercool Thailand Co., Ltd. All rights reserved.</p>
          <p className="text-[10px] text-white/30">Mon–Sat 08:00–18:00 · Licensed HVAC Contractor</p>
        </div>
      </div>
    </footer>
  );
}
