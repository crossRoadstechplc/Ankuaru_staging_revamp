"use client";

import { FormEvent, useMemo, useState } from "react";
import type { SanitizedUser } from "@/lib/auth/users";

type LoginScreenProps = {
  onLogin: (user: SanitizedUser) => void;
};

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const disabled = useMemo(() => !username.trim() || !password.trim() || submitting, [password, submitting, username]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const payload = (await response.json()) as { message?: string; user?: SanitizedUser };
      if (!response.ok || !payload.user) {
        setError(payload.message ?? "Login failed.");
        return;
      }
      onLogin(payload.user);
    } catch {
      setError("Unable to connect to auth API.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-title">ANKUARU</div>
          <div className="login-brand-sub">TRACK & TRADE</div>
        </div>
        <h1 className="login-title">Sign In</h1>

        <form className="login-form" onSubmit={submit}>
          <label className="login-label" htmlFor="username">
            Username
          </label>
          <input id="username" className="login-input text-black" value={username} onChange={(e) => setUsername(e.target.value)} />

          <label className="login-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="login-input text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <div className="login-error">{error}</div> : null}
          <button className="login-btn" type="submit" disabled={disabled}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="login-help">
          <div>Sample accounts:</div>
          <div>`nathan.trader` / `demo1234`</div>
          <div>`kaffa.ops` / `kaffaPass!`</div>
        </div>
      </div>
    </div>
  );
}
