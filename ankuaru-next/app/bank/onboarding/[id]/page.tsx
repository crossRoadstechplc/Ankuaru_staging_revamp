import { BankReviewDetailPage } from "@/components/workspaces/bank-review-detail-page";

export default async function BankReviewDetailRoutePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BankReviewDetailPage reviewId={id} />;
}
