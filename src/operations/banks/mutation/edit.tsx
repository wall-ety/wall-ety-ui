import { Bank } from "@/gen/client";
import { EditMutation } from "@/ui/components/mutation";
import { BankFields } from "./fields";

import { bankProvider } from "@/providers/bank-provider";

export function EditBank({ data }: { data: Bank }) {
  const updateProvider = (toSave: Bank) =>
    bankProvider.saveOrUpdate([toSave]).then((response) => response[0]);

  const transform = (bank: Bank): Bank => {
    const currentDate = new Date().toISOString();
    const firstWeekLoan = +bank.firstWeekLoan!;
    const subsequentLoan = +bank.subsequentLoan!;

    return {
      ...bank,
      updatedAt: currentDate,
      firstWeekLoan,
      subsequentLoan,
    };
  };

  return (
    <EditMutation
      source={["banks"]}
      title={`Edit ${data.name}`}
      data={data}
      defaultValue={data}
      transform={transform}
      provider={updateProvider}
    >
      <BankFields />
    </EditMutation>
  );
}
