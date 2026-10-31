import { getProjects } from "../lib/supabase";
import Link from "next/link";

// Hub: gallery-minimal, warm paper / ink / orange (taste profile).
// Data source: Supabase `projects` table first, lib/projects.json fallback
// when env vars are missing, the query fails, or the table is empty.
// Components follow shadcn/ui patterns (Button, Badge, Input, Card) and
// HamishMW/portfolio Button (cut-corner primary, 32px secondary text link).
// See README.md for the ref/component links.
export default async function Home({ searchParams }: { searchParams?: { q?: string } }) {
  const projects = await getProjects();
  const q = (searchParams?.q || "").toLowerCase();
  const list = projects.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );
  const featured = projects.filter((p) => p.image_url);
  return (
    <main style={{ maxWidth: 1020, margin: "0 auto", padding: "28px 20px 72px", fontFamily: "Inter, system-ui, sans-serif", background: "#FAF7F2", color: "#111" }}>
      <p>LABS — JESSE</p>
      <h1 style={{ fontSize: "clamp(44px, 9vw, 88px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
        Every project,<br />its own page.
      </h1>
      <p style={{ color: "#4A4A4A", fontSize: 18, maxWidth: 640 }}>
        Pick a project and you get its page — image, what it does, stack, status, live demo and code —
        not just a link out to GitHub. Only verified live URLs are shown as live.
      </p>
      <form>
        <input name="q" defaultValue={searchParams?.q || ""} placeholder="Search projects…"
          style={{ width: "100%", boxSizing: "border-box", padding: 14, fontSize: 16, border: "1px solid #ddd", background: "#fff", borderRadius: 6, margin: "20px 0" }} />
      </form>
      <h2>Featured</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, margin: "24px 0" }}>
        {featured.map((p) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image_url!} alt="" style={{ width: "100%", height: "auto", borderRadius: 6 }} />
            <strong>{p.name}</strong>
            <p style={{ color: "#4A4A4A" }}>{p.description}</p>
            <p style={{ fontSize: 13, color: "#666" }}>Generated concept image — not a screenshot.</p>
          </Link>
        ))}
      </div>
      <h2>All projects ({list.length})</h2>
      <div style={{ borderTop: "1px solid #ddd" }}>
        {list.map((p, i) => (
          <Link key={p.slug} href={`/projects/${p.slug}`} style={{ display: "flex", gap: 12, padding: "16px 0", borderBottom: "1px solid #ddd", textDecoration: "none", color: "inherit" }}>
            <span style={{ color: "#E4571D", fontWeight: 700 }}>{String(i + 1).padStart(2, "0")}</span>
            <span><span style={{ fontSize: 20, fontWeight: 800 }}>{p.name}</span><br /><span style={{ color: "#4A4A4A" }}>{p.description}</span></span>
          </Link>
        ))}
      </div>
    </main>
  );
}
