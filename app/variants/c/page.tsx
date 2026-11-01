import Link from "next/link";
import { getProjects } from "../../../lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Variant C — soft brutalist agency grid, after the Dribbble Outline
// Agency shot (26903633): soft brutalist structure, expressive type,
// bold project grid with large layout, minimal cinematic tone.
// Light paper, 2px black borders, huge uppercase headings, numbered rows.
// Components: shadcn Button, Badge, Input. Data: getProjects().
export default async function VariantC({ searchParams }: { searchParams?: { q?: string } }) {
  const projects = await getProjects();
  const q = (searchParams?.q || "").toLowerCase();
  const list = projects.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );
  return (
    <div style={{ background: "#f4f1ea", color: "#111", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px 80px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #111", paddingBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <Link href="/variants" style={{ fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.02em" }}>Jesse / Labs</Link>
          <nav style={{ display: "flex", gap: 16, fontWeight: 700, textTransform: "uppercase", fontSize: 13 }}>
            <Link href="/variants/a">A</Link>
            <Link href="/variants/b">B</Link>
            <Link href="/variants/c">C</Link>
          </nav>
        </header>
        <h1 style={{ fontSize: "clamp(44px, 9vw, 96px)", lineHeight: 0.95, textTransform: "uppercase", letterSpacing: "-0.02em", margin: "36px 0 12px" }}>
          Work.<br />All of it.
        </h1>
        <p style={{ maxWidth: 620, fontSize: 18, lineHeight: 1.55 }}>
          {projects.length} projects, in big rows, in order. No cards-in-cards, no gradients,
          no invented screenshots. A row either links to a verified live demo, or it says so
          by linking only to its page and code.
        </p>
        <form style={{ margin: "28px 0" }}>
          <Input name="q" defaultValue={searchParams?.q || ""} placeholder="SEARCH PROJECTS…" style={{ background: "#fff", color: "#111", border: "2px solid #111", height: 52, fontWeight: 700 }} />
        </form>
        <div style={{ borderTop: "2px solid #111" }}>
          {list.map((p, i) => (
            <article key={p.slug} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 16, borderBottom: "2px solid #111", padding: "22px 0" }}>
              <span style={{ fontSize: 28, fontWeight: 900 }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 style={{ fontSize: 30, textTransform: "uppercase", letterSpacing: "-0.01em", margin: "0 0 6px" }}>
                  <Link href={`/projects/${p.slug}`}>{p.name}</Link>
                </h2>
                <p style={{ lineHeight: 1.55, margin: "0 0 10px", maxWidth: 720 }}>{p.description}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  <Badge variant="outline" style={{ borderColor: "#111", color: "#111" }}>{p.language}</Badge>
                  <Badge variant="outline" style={{ borderColor: "#111", color: "#111" }}>{p.status}</Badge>
                </div>
                <div style={{ display: "flex", gap: 14, fontWeight: 700, textTransform: "uppercase", fontSize: 13 }}>
                  <Link href={`/projects/${p.slug}`} style={{ textDecoration: "underline" }}>Project page →</Link>
                  <a href={p.github_url} style={{ textDecoration: "underline" }}>GitHub →</a>
                  {p.live_url ? <a href={p.live_url} style={{ textDecoration: "underline" }}>Live →</a> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p style={{ marginTop: 20, fontWeight: 700 }}>{list.length} rows, all filled in.</p>
        <section style={{ marginTop: 64, border: "2px solid #111", padding: 24, background: "#111", color: "#f4f1ea" }}>
          <h2 style={{ fontSize: 28, textTransform: "uppercase", margin: "0 0 8px" }}>Pick one.</h2>
          <p style={{ lineHeight: 1.55 }}>Say A, B or C and that variant becomes the hub. Until then, all three live side by side.</p>
          <div style={{ marginTop: 16 }}>
            <Button asChild><Link href="/variants">Back to variants</Link></Button>
          </div>
        </section>
        <footer style={{ marginTop: 64, borderTop: "2px solid #111", paddingTop: 20, fontSize: 13, lineHeight: 1.6 }}>
          <p>Ref: <a href="https://dribbble.com/shots/26903633-Landing-Page-Outline-Agency-Portfolio-Website" style={{ textDecoration: "underline" }}>Dribbble — Outline Agency Portfolio Website</a>. What was taken: soft brutalist structure, bold project grid, large type — not its agency content.</p>
          <p>Components: shadcn Button, Badge, Input. Data: Supabase projects table, lib/projects.json fallback.</p>
          <p><Link href="/variants" style={{ textDecoration: "underline" }}>← All variants</Link> · <Link href="/" style={{ textDecoration: "underline" }}>Hub</Link></p>
        </footer>
      </main>
    </div>
  );
}
