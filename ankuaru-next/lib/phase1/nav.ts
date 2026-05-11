export type NavItem = { id: string; label: string; href: string };

export const NAV_BY_ROLE = {
  Admin: [
    { id: "dash", label: "Dashboard", href: "/admin/dashboard" },
    { id: "fields", label: "Fields", href: "/admin/fields" },
    { id: "lots", label: "Lots", href: "/admin/lots" },
    { id: "events", label: "Events", href: "/admin/events" },
  ],
  Farmer: [
    { id: "dash", label: "Dashboard", href: "/farmer/dashboard" },
    { id: "fields", label: "Fields", href: "/farmer/fields" },
    { id: "lots", label: "Lots", href: "/farmer/lots" },
  ],
  Aggregator: [
    { id: "dash", label: "Dashboard", href: "/aggregator/dashboard" },
    { id: "validation", label: "Lot Validation", href: "/aggregator/lot-validation" },
    { id: "agg", label: "Create Aggregation", href: "/aggregator/aggregate" },
    { id: "farmerLots", label: "Farmer Lots", href: "/aggregator/farmer-lots" },
  ],
  Processor: [
    { id: "dash", label: "Dashboard", href: "/processor/dashboard" },
    { id: "queue", label: "Processing Queue", href: "/processor/queue" },
    { id: "record", label: "Record Processing", href: "/processor/record" },
  ],
  Transporter: [
    { id: "dash", label: "Dashboard", href: "/transporter/dashboard" },
    { id: "dispatch", label: "Dispatch", href: "/transporter/dispatch" },
    { id: "receipt", label: "Receipt", href: "/transporter/receipt" },
    { id: "fleet", label: "Fleet", href: "/transporter/fleet" },
  ],
  Lab: [
    { id: "dash", label: "Dashboard", href: "/lab/dashboard" },
    { id: "queue", label: "Assessment Queue", href: "/lab/queue" },
  ],
  Bank: [
    { id: "dash", label: "Dashboard", href: "/bank/dashboard" },
    { id: "onboarding", label: "Onboarding Reviews", href: "/bank/onboarding" },
  ],
  Regulator: [
    { id: "dash", label: "Dashboard", href: "/regulator/dashboard" },
    { id: "oversight", label: "Oversight", href: "/regulator/oversight" },
  ],
} satisfies Record<string, NavItem[]>;

export type NavRole = keyof typeof NAV_BY_ROLE;
