"use client";
// Spotify webapp passcode gate — simple keypad, the same pattern as the
// working dark ListenLife gate. No wheel picker: the wheel version was
// poorly implemented and hard to get past on a phone, so it is gone.
// touch-action: manipulation + no double-tap zoom behaviour.
import * as React from "react";
import { Button } from "@/components/ui/button";

export function SpotifyPasscodeGate({
  expectedCode,
  title = "Listenlife",
  onUnlock,
}: {
  expectedCode: string;
  title?: string;
  onUnlock: () => void;
}) {
  const [entered, setEntered] = React.useState("");
  const [error, setError] = React.useState(false);

  const press = (k: string) => {
    if (k === "clear") { setEntered(""); setError(false); return; }
    if (k === "back") { setEntered((v) => v.slice(0, -1)); return; }
    if (entered.length >= expectedCode.length) return;
    const next = entered + k;
    setEntered(next);
    if (next.length === expectedCode.length) {
      if (next === expectedCode) onUnlock();
      else { setError(true); setEntered(""); }
    }
  };

  const keys = ["1","2","3","4","5","6","7","8","9","clear","0","back"];

  return (
    <div
      className="flex min-h-[420px] flex-col items-center justify-center gap-6 rounded-2xl border bg-card p-8 text-center"
      style={{ touchAction: "manipulation" }}
    >
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Enter the passcode</p>
      </div>
      <div className="h-9 text-3xl tracking-[0.5em]" aria-live="polite">
        {"●".repeat(entered.length)}
      </div>
      <div className="grid w-64 grid-cols-3 gap-2.5" style={{ touchAction: "manipulation" }}>
        {keys.map((k) => (
          <Button
            key={k}
            variant="outline"
            className="h-14 text-xl"
            style={{ touchAction: "manipulation" }}
            onClick={() => press(k)}
          >
            {k === "clear" ? "C" : k === "back" ? "←" : k}
          </Button>
        ))}
      </div>
      {error ? (
        <p className="text-sm text-destructive">Wrong code</p>
      ) : (
        <p className="h-5 text-sm text-muted-foreground">
          {entered.length > 0 ? `${entered.length} of ${expectedCode.length} digits` : ""}
        </p>
      )}
    </div>
  );
}
