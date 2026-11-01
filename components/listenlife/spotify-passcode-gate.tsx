"use client";
// Spotify webapp passcode gate, built on the real shadcn Input OTP component
// (components/ui/input-otp.tsx), not a hand-coded keypad.
// Demo code is shown on the demo page itself; this component takes whatever
// expected code the caller passes in.
import * as React from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
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
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const length = expectedCode.length;

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 rounded-2xl border bg-card p-8 text-center">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">Enter the passcode</p>
      </div>
      <InputOTP
        maxLength={length}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={(v) => {
          setValue(v);
          setError(false);
          if (v.length === length && v === expectedCode) onUnlock();
        }}
      >
        <InputOTPGroup>
          {Array.from({ length }, (_, i) => (
            <InputOTPSlot key={i} index={i} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {error ? (
        <p className="text-sm text-destructive">Wrong code</p>
      ) : (
        <p className="h-5 text-sm text-muted-foreground">
          {value.length > 0 ? `${value.length} of ${length} digits entered` : ""}
        </p>
      )}
      <Button
        variant="outline"
        onClick={() => {
          if (value === expectedCode) onUnlock();
          else {
            setError(true);
            setValue("");
          }
        }}
      >
        Unlock
      </Button>
    </div>
  );
}
