import { v4 as uuid } from "uuid";
import { CreateTransfer } from "@/gen/client";
import { CreateMutation } from "@/ui/components/mutation";
import { TransferFields } from "./fields";
import { accountProvider } from "@/providers/account-provider";
import { dateToISO } from "@/utils/date";

export function CreateTransfers({
  refetch,
  accounId,
}: {
  refetch: () => void;
  accounId: string;
}) {
  const createProvider = async (toSave: CreateTransfer) => {
    /*@ts-ignore*/
    const externBank = toSave.externBank;
    /*@ts-ignore*/
    delete toSave.externBank;
    return accountProvider
      .doTransfers(externBank, [toSave])
      .then((response) => response[0]);
  };

  const defaultValue: CreateTransfer = {
    label: "",
    amount: 0,
    reason: "",
    effectiveDatetime: "",
    idCategory: "",
    idDestination: "",
    /*@ts-ignore*/
    externBank: false,
  };

  const transform = (transfer: CreateTransfer): CreateTransfer => {
    const currentDate = new Date().toISOString();
    console.log(transfer.effectiveDatetime);
    return {
      ...transfer,
      id: uuid(),
      idSource: accounId,
      amount: +transfer.amount!,
      createdAt: currentDate,
      effectiveDatetime: dateToISO(transfer.effectiveDatetime!),
    };
  };

  return (
    <CreateMutation
      source={["balances", "transactions", "transfers"]}
      title="Create Transfers"
      defaultValue={defaultValue}
      transform={transform}
      refetch={refetch}
      provider={createProvider}
      buttons={{
        toggle: {
          label: "New transfer",
        },
      }}
    >
      <TransferFields accountId={accounId} />
    </CreateMutation>
  );
}
