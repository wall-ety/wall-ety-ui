import { v4 as uuid } from "uuid";

import { Bank } from "@/gen/client";
import { CreateMutation } from "@/ui/components/mutation";
import { BankFields } from "./fields";

import { bankProvider } from "@/providers/bank-provider";

export function CreateBank() {
  const createProvider = (toSave: Bank) =>
    bankProvider.saveOrUpdate([toSave]).then((response) => response[0]);

  const defaultValue: Bank = {
    subsequentLoan: 0,
    firstWeekLoan: 0,
    name: "",
    authorizeCredits: false,
  };

  const transform = (bank: Bank): Bank => {
    const currentDate = new Date().toISOString();
    const firstWeekLoan = +bank.firstWeekLoan!;
    const subsequentLoan = +bank.subsequentLoan!;

    return {
      ...bank,
      id: uuid(),
      updatedAt: currentDate,
      createdAt: currentDate,
      firstWeekLoan,
      subsequentLoan,
    };
  };

  return (
    <CreateMutation
      source="banks"
      title="Create bank"
      transform={transform}
      provider={createProvider}
      defaultValue={defaultValue}
    >
      <BankFields />
    </CreateMutation>
  );
}
