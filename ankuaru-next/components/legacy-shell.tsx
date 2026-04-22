"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store/useAppStore";
import { formatCrumb, formatMarket } from "@/lib/domain/format";
import { HrvMapModal } from "@/components/hrv-map-modal";
import { AUTH_STORAGE_KEY } from "@/lib/auth/session";

function mountMarketplaceTabs(root: HTMLElement) {
  const viewArea = root.querySelector<HTMLElement>("#view-area");
  const toolbar = root.querySelector<HTMLElement>(".main-toolbar");
  if (!viewArea) return;
  const split = viewArea.querySelector<HTMLElement>(".l4-market-split:not([aria-hidden='true'])");
  if (!split || !toolbar) return;

  // Remove legacy status/view control strip in Marketplace (user requested).
  toolbar.querySelectorAll<HTMLElement>(".tp, .tp-sep").forEach((node) => {
    node.style.display = "none";
  });
  toolbar.querySelectorAll<HTMLElement>("span").forEach((node) => {
    const text = node.textContent?.trim().toLowerCase();
    if (text === "status:" || text === "view:" || text === "market:") {
      node.style.display = "none";
    }
  });

  const otherBlock = split.querySelector<HTMLElement>(".l4-market-block--secondary");
  const auctionBlock = split.querySelector<HTMLElement>(".l4-market-block:not(.l4-market-block--secondary)");
  if (!auctionBlock || !otherBlock) return;

  let tabs = toolbar.querySelector<HTMLElement>("#marketplace-toolbar-tabs");
  if (!tabs) {
    tabs = document.createElement("div");
    tabs.id = "marketplace-toolbar-tabs";
    tabs.className = "marketplace-top-tabs";
    tabs.innerHTML =
      '<span class="marketplace-tabs-label">Market:</span><button type="button" class="marketplace-tab active" data-market-tab="auctions">Auctions</button><button type="button" class="marketplace-tab" data-market-tab="ioi-rfq">IOI/RFQ</button><button type="button" class="marketplace-tab" data-market-tab="all">All</button><button type="button" class="marketplace-add-listing-btn" id="marketplace-add-listing-btn">+ New Listing</button>';
    toolbar.appendChild(tabs);
  }

  const applyTab = (tab: "ioi-rfq" | "auctions" | "all") => {
    root.dataset.marketTab = tab;
    (
      window as unknown as {
        __ANKUARU_MARKET_TAB?: "ioi-rfq" | "auctions" | "all";
      }
    ).__ANKUARU_MARKET_TAB = tab;
    const showIOIRFQ = tab === "ioi-rfq" || tab === "all";
    const showAuctions = tab === "auctions" || tab === "all";
    otherBlock.style.display = showIOIRFQ ? "" : "none";
    auctionBlock.style.display = showAuctions ? "" : "none";
    tabs.querySelectorAll<HTMLButtonElement>(".marketplace-tab").forEach((button) => {
      button.classList.toggle("active", button.dataset.marketTab === tab);
    });
  };

  tabs.querySelectorAll<HTMLButtonElement>(".marketplace-tab").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () =>
      applyTab((button.dataset.marketTab as "ioi-rfq" | "auctions" | "all") ?? "auctions"),
    );
  });
  const selected = (root.dataset.marketTab as "ioi-rfq" | "auctions" | "all" | undefined) ?? "auctions";
  applyTab(selected);

  const addButton = tabs.querySelector<HTMLButtonElement>("#marketplace-add-listing-btn");
  if (addButton && addButton.dataset.bound !== "true") {
    addButton.dataset.bound = "true";
    addButton.addEventListener("click", () => {
      const win = window as unknown as { openListingWizard?: () => void };
      if (typeof win.openListingWizard === "function") win.openListingWizard();
    });
  }
}

function ensureSidebarLogo(root: HTMLElement) {
  const slot = root.querySelector<HTMLElement>("#bs-brand-slot");
  const lockup = root.querySelector<HTMLElement>("#qat-brand-root");
  if (!slot || !lockup) return;

  // Always keep top-QAT lockup hidden and render a sidebar clone.
  lockup.style.display = "none";

  let sidebarBrand = slot.querySelector<HTMLElement>("#sidebar-brand-root");
  if (!sidebarBrand) {
    sidebarBrand = lockup.cloneNode(true) as HTMLElement;
    sidebarBrand.id = "sidebar-brand-root";
    sidebarBrand.style.display = "flex";
    slot.replaceChildren(sidebarBrand);
  }
}

