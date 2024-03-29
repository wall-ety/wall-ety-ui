import { Transaction } from "@/gen/client";
import { accountProvider } from "@/providers/account-provider";
import { LabelType, List, useOrder } from "@/ui/components/list";
import { Button } from "@chakra-ui/react";

export function TransactionList({ accountId }: { accountId: string }) {
  const { handleChange, orderValue } = useOrder<Transaction>({
    orderBy: "transactionDatetime",
    order: "DESC"
  });

  const labels: LabelType<Transaction>[] = [
    { label: "Amount", source: "amount", size: "15%" }
  ];

  return (
    <List
      labels={labels}
      source="transactions"
      provider={() => accountProvider.getTransaction(accountId, {})}
      overviewProps={{
        orders: {
          current: orderValue,
          handleChange,
          queries: [
            { value: "amount", label: "Amount" },
          ]
        }
      }}
    />
  )
}
