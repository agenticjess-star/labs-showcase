import { getProjects } from "../lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Hub, brushed up with the real installed components:
// shadcn Card / Button / Badge / Input (components/ui/*), plus the
// smoothui, beUI and shadcn OTP/File Upload components installed in this repo.
// Data: Supabase `projects` table first, lib/projects.json fallback.
export default async function Home({ searchParams }: { searchParams?: { q?: string } }) {
  const projects = await getProjects();
  const q = (searchParams?.q || "").toLowerCase();
  const list = projects.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );
  const featured = projects.filter((p) => p.image_url);
  return (
    <main className="mx-auto max-w-5xl px-5 pb-20 pt-7">
      <p className="text-sm font-semibold tracking-wide text-muted-foreground">LABS — JESSE</p>
      <h1 className="mt-2 text-6xl font-extrabold leading-none tracking-tight sm:text-7xl">
        Every project,<br />its own page.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Pick a project and you get its page — image, what it does, stack, status, live demo and code —
        not just a link out to GitHub. Only verified live URLs are shown as live.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/spotify">Spotify gate + upload demo</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="#all-projects">Browse all projects</Link>
        </Button>
      </div>
      <form className="my-6">
        <Input name="q" defaultValue={searchParams?.q || ""} placeholder="Search projects…" className="h-12 text-base" />
      </form>
      <h2 className="text-2xl font-bold">Featured</h2>
      <div className="my-6 grid gap-5 sm:grid-cols-2">
        {featured.map((p) => (
          <Card key={p.slug} className="overflow-hidden">
            <Link href={`/projects/${p.slug}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image_url!} alt="" className="h-auto w-full" />
            </Link>
            <CardHeader>
              <CardTitle>
                <Link href={`/projects/${p.slug}`}>{p.name}</Link>
              </CardTitle>
              <CardDescription>{p.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Generated concept image — not a screenshot.</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <h2 id="all-projects" className="text-2xl font-bold">All projects ({list.length})</h2>
      <div className="mt-4 flex flex-col gap-3">
        {list.map((p, i) => (
          <Card key={p.slug}>
            <CardContent className="flex items-start gap-4 p-4">
              <span className="font-bold text-orange-600">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1">
                <Link href={`/projects/${p.slug}`} className="text-lg font-bold hover:underline">
                  {p.name}
                </Link>
                <p className="text-muted-foreground">{p.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.language ? <Badge variant="secondary">{p.language}</Badge> : null}
                  {p.status ? <Badge variant="outline">{p.status}</Badge> : null}
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/projects/${p.slug}`}>View</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
