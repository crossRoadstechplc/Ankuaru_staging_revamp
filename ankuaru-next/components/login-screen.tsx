"use client";

import { FormEvent, useMemo, useState } from "react";
import { DEMO_USERS, type DemoUser, type SanitizedUser, type UserRole } from "@/lib/auth/users";

type LoginScreenProps = {
  onLogin: (user: SanitizedUser) => void;
};

/** Demo picker sort order — Admin appears last after other roles. */
const DEMO_ROLE_ORDER: UserRole[] = [
  "Trader",
  "Farmer",
  "Aggregator",
  "Processor",
  "Transporter",
  "Lab",
  "Bank",
  "Regulator",
  "Admin",
];

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const disabled = useMemo(() => !username.trim() || !password.trim() || submitting, [password, submitting, username]);

  const demoAccountsSorted = useMemo(() => {
    const order = new Map(DEMO_ROLE_ORDER.map((role, index) => [role, index]));
    return [...DEMO_USERS].sort((a, b) => {
      const ia = order.get(a.role) ?? 999;
      const ib = order.get(b.role) ?? 999;
      if (ia !== ib) return ia - ib;
      return a.username.localeCompare(b.username);
    });
  }, []);

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

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-brand-title">ANKUARU</div>
          <div className="login-brand-sub">TRACK & TRADE</div>
        </div>
        <h1 className="login-title">Sign In</h1>

        <div className="login-columns">
          <form className="login-form" onSubmit={submit}>
            <div className="login-form-fields">
              <div className="login-field-group">
                <label className="login-label" htmlFor="username">
                  Username
                </label>
                <input id="username" className="login-input text-black" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="login-field-group">
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
              </div>
            </div>

            {error ? <div className="login-error">{error}</div> : null}
            <button className="login-btn" type="submit" disabled={disabled}>
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="login-help">
            <div className="login-help-heading">Demo accounts — quick sign in</div>
            <div className="login-demo-list" role="list">
              {demoAccountsSorted.map((account) => (
                <div className="login-demo-row" key={`${account.role}-${account.username}`} role="listitem">
                  <span className="login-demo-role">{account.role}</span>
                  <div className="login-demo-creds">
                    <div className="login-demo-cred">
                      <span className="login-demo-label">Username</span>
                      <code className="login-demo-value">{account.username}</code>
                    </div>
                    <div className="login-demo-cred">
                      <span className="login-demo-label">Password</span>
                      <code className="login-demo-value">{account.password}</code>
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
    </div>
  );
}
