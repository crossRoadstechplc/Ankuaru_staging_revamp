export const formatMarket = (nycArabicaCents: number, etbRate: number, alertChipText: string) =>
  `<span>NY-C <b style="color:#c4e0d8">${nycArabicaCents.toFixed(2)}¢</b></span><span>ETB <b style="color:#c4e0d8">${etbRate.toFixed(2)}</b></span><span id="sb-alert-chip" style="color:#e8c060">${alertChipText}</span>`;

export const formatCrumb = (title: string) => `Ankuaru · ${title}`;
