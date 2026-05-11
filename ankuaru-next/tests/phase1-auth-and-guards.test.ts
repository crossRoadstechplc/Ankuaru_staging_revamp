import { describe, expect, it } from "vitest";
import { actorFromRequest } from "@/lib/phase1/auth";

describe("phase1 auth headers", () => {
  it("rejects missing headers", () => {
    const req = new Request("http://localhost/api/phase1/fields");
    expect(actorFromRequest(req)).toBeNull();
  });

  it("accepts valid role headers", () => {
    const req = new Request("http://localhost/api/phase1/fields", {
      headers: { "x-ankuaru-user": "farmer.demo", "x-ankuaru-role": "Farmer" },
    });
    expect(actorFromRequest(req)).toEqual({ userId: "farmer.demo", role: "Farmer" });
  });
});

