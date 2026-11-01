"use client";
// Demo: Spotify webapp gate + file upload as real components.
// Gate: shadcn Input OTP. Upload: beUI File Upload.
// Demo passcode is 1234, shown here on purpose for the demo only.
// It is NOT the passcode of any live gated site.
import * as React from "react";
import { SpotifyPasscodeGate } from "@/components/listenlife/spotify-passcode-gate";
import { SpotifyFileUpload } from "@/components/listenlife/spotify-file-upload";
import { SpotifyAiChat } from "@/components/listenlife/spotify-ai-chat";
import { SpotifyDataView, parseHistory, type ParsedHistory } from "@/components/listenlife/spotify-data-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SpotifyDemo() {
  const [unlocked, setUnlocked] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [parsed, setParsed] = React.useState<ParsedHistory | null>(null);
  const totalBytes = files.reduce((n, f) => n + f.size, 0);
  const onFiles = async (f: File[]) => {
    const all = [...files, ...f];
    setFiles(all);
    setParsed(await parseHistory(all));
  };

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <p className="text-sm text-muted-foreground">LABS — COMPONENT DEMO</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">Spotify webapp: gate + upload</h1>
      <p className="mt-2 text-muted-foreground">
        The gate and the file upload, as reusable components — not inline markup.
        Demo passcode: <strong>1234</strong> — simple keypad. This demo is not ListenLife itself; the real ListenLife is the dark original, linked from the showcase project page.
      </p>
      <div className="mt-8">
        {!unlocked ? (
          <SpotifyPasscodeGate expectedCode="1234" onUnlock={() => setUnlocked(true)} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Upload your listening history</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <SpotifyFileUpload onFiles={(f) => void onFiles(f)} />
              {files.length > 0 ? (
                <p className="text-sm text-muted-foreground">
                  {files.length} file{files.length === 1 ? "" : "s"} selected,{" "}
                  {(totalBytes / 1024 / 1024).toFixed(1)} MB total. Loaded state is
                  visible here and stays in this browser session.
                </p>
              ) : null}
              {parsed ? <SpotifyDataView data={parsed} /> : null}
              <SpotifyAiChat />
              <p className="text-sm text-muted-foreground">
                Chat runs on Featherless AI. Add FEATHERLESS_API_KEY in Vercel project settings to turn it on; until then it says so instead of faking answers.
              </p>
              <div>
                <Button variant="outline" onClick={() => { setUnlocked(false); setFiles([]); setParsed(null); }}>
                  Lock demo again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
