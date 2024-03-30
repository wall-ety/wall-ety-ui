import { CreateAccount } from "@/gen/client";
import { EditMutation } from "@/ui/components/mutation";
import { AccountFields } from "./fields";

import { accountProvider } from "@/providers/account-provider";

export function EditAccount({ data }: { data: CreateAccount }) {
  const updateProvider = (toSave: CreateAccount) =>
    accountProvider.saveOrUpdate([toSave]).then((response) => response[0]);

  const transform = (account: CreateAccount): CreateAccount => {
    const currentDate = new Date().toISOString();

    return {
      ...account,
      updatedAt: currentDate,
    };
  };

  return (
    <EditMutation
      source={["accounts"]}
      title={`Edit ${data.name}`}
      data={data}
      defaultValue={data}
      transform={transform}
      provider={updateProvider}
    >
      <AccountFields />
    </EditMutation>
  );
}
