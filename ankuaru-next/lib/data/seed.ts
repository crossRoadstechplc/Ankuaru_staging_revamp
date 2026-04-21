export const STATUS_OPTIONS = ["ALL", "PENDING", "DISPATCHED", "EXPORTED"] as const;
export const VIEW_OPTIONS = ["cards", "timeline"] as const;
export const RIBBON_TABS = ["home", "actors", "compliance", "reports"] as const;

export const EXPORTERS = [
  { id: "EXP-0041", name: "Horizon Ethiopia Export PLC", short: "Horizon" },
  { id: "EXP-0087", name: "Yirgacheffe Coffee Traders Ltd", short: "YCT" },
  { id: "EXP-0023", name: "Addis Finest Commodities", short: "Addis Finest" },
  { id: "EXP-0156", name: "Ethiopian Specialty Coffee", short: "Spec. Coffee" },
  { id: "EXP-0098", name: "Kaffa Forest Coffee PLC", short: "Kaffa Forest" },
  { id: "EXP-0071", name: "Bench Maji Exports", short: "Bench Maji" },
  { id: "EXP-0134", name: "Harar Trading Company", short: "Harar Co." },
] as const;

export const MARKET_DATA = {
  nycArabicaCents: 378.25,
  etbRate: 156.0,
  alertChipText: "",
};
