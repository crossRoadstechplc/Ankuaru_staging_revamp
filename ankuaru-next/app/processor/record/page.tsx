import { Suspense } from "react";
import { ProcessorRecordPage } from "@/components/workspaces/processor-record-page";

export default function ProcessorRecordRoutePage() {
  return (
    <Suspense fallback={<div style={{ padding: 24, fontSize: 13, color: "#6a5a4a" }}>Loading…</div>}>
      <ProcessorRecordPage />
    </Suspense>
  );
}
