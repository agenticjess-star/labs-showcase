import Link from "next/link";
import { getProjects } from "../../../lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Variant B — dark grid gallery, after the Dribbble Personal Portfolio
// shot (27242818): dark high-contrast interface, strong grid, bold
// typography, minimal UI, focus on the visuals/work. Covers are
// typographic panels (big index + name), not fake screenshots.
// Components: shadcn Button, Badge, Input. Data: getProjects().
export default async function VariantB({ searchParams }: { searchParams?: { q?: string; f?: string } }) {
  const projects = await getProjects();
  const q = (searchParams?.q || "").toLowerCase();
  const f = searchParams?.f || "All";
  const list = projects.filter(
    (p) =>
      (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
      (f === "All" || p.status === f)
  );
  return (
    <div style={{ background: "#0b0b0f", color: "#f5f5f4", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px 80px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <Link href="/variants" style={{ fontWeight: 800, letterSpacing: "-0.02em" }}>JESSE — LABS</Link>
          <nav style={{ display: "flex", gap: 16, fontSize: 14, color: "#a1a1aa" }}>
            <Link href="/variants/a">Variant A</Link>
            <Link href="/variants/b" style={{ color: "#fff" }}>Variant B</Link>
            <Link href="/variants/c">Variant C</Link>
          </nav>
        </header>
        <h1 style={{ fontSize: "clamp(48px, 10vw, 110px)", lineHeight: 0.95, letterSpacing: "-0.04em", margin: "48px 0 8px" }}>
          Every project.<br />One grid.
        </h1>
        <p style={{ color: "#a1a1aa", maxWidth: 620, fontSize: 18, lineHeight: 1.6 }}>
          {projects.length} real projects, categorised by status. No placeholders, no invented
          demos — a project with no verified live URL links to its page and its code.
        </p>
        <form style={{ margin: "28px 0", display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Input name="q" defaultValue={searchParams?.q || ""} placeholder="Search projects…" style={{ background: "#18181b", color: "#fff", borderColor: "#27272a", height: 48, maxWidth: 420 }} />
          <Button type="submit">Search</Button>
        </form>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {["All", "Live", "Check pending"].map((cat) => (
            <Button key={cat} variant={f === cat ? "default" : "outline"} size="sm" asChild>
              <Link href={`/variants/b?f=${encodeURIComponent(cat)}`}>{cat}</Link>
            </Button>
          ))}
        </div>
        <p style={{ color: "#a1a1aa" }}>{list.length} projects in this view</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginTop: 20 }}>
          {list.map((p, i) => (
            <article key={p.slug} style={{ border: "1px solid #27272a", borderRadius: 16, overflow: "hidden", background: "#131316" }}>
              <div style={{ height: 150, background: i % 3 === 0 ? "#e4571d" : i % 3 === 1 ? "#27272a" : "#3f3f46", display: "flex", alignItems: "flex-end", padding: 16 }}>
                <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div style={{ padding: 18 }}>
                <h2 style={{ fontSize: 22, margin: "0 0 8px" }}>
                  <Link href={`/projects/${p.slug}`}>{p.name}</Link>
                </h2>
                <p style={{ color: "#a1a1aa", lineHeight: 1.55, margin: "0 0 12px" }}>{p.description}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                  <Badge variant="secondary">{p.language}</Badge>
                  <Badge variant="outline">{p.status}</Badge>
                </div>
                <div style={{ display: "flex", gap: 12, fontSize: 14 }}>
                  <Link href={`/projects/${p.slug}`} style={{ textDecoration: "underline" }}>View project</Link>
                  <a href={p.github_url} style={{ textDecoration: "underline" }}>GitHub</a>
                  {p.live_url ? <a href={p.live_url} style={{ textDecoration: "underline" }}>Live</a> : null}
                </div>
              </div>
            </article>
          ))}
        </div>
        <footer style={{ marginTop: 80, borderTop: "1px solid #27272a", paddingTop: 24, color: "#a1a1aa", fontSize: 13, lineHeight: 1.6 }}>
          <p>Ref: <a href="https://dribbble.com/shots/27242818-Personal-Portfolio-Website" style={{ color: "#fff", textDecoration: "underline" }}>Dribbble — Personal Portfolio Website</a> (dark grid gallery, bold type, minimal UI). What was taken: the dark gallery and grid, not its photography content.</p>
          <p>Components: shadcn Button, Badge, Input. Data: Supabase projects table, lib/projects.json fallback.</p>
          <p><Link href="/variants" style={{ textDecoration: "underline" }}>← All variants</Link> · <Link href="/" style={{ textDecoration: "underline" }}>Hub</Link></p>
        </footer>
      </main>
    </div>
  );
}
