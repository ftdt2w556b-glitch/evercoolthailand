"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Service = {
  id: string;
  name: string;
  name_th: string | null;
  slug: string;
  category: string;
  short_description: string | null;
  is_active: boolean;
};

const CATEGORIES = ["installation", "repair", "maintenance", "purification", "custom", "distribution", "consultation"];

export default function AdminServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const isEdit = !!service;
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: service?.name ?? "",
    name_th: service?.name_th ?? "",
    slug: service?.slug ?? "",
    category: service?.category ?? "installation",
    short_description: service?.short_description ?? "",
    is_active: service?.is_active ?? true,
  });

  function autoSlug(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const url = isEdit ? `/api/admin/services/${service!.id}` : "/api/admin/services";
    const method = isEdit ? "PATCH" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setOpen(false);
    router.refresh();
  }

  if (!open && !isEdit) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs bg-ec-teal/10 text-ec-teal font-semibold rounded-xl px-3 py-2 hover:bg-ec-teal/20 transition-colors"
      >
        + Add Service
      </button>
    );
  }

  if (!open && isEdit) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-ec-teal hover:underline"
      >
        Edit
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-ec-text-muted block mb-1">Name (EN)</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm(f => ({ ...f, name: e.target.value, slug: isEdit ? f.slug : autoSlug(e.target.value) }))}
            className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2 text-sm text-ec-text focus:outline-none focus:border-ec-teal"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ec-text-muted block mb-1">Name (TH)</label>
          <input
            value={form.name_th}
            onChange={(e) => setForm(f => ({ ...f, name_th: e.target.value }))}
            className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2 text-sm text-ec-text focus:outline-none focus:border-ec-teal"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-ec-text-muted block mb-1">Slug</label>
          <input
            required
            value={form.slug}
            onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
            className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2 text-sm text-ec-text font-mono focus:outline-none focus:border-ec-teal"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ec-text-muted block mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
            className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2 text-sm text-ec-text focus:outline-none focus:border-ec-teal"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-ec-text-muted block mb-1">Short Description</label>
        <textarea
          value={form.short_description}
          onChange={(e) => setForm(f => ({ ...f, short_description: e.target.value }))}
          rows={2}
          className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2 text-sm text-ec-text focus:outline-none focus:border-ec-teal resize-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_active"
          checked={form.is_active}
          onChange={(e) => setForm(f => ({ ...f, is_active: e.target.checked }))}
          className="rounded"
        />
        <label htmlFor="is_active" className="text-xs font-semibold text-ec-text-muted">Active (visible on site)</label>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-ec-teal/10 text-ec-teal font-semibold text-xs rounded-xl px-4 py-2 hover:bg-ec-teal/20 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Service"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-ec-text-muted hover:underline">
          Cancel
        </button>
      </div>
    </form>
  );
}