function syncDomState(root: HTMLElement, state: ReturnType<typeof useAppStore.getState>) {
  (
    window as unknown as {
      __ANKUARU_CURRENT_USER?: string | null;
    }
  ).__ANKUARU_CURRENT_USER = state.authUser?.username ?? null;
  ensureSidebarLogo(root);

  const qatTitle = root.querySelector<HTMLElement>("#qat-title");
  if (qatTitle) qatTitle.textContent = state.authUser ? state.authUser.username : state.portfolioTitle;

  const crumb = root.querySelector<HTMLElement>("#sb-crumb");
  if (crumb) crumb.textContent = formatCrumb(state.portfolioTitle);

  const badge = root.querySelector<HTMLElement>("#bell-badge");
  if (badge) badge.textContent = String(state.notificationsUnreadCount);

  const avatar = root.querySelector<HTMLElement>(".qat-avatar");
  if (avatar) avatar.textContent = state.userMonogram;

  const account = root.querySelector<HTMLElement>(".sb-right span:last-child");
  if (account) account.textContent = state.accountId;

  const sidebarUser = root.querySelector<HTMLElement>("#sidebar-auth-user");
  if (sidebarUser) sidebarUser.textContent = state.authUser ? `Role: ${state.authUser.role}` : "Role: —";

  const market = root.querySelector<HTMLElement>("#sb-market");
  if (market) market.innerHTML = formatMarket(state.nycArabicaCents, state.etbRate, state.alertChipText);

  const searchInput = root.querySelector<HTMLInputElement>("#qat-search-input");
  if (searchInput && searchInput.value !== state.searchQuery) searchInput.value = state.searchQuery;

  const cards = root.querySelector<HTMLElement>("#v-cards");
  const timeline = root.querySelector<HTMLElement>("#v-timeline");
  cards?.classList.toggle("on", state.viewMode === "cards");
  timeline?.classList.toggle("on", state.viewMode === "timeline");

  root.querySelectorAll<HTMLElement>(".main-toolbar .tp").forEach((button) => {
    const text = button.textContent?.trim().toUpperCase();
    if (["ALL", "PENDING", "DISPATCHED", "EXPORTED"].includes(text || "")) {
      button.classList.toggle("on", text === state.statusFilter);
    }
  });

  root.querySelectorAll<HTMLElement>(".rtab").forEach((button) => {
    const id = button.id?.replace("tab-", "");
    button.classList.toggle("active", id === state.ribbonTab);
  });
}

