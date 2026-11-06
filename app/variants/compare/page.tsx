import Link from "next/link";

// Side-by-side: each variant next to the live reference it was built from.
// On a phone the two panes stack — they never sit side by side in a way
// that forces horizontal scrolling. If a reference site blocks framing,
// its pane will be blank and the "Open reference" link below it is the
// fallback — that is stated, not hidden.
const pairs = [
  {
    id: "A",
    variantHref: "/variants/a",
    variantName: "Variant A — bchiang7/v4 clone",
    refHref: "https://brittanychiang.com/",
    refName: "Reference — brittanychiang.com (live site for bchiang7/v4)",
    matches: "Dark navy, teal accent, mono section numbers, hero, About, featured work, full archive, contact/next section.",
    misses: "Featured panels are text + (now) concept images, not the reference's project screenshots. No fixed left rail — the reference's current live site is a single scrolling column, and this variant follows that column, not a rail.",
  },
  {
    id: "B",
    variantHref: "/variants/b",
    variantName: "Variant B — dark grid gallery",
    refHref: "https://dribbble.com/shots/27242818-Personal-Portfolio-Website",
    refName: "Reference — Dribbble Personal Portfolio Website",
    matches: "Dark high-contrast theme, bold type, grid gallery, categorised work, minimal UI.",
    misses: "The reference is photography-led: its grid is large photos. This variant's grid is mostly typographic colour panels, with real concept images only on the 4 projects that have one. That gap is real — the reference reads as images first, this reads as cards first.",
  },
  {
    id: "C",
    variantHref: "/variants/c",
    variantName: "Variant C — soft brutalist agency grid",
    refHref: "https://dribbble.com/shots/26903633-Landing-Page-Outline-Agency-Portfolio-Website",
    refName: "Reference — Dribbble Outline Agency Portfolio Website",
    matches: "Light paper, thick black rules, huge uppercase type, bold project rows, minimal tone.",
    misses: "The reference lets large images lead each project. This variant leads with type and rows; images are not in the rows yet. Closest of the three on structure, furthest on imagery.",
  },
];

export default function Compare() {
  return (
    <main style={{ maxWidth: 1400, margin: "0 auto", padding: "24px 16px 80px", overflowWrap: "anywhere", wordBreak: "break-word", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.04em" }}>LABS — SIDE BY SIDE</p>
      <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", lineHeight: 1.05, margin: "8px 0" }}>Variant vs. reference, next to each other.</h1>
      <p style={{ maxWidth: 720, lineHeight: 1.6, color: "#444" }}>
        Left pane is the live reference, right pane is the variant built from it, on the same
        preview. On a phone they stack, one above the other — nothing here should scroll sideways.
        Where a pane is blank, that site blocks framing; use the link under it.
      </p>
      {pairs.map((p) => (
        <section key={p.id} style={{ marginTop: 56 }}>
          <h2 style={{ fontSize: 26, margin: "0 0 16px" }}>{p.variantName}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(520px, 100%), 1fr))", gap: 16 }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontWeight: 700, margin: "0 0 8px" }}>Reference</p>
              <iframe title={`Reference for variant ${p.id}`} src={p.refHref} style={{ width: "100%", height: 560, border: "2px solid #111", background: "#fff" }} />
              <p style={{ margin: "8px 0 0" }}><a href={p.refHref} style={{ textDecoration: "underline" }}>Open reference in a new tab →</a></p>
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontWeight: 700, margin: "0 0 8px" }}>Variant (this preview)</p>
              <iframe title={`Variant ${p.id}`} src={p.variantHref} style={{ width: "100%", height: 560, border: "2px solid #111", background: "#fff" }} />
              <p style={{ margin: "8px 0 0" }}><Link href={p.variantHref} style={{ textDecoration: "underline" }}>Open variant →</Link></p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 16, marginTop: 16 }}>
            <p style={{ margin: 0, lineHeight: 1.6 }}><strong>What matches:</strong> {p.matches}</p>
            <p style={{ margin: 0, lineHeight: 1.6 }}><strong>What does not yet:</strong> {p.misses}</p>
          </div>
        </section>
      ))}
      <footer style={{ marginTop: 64, borderTop: "2px solid #111", paddingTop: 20, fontSize: 13, lineHeight: 1.6 }}>
        <p><Link href="/variants" style={{ textDecoration: "underline" }}>← All variants</Link> · <Link href="/" style={{ textDecoration: "underline" }}>Hub</Link></p>
      </footer>
    </main>
  );
}
