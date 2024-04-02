"use client";

import { StatementList } from "@/operations/statements";
import { useParams } from "next/navigation";

export default function StatementListPage() {
  const { accountId } = useParams();
  return <StatementList accountId={accountId as string} />;
}
