"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Article = {
  id: string;
  title_en: string;
  slug: string;
  category: string;
  read_time_mins: number;
  is_published: boolean;
};

const CATEGORIES = ["maintenance", "buying-guide", "iaq", "tips"];

export default function AdminArticleForm({ article }: { article?: Article }) {
  const router = useRouter();
  const isEdit = !!article;
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title_en: article?.title_en ?? "",
    title_th: "",
    slug: article?.slug ?? "",
    category: article?.category ?? "maintenance",
    excerpt_en: "",
    excerpt_th: "",
    content_en: "",
    content_th: "",
    read_time_mins: article?.read_time_mins ?? 3,
    is_published: article?.is_published ?? false,
  });

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const url = isEdit ? `/api/admin/articles/${article!.id}` : "/api/admin/articles";
    await fetch(url, {
      method: isEdit ? "PATCH" : "POST",
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
        + Write Article
      </button>
    );
  }

  if (!open && isEdit) {
    return (
      <button onClick={() => setOpen(true)} className="text-xs text-ec-teal hover:underline">
        Edit
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-ec-text-muted block mb-1">Title (EN)</label>
          <input
            required
            value={form.title_en}
            onChange={(e) => setForm(f => ({ ...f, title_en: e.target.value, slug: isEdit ? f.slug : autoSlug(e.target.value) }))}
            className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2 text-sm text-ec-text focus:outline-none focus:border-ec-teal"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-ec-text-muted block mb-1">Title (TH)</label>
          <input
            value={form.title_th}
            onChange={(e) => setForm(f => ({ ...f, title_th: e.target.value }))}
            className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2 text-sm text-ec-text focus:outline-none focus:border-ec-teal"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-semibold text-ec-text-muted block mb-1">Slug</label>
          <input
            required
            value={form.slug}
            onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))}
            className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2 text-xs text-ec-text font-mono focus:outline-none focus:border-ec-teal"
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
        <div>
          <label className="text-xs font-semibold text-ec-text-muted block mb-1">Read time (min)</label>
          <input
            type="number"
            min={1}
            max={60}
            value={form.read_time_mins}
            onChange={(e) => setForm(f => ({ ...f, read_time_mins: Number(e.target.value) }))}
            className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2 text-sm text-ec-text focus:outline-none focus:border-ec-teal"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-ec-text-muted block mb-1">Excerpt (EN)</label>
        <textarea
          value={form.excerpt_en}
          onChange={(e) => setForm(f => ({ ...f, excerpt_en: e.target.value }))}
          rows={2}
          className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2 text-sm text-ec-text focus:outline-none focus:border-ec-teal resize-none"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-ec-text-muted block mb-1">Content (EN) - separate paragraphs with blank lines</label>
        <textarea
          value={form.content_en}
          onChange={(e) => setForm(f => ({ ...f, content_en: e.target.value }))}
          rows={8}
          className="w-full rounded-xl border border-ec-border bg-ec-bg px-3 py-2 text-sm text-ec-text focus:outline-none focus:border-ec-teal resize-y"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="is_published"
          checked={form.is_published}
          onChange={(e) => setForm(f => ({ ...f, is_published: e.target.checked }))}
          className="rounded"
        />
        <label htmlFor="is_published" className="text-xs font-semibold text-ec-text-muted">Published (visible on site)</label>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-ec-teal/10 text-ec-teal font-semibold text-xs rounded-xl px-4 py-2 hover:bg-ec-teal/20 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : isEdit ? "Save Changes" : "Publish Article"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-ec-text-muted hover:underline">
          Cancel
        </button>
      </div>
    </form>
  );
}
