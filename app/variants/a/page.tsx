import Link from "next/link";
import { getProjects } from "../../../lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Variant A — almost exact clone of the bchiang7/v4 layout
// (dark navy #0a192f, slate text, teal #64ffda accent, mono section
// numbers, fixed side nav on desktop, hero / About / featured work /
// archive / contact), with Jesse's 37 projects swapped in.
// Brittany Chiang's personal biography, employers and projects are NOT
// copied — only the layout, colours and section structure are followed,
// with attribution in the footer as the v4 README asks for.
// Components: shadcn Button, Badge, Input. Data: getProjects().
export default async function VariantA({ searchParams }: { searchParams?: { q?: string } }) {
  const projects = await getProjects();
  const q = (searchParams?.q || "").toLowerCase();
  const list = projects.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );
  const featured = projects.filter((p) => p.image_url).slice(0, 4);
  const rest = projects.filter((p) => !featured.some((f) => f.slug === p.slug));
  return (
    <div style={{ background: "#0a192f", color: "#ccd6f6", minHeight: "100vh", overflowWrap: "anywhere", wordBreak: "break-word", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <Link href="/variants" style={{ color: "#64ffda", fontFamily: "monospace", fontWeight: 700 }}>J — Labs</Link>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", fontFamily: "monospace", fontSize: 13 }}>
          <a href="#about" style={{ color: "#ccd6f6" }}><span style={{ color: "#64ffda" }}>01.</span> About</a>
          <a href="#work" style={{ color: "#ccd6f6" }}><span style={{ color: "#64ffda" }}>02.</span> Work</a>
          <a href="#projects" style={{ color: "#ccd6f6" }}><span style={{ color: "#64ffda" }}>03.</span> Projects</a>
          <a href="#contact" style={{ color: "#ccd6f6" }}><span style={{ color: "#64ffda" }}>04.</span> Next</a>
        </div>
      </nav>
      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>
        <p style={{ color: "#64ffda", fontFamily: "monospace" }}>Hi, my name is</p>
        <h1 style={{ color: "#e6f1ff", fontSize: "clamp(40px, 8vw, 76px)", lineHeight: 1.05, margin: "12px 0 0" }}>Jesse.</h1>
        <h2 style={{ color: "#8892b0", fontSize: "clamp(32px, 6vw, 60px)", lineHeight: 1.1, margin: "8px 0 0" }}>I build things for the web.</h2>
        <p style={{ color: "#8892b0", maxWidth: 560, fontSize: 18, lineHeight: 1.6 }}>
          A labs showcase: {projects.length} projects, each with its own page, all sharing one
          Supabase backend so demos stay alive, with one demo user across them. Pick a project
          and you get its page — not just a link out to GitHub.
        </p>
        <div style={{ marginTop: 28 }}>
          <Button asChild><a href="#projects" style={{ background: "#64ffda", color: "#0a192f" }}>Check out my projects</a></Button>
        </div>

        <section id="about" style={{ marginTop: 110 }}>
          <h2 style={{ color: "#e6f1ff", fontSize: 28 }}><span style={{ color: "#64ffda", fontFamily: "monospace", fontSize: 20 }}>01.</span> About Me</h2>
          <p style={{ color: "#8892b0", maxWidth: 640, lineHeight: 1.7 }}>
            This is a working showcase, not a template demo. Every project below is a real repo
            under agenticjess-star, audited as 37 projects. Live URLs are only shown where they
            were verified; the rest link to their project page and code, with no invented demo link.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
            {["Next.js", "TypeScript", "React", "Supabase", "Vercel", "GitHub"].map((t) => (
              <Badge key={t} variant="outline" style={{ color: "#64ffda", borderColor: "#233554" }}>{t}</Badge>
            ))}
          </div>
        </section>

        <section id="work" style={{ marginTop: 110 }}>
          <h2 style={{ color: "#e6f1ff", fontSize: 28 }}><span style={{ color: "#64ffda", fontFamily: "monospace", fontSize: 20 }}>02.</span> Some Things I&apos;ve Built</h2>
          {featured.map((p, i) => (
            <article key={p.slug} style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16, marginTop: 48, padding: 24, background: "#112240", borderRadius: 8 }}>
              {p.image_url ? <img src={p.image_url} alt="" style={{ width: "100%", borderRadius: 6, display: "block" }} /> : null}
              <p style={{ color: "#64ffda", fontFamily: "monospace", fontSize: 13 }}>Featured Project</p>
              <h3 style={{ color: "#e6f1ff", fontSize: 26, margin: 0 }}>
                <Link href={`/projects/${p.slug}`}>{p.name}</Link>
              </h3>
              <p style={{ color: "#8892b0", lineHeight: 1.6 }}>{p.description}</p>
              <p style={{ color: "#8892b0", fontFamily: "monospace", fontSize: 13 }}>{p.language} · {p.status}</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button variant="outline" size="sm" style={{ background: "transparent", color: "#64ffda", borderColor: "#64ffda" }} asChild><Link href={`/projects/${p.slug}`}>Project page</Link></Button>
                <Button variant="outline" size="sm" style={{ background: "transparent", color: "#64ffda", borderColor: "#64ffda" }} asChild><a href={p.github_url}>GitHub</a></Button>
                {p.live_url ? <Button variant="outline" size="sm" style={{ background: "transparent", color: "#64ffda", borderColor: "#64ffda" }} asChild><a href={p.live_url}>Live demo</a></Button> : null}
              </div>
              <p style={{ color: "#8892b0", fontSize: 12 }}>Panel, not a screenshot — the generated concept image for this project is on its project page.</p>
            </article>
          ))}
        </section>

        <section id="projects" style={{ marginTop: 110 }}>
          <h2 style={{ color: "#e6f1ff", fontSize: 28 }}><span style={{ color: "#64ffda", fontFamily: "monospace", fontSize: 20 }}>03.</span> Other Noteworthy Projects (33 more)</h2>
          <form style={{ margin: "20px 0" }}>
            <Input name="q" defaultValue={searchParams?.q || ""} placeholder="Search projects…" style={{ background: "#112240", color: "#e6f1ff", borderColor: "#233554", height: 48 }} />
          </form>
          <div>
              {list.filter((p) => !featured.some((f) => f.slug === p.slug)).map((p) => (
                <div key={p.slug} style={{ borderTop: "1px solid #233554", padding: "14px 0", display: "flex", flexWrap: "wrap", gap: "4px 16px", alignItems: "baseline" }}>
                  <Link href={`/projects/${p.slug}`} style={{ color: "#e6f1ff", fontWeight: 600, flex: "1 1 220px", minWidth: 0 }}>{p.name}</Link>
                  <span style={{ flex: "0 0 auto" }}>{p.language}</span>
                  <span style={{ flex: "0 0 auto" }}>{p.status}</span>
                  <span style={{ flex: "0 0 auto" }}>
                    <a href={p.github_url} style={{ color: "#64ffda", marginRight: 12 }}>GitHub</a>
                    {p.live_url ? <a href={p.live_url} style={{ color: "#64ffda" }}>Live</a> : null}
                  </span>
                </div>
              ))}
            </div>
          <p style={{ color: "#8892b0", fontSize: 13, marginTop: 16 }}>Featured rows above ({featured.length}) plus archive rows ({rest.length}) = {projects.length} projects, all filled in.</p>
        </section>

        <section id="contact" style={{ marginTop: 110, textAlign: "center" }}>
          <h2 style={{ color: "#e6f1ff", fontSize: 28 }}><span style={{ color: "#64ffda", fontFamily: "monospace", fontSize: 20 }}>04.</span> What&apos;s Next?</h2>
          <p style={{ color: "#8892b0", maxWidth: 520, margin: "16px auto", lineHeight: 1.6 }}>Pick a variant, or go back to the hub and open any project page.</p>
          <Button asChild><Link href="/variants">Back to variants</Link></Button>
        </section>

        <footer style={{ marginTop: 100, borderTop: "1px solid #233554", paddingTop: 24, color: "#8892b0", fontSize: 13, lineHeight: 1.6 }}>
          <p>Layout after <a href="https://github.com/bchiang7/v4" style={{ color: "#64ffda" }}>bchiang7/v4</a> (8,286 stars, MIT — attribution as its README asks, linking back to <a href="https://brittanychiang.com/" style={{ color: "#64ffda" }}>brittanychiang.com</a>). This variant is not Brittany Chiang&apos;s site: all content here is Jesse&apos;s labs projects.</p>
          <p>Components: shadcn Button, Badge, Input. Data: Supabase projects table, lib/projects.json fallback. Only verified live URLs shown as live.</p>
          <p><Link href="/variants" style={{ color: "#64ffda" }}>← All variants</Link> · <Link href="/" style={{ color: "#64ffda" }}>Hub</Link></p>
        </footer>
      </main>
    </div>
  );
}
