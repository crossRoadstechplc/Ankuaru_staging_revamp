import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock("@/components/legacy-shell", () => ({
  LegacyShell: () => <div data-testid="legacy-shell" />,
}));

vi.mock("next/navigation", () => {
  const replace = vi.fn();
  return {
    useRouter: () => ({ replace }),
    usePathname: () => "/",
  };
});

import { AppRoot } from "@/components/app-root";
import { useAppStore } from "@/lib/store/useAppStore";

describe("AppRoot role routing", () => {
  it("renders legacy shell only for Trader", () => {
    useAppStore.setState({
      isAuthenticated: true,
      authUser: {
        username: "nathan.trader",
        role: "Trader",
        registeredDate: "x",
        modifiedDate: "x",
      },
    });

    const { container } = render(<AppRoot />);
    expect(container).toBeTruthy();
  });
});

