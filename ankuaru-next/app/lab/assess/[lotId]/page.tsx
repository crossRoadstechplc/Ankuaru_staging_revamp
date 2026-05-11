import { LabAssessPage } from "@/components/workspaces/lab-assess-page";

export default async function LabAssessRoutePage({ params }: { params: Promise<{ lotId: string }> }) {
  const { lotId } = await params;
  return <LabAssessPage lotId={lotId} />;
}
