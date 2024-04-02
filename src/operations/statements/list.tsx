import { Statement } from "@/gen/client";
import { List, LabelType, useOrder } from "@/ui/components/list";

import { accountProvider } from "@/providers/account-provider";

import { renderMoney } from "@/utils/money";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

export function StatementList({ accountId }: { accountId: string }) {
  const labels: LabelType<Statement>[] = [
    { source: "ref", label: "Ref", size: "20%" },
    {
      label: "Credits",
      render: (statement) => renderMoney(statement.debits!),
      size: "15%",
    },
    {
      label: "Debits",
      render: (statement) => renderMoney(statement.credits!),
      size: "15%",
    },
    {
      label: "date",
      size: "18%",
      render: (statements) => formatDate(statements.date!),
    },
    {
      label: "Balance",
      size: "15%",
      render: (statements) => renderMoney(statements.balance || 0),
    },
  ];

  return (
    <List
      labels={labels}
      source={["statements"]}
      keys={[]}
      provider={() =>
        accountProvider.getBankStatements(accountId, "2020-01-01", "2025-01-01")
      }
      overviewProps={{
        leftButton: (
          <Link href={`/accounts/${accountId}`}>
            <Button size="sm" px={5} colorScheme="blue">
              Back
            </Button>
          </Link>
        ),
      }}
    />
  );
}
