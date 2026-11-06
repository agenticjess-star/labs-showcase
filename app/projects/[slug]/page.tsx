import { getProjects } from "../../../lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const projects = await getProjects();
  const i = projects.findIndex((p) => p.slug === params.slug);
  if (i < 0) notFound();
  const p = projects[i];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return (
    <main style={{ maxWidth: 1020, margin: "0 auto", padding: "28px 20px 72px", fontFamily: "Inter, system-ui, sans-serif", background: "#FAF7F2", color: "#111" }}>
      <p><Link href="/" style={{ color: "#E4571D" }}>← All projects</Link></p>
      {p.image_url ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image_url} alt="" style={{ width: "100%", height: "auto", borderRadius: 6 }} />
          <p style={{ fontSize: 13, color: "#666" }}>Generated concept image — not a screenshot of the live project.</p>
        </>
      ) : (
        <div style={{ background: "#111", color: "#FAF7F2", padding: "48px 24px", borderRadius: 6, fontSize: 32, fontWeight: 800 }}>{p.name}</div>
      )}
      <h1 style={{ fontSize: "clamp(44px, 9vw, 88px)", lineHeight: 1 }}>{p.name}</h1>
      <p style={{ color: "#4A4A4A", fontSize: 18, maxWidth: 640 }}>{p.description}</p>
      <p>
        <span style={{ border: "1px solid #ddd", padding: "4px 10px", borderRadius: 20, fontSize: 13 }}>{p.language}</span>{" "}
        <span style={{ border: "1px solid #ddd", padding: "4px 10px", borderRadius: 20, fontSize: 13 }}>{p.status}</span>
      </p>
      <p>
        {p.live_url ? (
          <a href={p.live_url} style={{ display: "inline-flex", minHeight: 44, alignItems: "center", padding: "0 20px", background: "#E4571D", color: "#fff", textDecoration: "none", fontWeight: 700, borderRadius: 6 }}>Open live demo →</a>
        ) : (
          <span>Live check pending — no URL claimed</span>
        )}{" "}
        <a href={p.github_url} style={{ display: "inline-flex", minHeight: 44, alignItems: "center", padding: "0 16px", color: "#111" }}>Code on GitHub →</a>
      </p>
      <p><Link href={`/projects/${prev.slug}`}>← {prev.name}</Link> | <Link href={`/projects/${next.slug}`}>{next.name} →</Link></p>
    </main>
  );
}
