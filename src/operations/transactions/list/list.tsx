import {
  Heading,
  Box,
  Text
} from "@chakra-ui/react";
import { Transaction, TransactionType } from "@/gen/client";
import { LabelType, List, useOrder } from "@/ui/components/list";
import { CreateTransactions } from "../mutation/create";
import { ButtonModal } from "@/ui/components";
import { accountProvider } from "@/providers/account-provider";
import { formatDate } from "@/utils/date";
import { renderMoney } from "@/utils/money";

function TransactionTypeShow({ data: transaction }: { data: Transaction }) {
  const isDebit = transaction.type === TransactionType.Debit;
  return (
    <Box sx={{ width: "10%" }}>
      <Heading
        sx={{ fontSize: "14px" }}
        color={isDebit ? "#eb2a31" : "#1cff46"}
      >
        {transaction.type}
      </Heading>
    </Box>
  );
}

function ShowOneTransaction({ data: transaction }: { data: Transaction }) {
  return (
    <ButtonModal
      button={{
        label: "More info",
        props: {
          colorScheme: "blue"
        }
      }}
      modalContent={{
        props: {
          sx: {
            p: 5
          }
        }
      }}
    >
      <Heading sx={{ fontSize: "16px", mb: 3 }}>
        Transaction Reason
      </Heading>
      <Text sx={{ fontSize: "14px" }}>
        {transaction.reason}
      </Text>
    </ButtonModal>
  );
}

export function TransactionList({ accountId }: { accountId: string }) {
  const { handleChange, orderValue } = useOrder<Transaction>({
    orderBy: "transactionDatetime",
    order: "DESC",
  });

  const labels: LabelType<Transaction>[] = [
    { label: "Type", component: TransactionTypeShow, size: "10%" },
    { label: "Label", source: "label", size: "10%" },
    { label: "Category", source: "category.name", size: "10%" },
    {
      label: "Amount",
      render: (transaction) => renderMoney(transaction.amount!),
      size: "15%",
    },
    {
      label: "Creation",
      render: (transaction) => formatDate(transaction?.transactionDatetime!),
      size: "20%",
    },
    { label: "", component: ShowOneTransaction, size: "20%" },
  ];

  return (
    <List
      labels={labels}
      source="transactions"
      provider={() => accountProvider.getTransaction(accountId, orderValue)}
      keys={[accountId, orderValue.order, orderValue.orderBy]}
      overviewProps={{
        leftButton: <CreateTransactions accounId={accountId} />,
        orders: {
          current: orderValue,
          handleChange,
          queries: [
            { value: "amount", label: "Amount" },
            { value: "transactionDatetime", label: "Creation" },
            { value: "label", label: "Label" },
          ],
        },
      }}
    />
  );
}