export function LegacyShell() {
  const rootRef = useRef<HTMLDivElement>(null);
  const listingsSignatureRef = useRef<string>("");

  useEffect(() => {
    let canceled = false;

    const boot = async () => {
      const root = rootRef.current;
      if (!root) return;

      const html = await fetch("/legacy/markup.html").then((res) => res.text());
      if (canceled) return;
      root.innerHTML = html;
      ensureSidebarLogo(root);

      const sidebar = root.querySelector<HTMLElement>(".bs-sidebar");
      const backButton = root.querySelector<HTMLElement>(".bs-back");
      if (sidebar && backButton && !root.querySelector("#sidebar-auth-panel")) {
        const panel = document.createElement("div");
        panel.id = "sidebar-auth-panel";
        panel.className = "sidebar-auth-panel";
        panel.innerHTML =
          '<div id="sidebar-auth-user" class="sidebar-auth-user">—</div><button type="button" id="sidebar-logout-btn" class="sidebar-logout-btn">Logout</button>';
        sidebar.insertBefore(panel, backButton);
      }

      document.querySelectorAll('script[data-ankuaru-legacy="true"]').forEach((node) => node.remove());
      const script = document.createElement("script");
      script.src = "/legacy/script.js";
      script.async = false;
      script.dataset.ankuaruLegacy = "true";
      document.body.appendChild(script);
      await new Promise<void>((resolve) => {
        script.onload = () => resolve();
        script.onerror = () => resolve();
      });

      (
        window as unknown as {
          __ANKUARU_LEGACY_MAIN_VIEW?: (mode: "welcome" | "cards" | "timeline" | "market") => void;
          __ANKUARU_GO_TO_MARKETPLACE?: () => void;
        }
      ).__ANKUARU_LEGACY_MAIN_VIEW = (mode) => {
        useAppStore.getState().setViewMode(mode);
      };
      (
        window as unknown as {
          __ANKUARU_GO_TO_MARKETPLACE?: () => void;
        }
      ).__ANKUARU_GO_TO_MARKETPLACE = () => {
        useAppStore.getState().setViewMode("market");
        useAppStore.getState().setRibbonTab("home");
        root.querySelector<HTMLElement>("#tab-home")?.click();
        root.querySelector<HTMLElement>("#bsn-auction")?.click();
      };

      (
        window as unknown as {
          __ANKUARU_SYNC_LISTINGS?: (listings: Record<string, Record<string, unknown>>) => Promise<void>;
          __ANKUARU_SET_LISTINGS?: (listings: Record<string, Record<string, unknown>>) => void;
          __ANKUARU_SYNC_NOTIFICATIONS?: (notifications: Record<string, unknown[]>) => Promise<void>;
          __ANKUARU_SET_FOLLOWS?: (follows: Record<string, string[]>) => void;
          __ANKUARU_SET_NOTIFS?: (notifications: Record<string, unknown[]>) => void;
        }
      ).__ANKUARU_SYNC_LISTINGS = async (listings) => {
        await fetch(`/api/marketplace/listings?_=${Date.now()}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          cache: "no-store",
          body: JSON.stringify({ listings }),
        });
      };
      (
        window as unknown as {
          __ANKUARU_SYNC_NOTIFICATIONS?: (notifications: Record<string, unknown[]>) => Promise<void>;
        }
      ).__ANKUARU_SYNC_NOTIFICATIONS = async (notifications) => {
        await fetch(`/api/marketplace/notifications?_=${Date.now()}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          cache: "no-store",
          body: JSON.stringify({ notifications }),
        });
      };

      const pullListings = async () => {
        try {
          const response = await fetch(`/api/marketplace/listings?_=${Date.now()}`, {
            cache: "no-store",
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
          });
          const payload = (await response.json()) as { listings?: Record<string, Record<string, unknown>> };
          if (!payload.listings || canceled) return;
          const nextSig = JSON.stringify(payload.listings);
          if (nextSig === listingsSignatureRef.current) return;
          listingsSignatureRef.current = nextSig;
          (
            window as unknown as {
              __ANKUARU_SET_LISTINGS?: (listings: Record<string, Record<string, unknown>>) => void;
            }
          ).__ANKUARU_SET_LISTINGS?.(payload.listings);
        } catch {
          // keep legacy in-file listings if API load fails
        }
      };
      const pullFollows = async () => {
        try {
          const response = await fetch(`/api/marketplace/follows?_=${Date.now()}`, {
            cache: "no-store",
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
          });
          const payload = (await response.json()) as { follows?: Record<string, string[]> };
          if (!payload.follows || canceled) return;
          (
            window as unknown as {
              __ANKUARU_SET_FOLLOWS?: (follows: Record<string, string[]>) => void;
            }
          ).__ANKUARU_SET_FOLLOWS?.(payload.follows);
        } catch {
          // keep legacy in-script defaults if follows API fails
        }
      };
      const pullNotifications = async () => {
        try {
          const user = useAppStore.getState().authUser?.username;
          if (!user || canceled) {
            useAppStore.getState().setNotificationsUnreadCount(0);
            return;
          }
          const response = await fetch(`/api/marketplace/notifications?user=${encodeURIComponent(user)}&_=${Date.now()}`, {
            cache: "no-store",
            headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
          });
          const payload = (await response.json()) as {
            items?: unknown[];
            unreadCount?: number;
          };
          const items = Array.isArray(payload.items) ? payload.items : [];
          (
            window as unknown as {
              __ANKUARU_SET_NOTIFS?: (notifications: Record<string, unknown[]>) => void;
            }
          ).__ANKUARU_SET_NOTIFS?.({ [user]: items });
          useAppStore.getState().setNotificationsUnreadCount(Number(payload.unreadCount || 0));
        } catch {
          // keep existing notification UI when API fails
        }
      };
      await pullListings();
      await pullFollows();
      await pullNotifications();
      try {
        const response = await fetch("/api/marketplace/taxonomy");
        const payload = (await response.json()) as { taxonomy?: Record<string, unknown> };
        if (payload.taxonomy && !canceled) {
          (
            window as unknown as {
              __ANKUARU_SET_TAXONOMY?: (taxonomy: Record<string, unknown>) => void;
            }
          ).__ANKUARU_SET_TAXONOMY?.(payload.taxonomy);
        }
      } catch {
        // keep in-script taxonomy defaults if API load fails
      }

      const searchInput = root.querySelector<HTMLInputElement>("#qat-search-input");
      searchInput?.addEventListener("input", (event) => {
        const value = (event.target as HTMLInputElement).value;
        useAppStore.getState().setSearchQuery(value);
      });

      const tabHandlers = [
        { selector: "#tab-home", value: "home" },
        { selector: "#tab-actors", value: "actors" },
        { selector: "#tab-transactions", value: "transactions" },
        { selector: "#tab-followers", value: "followers" },
      ];
      tabHandlers.forEach(({ selector, value }) => {
        root.querySelector(selector)?.addEventListener("click", () => useAppStore.getState().setRibbonTab(value));
      });

      root.querySelector("#v-cards")?.addEventListener("click", () => useAppStore.getState().setViewMode("cards"));
      root.querySelector("#v-timeline")?.addEventListener("click", () => useAppStore.getState().setViewMode("timeline"));
      root.querySelector("#bell-btn")?.addEventListener("click", () => useAppStore.getState().toggleNotif());
      root.querySelector("#sidebar-logout-btn")?.addEventListener("click", () => {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        useAppStore.getState().logout();
      });
      root.querySelectorAll<HTMLElement>(".main-toolbar .tp").forEach((button) => {
        const text = button.textContent?.trim().toUpperCase();
        if (["ALL", "PENDING", "DISPATCHED", "EXPORTED"].includes(text || "")) {
          button.addEventListener("click", () => {
            useAppStore.getState().setStatusFilter((text || "ALL") as "ALL" | "PENDING" | "DISPATCHED" | "EXPORTED");
          });
        }
      });

      const auctionButton = root.querySelector<HTMLButtonElement>("#bsn-auction");
      if (auctionButton) {
        const svg = auctionButton.querySelector("svg");
        auctionButton.title = "Marketplace — live listings and matchmaking";
        auctionButton.innerHTML = `${svg?.outerHTML ?? ""}Marketplace`;
        setTimeout(() => {
          mountMarketplaceTabs(root);
        }, 0);
      }

      const viewArea = root.querySelector<HTMLElement>("#view-area");
      const marketObserver = viewArea
        ? new MutationObserver(() => {
            mountMarketplaceTabs(root);
          })
        : null;
      if (viewArea && marketObserver) {
        marketObserver.observe(viewArea, { childList: true, subtree: true });
      }
      const listingsPoller = setInterval(() => {
        void pullListings();
        void pullFollows();
        void pullNotifications();
      }, 2000);

      syncDomState(root, useAppStore.getState());

      return () => {
        marketObserver?.disconnect();
        clearInterval(listingsPoller);
        const win = window as unknown as {
          __ANKUARU_SYNC_LISTINGS?: unknown;
          __ANKUARU_SYNC_NOTIFICATIONS?: unknown;
          __ANKUARU_LEGACY_MAIN_VIEW?: unknown;
          __ANKUARU_GO_TO_MARKETPLACE?: unknown;
        };
        delete win.__ANKUARU_SYNC_LISTINGS;
        delete win.__ANKUARU_SYNC_NOTIFICATIONS;
        delete win.__ANKUARU_LEGACY_MAIN_VIEW;
        delete win.__ANKUARU_GO_TO_MARKETPLACE;
      };
    };

    let cleanup: (() => void) | undefined;
    boot().then((fn) => {
      cleanup = fn;
    });
    const unsub = useAppStore.subscribe((state) => {
      const root = rootRef.current;
      if (root) syncDomState(root, state);
    });

    return () => {
      canceled = true;
      cleanup?.();
      unsub();
    };
  }, []);

  return (
    <>
      <div ref={rootRef} className="app-shell" />
      <HrvMapModal />
    </>
  );
}
