import { Suspense } from "react";
import { Navbar } from "../../../../components/Navbar";
import { EvaluationFooter } from "../../../../components/EvaluationFooter";
import SubmitFormClient from "./SubmitFormClient"; // IDE cache refresh

interface PageProps {
  params: Promise<{
    groupName: string;
  }>;
}

export default async function SubmitPage({ params }: PageProps) {
  const { groupName } = await params;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, paddingBlock: "40px" }}>
        <Suspense fallback={
          <div className="page-wrap" style={{ textAlign: "center", paddingBlock: "80px", color: "var(--text-body)" }}>
            Loading evaluation form details...
          </div>
        }>
          <SubmitFormClient groupName={groupName} />
        </Suspense>
      </main>
      <EvaluationFooter />
    </div>
  );
}
