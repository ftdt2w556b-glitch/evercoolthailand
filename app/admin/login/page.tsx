"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Sign in failed");
        return;
      }

      router.push("/admin/quotes");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ec-bg px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ec-text">
            Evercool <span className="text-ec-teal">Admin</span>
          </h1>
          <p className="text-sm text-ec-text-muted mt-1">Sign in to manage your business</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-ec-card rounded-2xl border border-ec-border p-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-ec-text-muted block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="admin@evercoolthailand.com"
              className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2.5 text-sm text-ec-text focus:outline-none focus:border-ec-teal transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-ec-text-muted block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2.5 text-sm text-ec-text focus:outline-none focus:border-ec-teal transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ec-teal hover:bg-ec-teal-light text-white font-bold text-sm rounded-xl py-3 transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
