import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff Sign In — Kings Gadgets KE" },
      {
        name: "description",
        content:
          "Private sign-in for Kings Gadgets KE staff to manage product prices, photos and tags.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Staff Sign In — Kings Gadgets KE" },
      {
        property: "og:description",
        content: "Private sign-in for Kings Gadgets KE staff.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function onForgot() {
    setError("");
    setNotice("");
    if (!email.trim()) {
      setError("Type your email above first, then tap Forgot password.");
      return;
    }
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (resetError) {
      setError("Could not send the reset email. Please try again.");
      return;
    }
    setNotice("Check your inbox for a link to set a new password.");
  }


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (signInError) {
      setError("That email and password combination did not work.");
      return;
    }
    navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-5 py-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
        Staff only
      </p>
      <h1 className="mt-1 font-display text-4xl tracking-tight">Sign in</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Manage product prices, photos, names and tags.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-4 rounded-2xl border border-border bg-surface p-6"
      >
        <div>
          <label
            htmlFor="email"
            className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        {error ? (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full bg-foreground py-3 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <button
          type="button"
          onClick={onForgot}
          className="w-full text-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Forgot password?
        </button>
        {notice ? (
          <p className="text-sm text-muted-foreground" role="status">
            {notice}
          </p>
        ) : null}
      </form>
    </div>
  );
}
