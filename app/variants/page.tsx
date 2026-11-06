import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Variant index. Each variant is filled with the real 37-project list
// (Supabase first, lib/projects.json fallback) — no invented live URLs.
const variants = [
  {
    href: "/variants/a",
    title: "Variant A — bchiang7/v4, almost exact",
    body: "Dark navy, teal accent, mono section numbers, side nav, hero, About, featured work in alternating rows, full project archive table. Jesse's projects swapped in; Brittany Chiang's personal text is not copied.",
    ref: "https://github.com/bchiang7/v4",
    refLabel: "Ref repo: bchiang7/v4 (8,286 stars) — live site: brittanychiang.com",
    refLive: "https://brittanychiang.com/",
  },
  {
    href: "/variants/b",
    title: "Variant B — dark grid gallery",
    body: "High-contrast dark gallery, bold typography, category filters, large project cards. Taken from the Dribbble Personal Portfolio shot: dark theme, grid gallery, minimal UI, focus on the work.",
    ref: "https://dribbble.com/shots/27242818-Personal-Portfolio-Website",
    refLabel: "Ref: Dribbble — Personal Portfolio Website by Sujon Hossain for Oripio",
    refLive: "https://dribbble.com/shots/27242818-Personal-Portfolio-Website",
  },
  {
    href: "/variants/c",
    title: "Variant C — soft brutalist agency grid",
    body: "Light paper, thick black borders, huge uppercase type, bold project rows. Taken from the Dribbble Outline Agency shot: soft brutalist structure, bold project grid with large layout, minimal cinematic tone.",
    ref: "https://dribbble.com/shots/26903633-Landing-Page-Outline-Agency-Portfolio-Website",
    refLabel: "Ref: Dribbble — Outline Agency Portfolio Website by Dave Omeiza",
    refLive: "https://dribbble.com/shots/26903633-Landing-Page-Outline-Agency-Portfolio-Website",
  },
];

export default function VariantsIndex() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-20 pt-10">
      <p className="text-sm font-semibold tracking-wide text-muted-foreground">LABS — VARIANTS</p>
      <h1 className="mt-2 text-5xl font-extrabold tracking-tight">Three showcase variants.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Same 37 real projects in all three. Only verified live URLs are shown as live; everything
        else links to its project page and its GitHub repo. Pick one and it becomes the hub.
      </p>
      <div className="mt-8 grid gap-5">
        {variants.map((v) => (
          <Card key={v.href}>
            <CardHeader>
              <CardTitle>
                <Link href={v.href}>{v.title}</Link>
              </CardTitle>
              <CardDescription>{v.body}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={v.href}>Open variant</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={v.refLive}>Reference (live)</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <footer className="mt-12 text-sm text-muted-foreground">
        <p>Components used: shadcn Button, Card, Badge, Input (components/ui/*). Design skills are not design refs; refs above are the specific live sites/shots each variant follows.</p>
        <p className="mt-2">
          <Link href="/" className="underline">← Back to hub</Link>
        </p>
      </footer>
    </main>
  );
}
