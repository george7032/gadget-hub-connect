import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Kings Gadgets KE" },
      { name: "description", content: "Set a new password for your Kings Gadgets KE staff account." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Reset Password — Kings Gadgets KE" },
      { property: "og:description", content: "Set a new staff password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 6) return setError("Use at least 6 characters.");
    if (password !== confirm) return setError("The two passwords don't match.");
    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      setError("This reset link may have expired. Request a new one from the sign-in page.");
      return;
    }
    navigate({ to: "/admin", replace: true });
  }

  const inputCls =
    "mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent";
  const labelCls = "font-mono text-[10px] uppercase tracking-wider text-muted-foreground";

  return (
    <div className="mx-auto flex max-w-md flex-col px-5 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Staff only</p>
      <h1 className="mt-1 font-display text-4xl tracking-tight">New password</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-border bg-surface p-6">
        <div>
          <label htmlFor="pw" className={labelCls}>New password</label>
          <input id="pw" type="password" required autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="pw2" className={labelCls}>Confirm password</label>
          <input id="pw2" type="password" required autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} />
        </div>
        {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
        <button type="submit" disabled={busy} className="w-full rounded-full bg-foreground py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-60">
          {busy ? "Saving…" : "Save new password"}
        </button>
      </form>
    </div>
  );
}
