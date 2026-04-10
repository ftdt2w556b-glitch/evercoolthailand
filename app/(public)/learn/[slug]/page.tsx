import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/server";
import { breadcrumbJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const admin = createAdminClient();
  const { data } = await admin
    .from("articles")
    .select("title_en, excerpt_en")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Article Not Found" };

  return {
    title: data.title_en,
    description: data.excerpt_en,
  };
}

const CATEGORY_ICONS: Record<string, string> = {
  maintenance: "🛡️",
  "buying-guide": "🛒",
  iaq: "🌬️",
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const admin = createAdminClient();

  const { data: article } = await admin
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!article) notFound();

  const icon = CATEGORY_ICONS[article.category] ?? "📄";
  const publishedDate = new Date(article.published_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Render content: split on double newlines into paragraphs
  const paragraphs = (article.content_en as string)
    .split(/\n\n+/)
    .map((p: string) => p.trim())
    .filter(Boolean);

  return (
    <main className="page-enter px-4 pt-6 pb-10">
      {/* Back link */}
      <Link href="/learn" className="inline-flex items-center gap-1 text-xs text-ec-teal font-semibold mb-5">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Learning Hub
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{icon}</span>
          <span className="text-xs font-semibold text-ec-teal uppercase tracking-wide capitalize">
            {article.category.replace("-", " ")}
          </span>
          <span className="text-xs text-ec-text-muted">· {article.read_time_mins} min read</span>
        </div>
        <h1 className="text-xl font-bold text-ec-text leading-tight mb-2">
          {article.title_en}
        </h1>
        <p className="text-xs text-ec-text-muted">{publishedDate}</p>
      </div>

      {/* Excerpt */}
      <p className="text-sm text-ec-text-muted leading-relaxed mb-6 border-l-2 border-ec-teal pl-3">
        {article.excerpt_en}
      </p>

      {/* Content */}
      <div className="flex flex-col gap-4">
        {paragraphs.map((para: string, i: number) => (
          <p key={i} className="text-sm text-ec-text leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8 bg-ec-card rounded-2xl border border-ec-border p-5 text-center">
        <p className="text-sm font-bold text-ec-text mb-1">Need help with your AC or IAQ?</p>
        <p className="text-xs text-ec-text-muted mb-4">Get a free quote or book a service visit today.</p>
        <div className="flex flex-col gap-2">
          <Link
            href="/quote"
            className="block w-full bg-ec-teal text-white font-bold text-sm rounded-xl py-3 text-center"
          >
            Get Instant Quote
          </Link>
          <Link
            href="/book"
            className="block w-full bg-ec-card border border-ec-border text-ec-text font-semibold text-sm rounded-xl py-3 text-center"
          >
            Book a Service
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "https://evercoolthailand.com" },
              { name: "Learn", url: "https://evercoolthailand.com/learn" },
              { name: article.title_en, url: `https://evercoolthailand.com/learn/${slug}` },
            ])
          ),
        }}
      />
    </main>
  );
}
