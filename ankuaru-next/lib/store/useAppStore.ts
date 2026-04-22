"use client";

import { create } from "zustand";
import { MARKET_DATA } from "@/lib/data/seed";
import type { SanitizedUser } from "@/lib/auth/users";

type ViewMode = "welcome" | "cards" | "timeline" | "market";
type StatusFilter = "ALL" | "PENDING" | "DISPATCHED" | "EXPORTED";

type AppStore = {
  portfolioTitle: string;
  brandTagline: string;
  userMonogram: string;
  accountId: string;
  searchQuery: string;
  viewMode: ViewMode;
  statusFilter: StatusFilter;
  ribbonTab: string;
  backstageOpen: boolean;
  notifOpen: boolean;
  detailOpen: boolean;
  wizardOpen: boolean;
  notificationsUnreadCount: number;
  nycArabicaCents: number;
  etbRate: number;
  alertChipText: string;
  authUser: SanitizedUser | null;
  isAuthenticated: boolean;
  setPortfolioTitle: (value: string) => void;
  setSearchQuery: (value: string) => void;
  setViewMode: (value: ViewMode) => void;
  setStatusFilter: (value: StatusFilter) => void;
  setRibbonTab: (value: string) => void;
  setNotificationsUnreadCount: (value: number) => void;
  toggleNotif: () => void;
  login: (user: SanitizedUser) => void;
  logout: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  portfolioTitle: "Portfolio — Kaffa Trading PLC",
  brandTagline: "TRACK & TRADE",
  userMonogram: "NI",
  accountId: "ACT-EXP-MAIN",
  searchQuery: "",
  viewMode: "welcome",
  statusFilter: "ALL",
  ribbonTab: "home",
  backstageOpen: true,
  notifOpen: false,
  detailOpen: false,
  wizardOpen: false,
  notificationsUnreadCount: 0,
  nycArabicaCents: MARKET_DATA.nycArabicaCents,
  etbRate: MARKET_DATA.etbRate,
  alertChipText: MARKET_DATA.alertChipText,
  authUser: null,
  isAuthenticated: false,
  setPortfolioTitle: (value) => set({ portfolioTitle: value }),
  setSearchQuery: (value) => set({ searchQuery: value }),
  setViewMode: (value) => set({ viewMode: value }),
  setStatusFilter: (value) => set({ statusFilter: value }),
  setRibbonTab: (value) => set({ ribbonTab: value }),
  setNotificationsUnreadCount: (value) => set({ notificationsUnreadCount: value }),
  toggleNotif: () => set((state) => ({ notifOpen: !state.notifOpen })),
  login: (user) =>
    set({
      authUser: user,
      isAuthenticated: true,
      userMonogram: user.username.slice(0, 2).toUpperCase(),
      accountId: user.username,
      viewMode: "welcome",
    }),
  logout: () =>
    set({
      authUser: null,
      isAuthenticated: false,
      userMonogram: "NI",
      accountId: "ACT-EXP-MAIN",
      viewMode: "welcome",
    }),
}));
