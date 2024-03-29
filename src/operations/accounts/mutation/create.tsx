import { v4 as uuid } from "uuid";

import { Account, CreateAccount } from "@/gen/client";
import { CreateMutation } from "@/ui/components/mutation";
import { AccountFields } from "./fields";

import { accountProvider } from "@/providers/account-provider";

export function CreateAccountModal() {
  const createProvider = (toSave: Account) =>
    accountProvider.saveOrUpdate([toSave]).then((response) => response[0]);

  const defaultValue: CreateAccount = {
    id: uuid(),
    name: "",
    idBank: "",
    idClient: "",
    //wrong docs
    /*@ts-ignore*/
    authorizeCredits: false,
  };

  const transform = (account: CreateAccount): CreateAccount => {
    const currentDate = new Date().toISOString();
    return {
      ...account,
      id: uuid(),
      updatedAt: currentDate,
      createdAt: currentDate,
    };
  };

  return (
    <CreateMutation
      source="accounts"
      title="Create account"
      transform={transform}
      provider={createProvider}
      defaultValue={defaultValue}
    >
      <AccountFields />
    </CreateMutation>
  );
}
