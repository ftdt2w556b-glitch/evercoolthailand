"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "⬛" },
  { href: "/admin/quotes", label: "Quotes", icon: "📋" },
  { href: "/admin/bookings", label: "Bookings", icon: "📅" },
  { href: "/admin/messages", label: "Messages", icon: "💬" },
];

export default function AdminNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <nav className="bg-ec-navy border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-[900px] mx-auto px-4 flex items-center gap-4 h-14">
        {/* Brand */}
        <span className="text-sm font-bold text-white shrink-0">
          EC <span className="text-ec-teal">Admin</span>
        </span>

        {/* Nav links */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide flex-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                pathname.startsWith(item.href)
                  ? "bg-ec-teal text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* User + Sign out */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-white/50 hidden sm:block truncate max-w-[140px]">{userEmail}</span>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="text-xs text-white/60 hover:text-white border border-white/20 rounded-lg px-2.5 py-1.5 transition-colors"
          >
            {signingOut ? "..." : "Sign Out"}
          </button>
        </div>
      </div>
    </nav>
  );
}
