import { NextResponse } from "next/server";

// Chat about ListenLife data, via Featherless AI (OpenAI-compatible).
// The key is NOT in this code: it must be set in Vercel as FEATHERLESS_API_KEY.
// Optional override: FEATHERLESS_MODEL. Default is the model from Featherless'
// own quickstart example, Qwen/Qwen2.5-7B-Instruct.
// Data context below uses only figures from the ListenLife dashboard itself:
// 189,420 qualifying plays (>=30s) of 247,316 raw events, 9,761 hours,
// 21,341 songs, 29 May 2015 - 25 Oct 2026. No genre figures are invented:
// the Spotify history files contain no genre data.
const SYSTEM = `You are a helpful assistant answering questions about one person's Spotify listening history, shown in their ListenLife dashboard.
Verified dashboard facts you may use:
- 189,420 qualifying plays (at least 30 seconds each) out of 247,316 raw playback events
- 9,761 hours listened, 21,341 distinct songs
- Period: 29 May 2015 to 25 October 2026
- Sections in the dashboard: Overview, Top Songs, Top Artists, Five Musical Chapters (2015-2026), Yearbook, Genres & Taste Evolution, Listening Behavior & Telemetry Funnel, Time & Place, Memory Explorer
- Key artist trajectories named in the dashboard: Quinn XCII, ayokay, Glass Animals, JAY-Z, Labrinth, Black Keys
Rules: answer only from these facts and the conversation. Do not invent song counts, genre mappings, durations, or rankings that are not in the facts above. If the user asks for something not covered, say so plainly and say what file or section would answer it. Keep answers short and plain.`;

export async function POST(req: Request) {
  const apiKey = process.env.FEATHERLESS_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "FEATHERLESS_API_KEY is not set in Vercel yet. Add it in the Vercel project settings, then redeploy." },
      { status: 503 }
    );
  }
  const { messages } = (await req.json().catch(() => ({}))) as {
    messages?: { role: string; content: string }[];
  };
  if (!messages || messages.length === 0) {
    return NextResponse.json({ error: "No messages sent." }, { status: 400 });
  }
  const model = process.env.FEATHERLESS_MODEL || "Qwen/Qwen2.5-7B-Instruct";
  const res = await fetch("https://api.featherless.ai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM }, ...messages],
      temperature: 0.3,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json(
      { error: `Featherless returned ${res.status}. ${text.slice(0, 300)}` },
      { status: 502 }
    );
  }
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const reply = data.choices?.[0]?.message?.content ?? "";
  return NextResponse.json({ reply });
}
