type Container = {
  status: string;
  value?: number;
  guarantee?: Record<string, unknown>;
};

export function seedGuarantees<T extends Container>(containers: T[]): T[] {
  const statusToGuarantee: Record<string, string> = {
    PENDING: "DRAFT",
    DISPATCHED: "ISSUED",
    EXPORTED: "SETTLED",
  };
  const banks = ["BNK-CBE", "BNK-AWASH", "BNK-DASHEN", "BNK-COOP", "BNK-ZEMEN"];
  const bankNames: Record<string, string> = {
    "BNK-CBE": "Commercial Bank of Ethiopia",
    "BNK-AWASH": "Awash Bank",
    "BNK-DASHEN": "Dashen Bank",
    "BNK-COOP": "Cooperative Bank of Oromia",
    "BNK-ZEMEN": "Zemen Bank",
  };

  return containers.map((container, i) => {
    if (container.guarantee) return container;
    const state = statusToGuarantee[container.status] ?? "DRAFT";
    const bank = banks[i % banks.length];
    return {
      ...container,
      guarantee: {
        no: state === "DRAFT" ? null : `GTE-2026-${String(8000 + i).padStart(4, "0")}`,
        bank,
        bankName: bankNames[bank],
        expiry: "31 Dec 2026",
        terms: "Performance guarantee · 10% of contract value · valid until delivery settlement",
        state,
        amount: container.value ?? 0,
      },
    };
  });
}
