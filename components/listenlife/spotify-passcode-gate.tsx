"use client";
// Spotify webapp passcode gate, rebuilt so there is no double-tap zoom:
// no tappable OTP slots and no repeated tapping on one spot. Each digit is
// chosen on a scroll wheel (React Wheel Picker, components/wheel-picker.tsx,
// iOS-style, drag/scroll with inertia), then Unlock checks the four wheels.
// touch-action: manipulation on the button also blocks double-tap zoom.
import * as React from "react";
import { WheelPicker, WheelPickerWrapper } from "@/components/wheel-picker";
import { Button } from "@/components/ui/button";

const DIGITS = Array.from({ length: 10 }, (_, i) => ({ label: String(i), value: String(i) }));

export function SpotifyPasscodeGate({
  expectedCode,
  title = "Listenlife",
  onUnlock,
}: {
  expectedCode: string;
  title?: string;
  onUnlock: () => void;
}) {
  const length = expectedCode.length;
  const [digits, setDigits] = React.useState<string[]>(Array(length).fill("0"));
  const [error, setError] = React.useState(false);
  const code = digits.join("");

  const tryUnlock = () => {
    if (code === expectedCode) onUnlock();
    else setError(true);
  };

  return (
    <div
      className="flex min-h-[420px] flex-col items-center justify-center gap-6 rounded-2xl border bg-card p-8 text-center"
      style={{ touchAction: "manipulation" }}
    >
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Scroll each wheel to your passcode — no tapping, no double-tap zoom
        </p>
      </div>
      <WheelPickerWrapper>
        {digits.map((d, i) => (
          <WheelPicker
            key={i}
            options={DIGITS}
            value={d}
            onValueChange={(v) => {
              setDigits((prev) => prev.map((x, j) => (j === i ? String(v) : x)));
              setError(false);
            }}
          />
        ))}
      </WheelPickerWrapper>
      {error ? (
        <p className="text-sm text-destructive">Wrong code — scroll the wheels and try again</p>
      ) : (
        <p className="h-5 text-sm text-muted-foreground">Wheels: {code.split("").join(" ")}</p>
      )}
      <Button onClick={tryUnlock} style={{ touchAction: "manipulation" }}>
        Unlock
      </Button>
    </div>
  );
}
