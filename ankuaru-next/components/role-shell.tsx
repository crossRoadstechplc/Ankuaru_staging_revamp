"use client";

import { ReactNode, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AUTH_STORAGE_KEY } from "@/lib/auth/session";
import { useAppStore } from "@/lib/store/useAppStore";

export type NavItem = { href: string; label: string; id: string };

const ROLE_ROOTS: Record<string, string> = {
  Farmer: "/farmer",
  Aggregator: "/aggregator",
  Admin: "/admin",
  Processor: "/processor",
  Transporter: "/transporter",
  Lab: "/lab",
  Bank: "/bank",
  Regulator: "/regulator",
};

export function RoleShell({
  role,
  children,
  navItems,
}: {
  role: "Admin" | "Farmer" | "Aggregator" | "Processor" | "Transporter" | "Lab" | "Bank" | "Regulator";
  children: ReactNode;
  navItems: NavItem[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const authUser = useAppStore((s) => s.authUser);
  const logout = useAppStore((s) => s.logout);

  const shared: NavItem[] = useMemo(
    () => [
      { id: "account", label: "Account", href: "/account" },
      { id: "settings", label: "Settings", href: "/settings" },
      { id: "help", label: "Help", href: "/help" },
    ],
    [],
  );

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const onLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    logout();
    router.replace("/");
  };

  // Show welcome overlay when the user lands on the role root (e.g. /farmer)
  const isWelcome = pathname === ROLE_ROOTS[role];

  if (!authUser) return null;

  return (
    <div className="portal-root">
      <div className="backstage backstage--docked open" id="backstage">
        {/* ── Sidebar ── */}
        <div className="bs-sidebar">
          <div className="bs-logo">
            <div className="bs-logo-inner">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#e8d4a8", letterSpacing: ".05em" }}>
                    ANKUARU
                  </div>
                  <div style={{ fontSize: 8, color: "#9a8a7a", letterSpacing: ".04em" }}>TRACK &amp; TRADE</div>
                </div>
              </div>
              <div className="bs-logo-portal">{role}</div>
            </div>
          </div>

          {/* Role-specific nav — flex:1 pushes shared section down */}
          <nav className="bs-nav">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`bs-navitem${isActive(item.href) ? " on" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Divider before shared items */}
          <div className="bs-navdiv" />

          {/* Shared nav (Account / Settings / Help) */}
          <nav style={{ padding: "8px 0", flexShrink: 0 }}>
            {shared.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`bs-navitem${isActive(item.href) ? " on" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Role badge + logout */}
          <button
            type="button"
            className="bs-back"
            onClick={onLogout}
            style={{ flexDirection: "column", alignItems: "flex-start", gap: 2 }}
          >
            <span style={{ fontSize: 9, color: "#4a3a2a", letterSpacing: ".12em", textTransform: "uppercase" }}>
              {role}
            </span>
            <span style={{ fontSize: 11, color: "#8a7a6a" }}>{authUser.username}</span>
            <span style={{ fontSize: 10, color: "#5a4a3a", marginTop: 2 }}>Logout →</span>
          </button>
        </div>

        {/* ── Content area ── */}
        <div className="bs-content">
          {/* Welcome overlay — shown on role root path, hides all content */}
          {isWelcome && (
            <div className="portfolio-welcome">
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#e8d4a8",
                    letterSpacing: ".1em",
                    marginBottom: 12,
                  }}
                >
                  ANKUARU
                </div>
                <p className="portfolio-welcome-text">Welcome, {authUser.username}</p>
                <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--tx3)" }}>
                  Choose a destination from the sidebar.
                </p>
              </div>
            </div>
          )}

          {/* Actual page content */}
          <div className="main">
            <div className="view-area">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
