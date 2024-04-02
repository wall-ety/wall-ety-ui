import { v4 as uuid } from "uuid";
import { CreateTransaction, TransactionType } from "@/gen/client";
import { CreateMutation } from "@/ui/components/mutation";
import { TransactionFields } from "./fields";
import { accountProvider } from "@/providers/account-provider";

export function CreateTransactions({
  accounId,
  refetch,
}: {
  refetch: () => void;
  accounId: string;
}) {
  const createProvider = (toSave: CreateTransaction) =>
    accountProvider.doTransaction([toSave]).then((response) => response[0]);

  const defaultValue: CreateTransaction = {
    label: "",
    amount: 0,
    reason: "",
    transactionDatetime: "",
    type: TransactionType.Credit,
  };

  const transform = (transaction: CreateTransaction): CreateTransaction => {
    const currentDate = new Date().toISOString();

    return {
      ...transaction,
      id: uuid(),
      idAccount: accounId,
      amount: +transaction.amount!,
      transactionDatetime: currentDate,
    };
  };

  return (
    <CreateMutation
      source={["balances", "transactions", "transfers"]}
      title="Create Transactions"
      defaultValue={defaultValue}
      transform={transform}
      refetch={refetch}
      provider={createProvider}
      buttons={{
        toggle: {
          label: "New transaction",
        },
      }}
    >
      <TransactionFields />
    </CreateMutation>
  );
}
