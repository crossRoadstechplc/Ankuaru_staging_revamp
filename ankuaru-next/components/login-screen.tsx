"use client";

import { FormEvent, useMemo, useState } from "react";
import { DEMO_USERS, type DemoUser, type SanitizedUser } from "@/lib/auth/users";

type LoginScreenProps = {
  onLogin: (user: SanitizedUser) => void;
};

const demoAccountsSorted = [...DEMO_USERS]
  .filter((u) => u.role !== "Admin")
  .sort((a, b) => {
    const tier = (r: DemoUser["role"]) => (r === "Trader" ? 0 : 1);
    const byTier = tier(a.role) - tier(b.role);
    if (byTier !== 0) return byTier;
    const byRole = a.role.localeCompare(b.role);
    if (byRole !== 0) return byRole;
    return a.username.localeCompare(b.username);
  });

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const disabled = useMemo(() => !username.trim() || !password.trim() || submitting, [password, submitting, username]);

  const performLogin = async (user: string, pass: string): Promise<boolean> => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });
    const payload = (await response.json()) as { message?: string; user?: SanitizedUser };
    if (!response.ok || !payload.user) {
      setError(payload.message ?? "Login failed.");
      return false;
    }
    onLogin(payload.user);
    return true;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await performLogin(username.trim(), password);
    } catch {
      setError("Unable to connect to auth API.");
    } finally {
      setSubmitting(false);
    }
  };

  const quickSignIn = async (account: DemoUser) => {
    if (submitting) return;
    setUsername(account.username);
    setPassword(account.password);
    setError("");
    setSubmitting(true);
    try {
      await performLogin(account.username, account.password);
    } catch {
      setError("Unable to connect to auth API.");
    } finally {
      setSubmitting(false);
    }
  };

  const onCopy = async (key: string, value: string) => {
    await copyText(value);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1600);
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
          <div className="login-help-heading">Demo accounts — sign in or copy username / password</div>
          <div className="login-demo-list" role="list">
            {demoAccountsSorted.map((account) => (
              <div className="login-demo-row" key={`${account.role}-${account.username}`} role="listitem">
                <span className="login-demo-role">{account.role}</span>
                <div className="login-demo-fields">
                  <div className="login-demo-field">
                    <span className="login-demo-label">Username</span>
                    <code className="login-demo-value">{account.username}</code>
                    <button
                      type="button"
                      className="login-demo-copy"
                      onClick={() => onCopy(`u-${account.username}`, account.username)}
                    >
                      {copiedKey === `u-${account.username}` ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="login-demo-field">
                    <span className="login-demo-label">Password</span>
                    <code className="login-demo-value">{account.password}</code>
                    <button
                      type="button"
                      className="login-demo-copy"
                      onClick={() => onCopy(`p-${account.username}`, account.password)}
                    >
                      {copiedKey === `p-${account.username}` ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
                <button type="button" className="login-demo-quick" disabled={submitting} onClick={() => quickSignIn(account)}>
                  Sign in
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
