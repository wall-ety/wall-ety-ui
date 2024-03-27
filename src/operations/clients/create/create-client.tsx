import { v4 as uuid } from "uuid";

import { Client } from "@/gen/client";
import { Create } from "@/ui/components/create";
import { CreateClientFields } from "./create-fields";
import { clientProvider } from "@/providers/client-provider";
import { dateToISO } from "@/utils/date";

export function CreateClient() {
  const createProvider = (toSave: Client) => clientProvider
    .saveOrUpdate([toSave])
    .then((response) => response[0]);

  const defaultValue: Client = {
    firstName: "",
    lastName: "",
    birthdate: "",
    monthSalary: 0,
  };

  const transform = (client: Client): Client => {
    const currentDate = new Date().toISOString()
    const monthSalary = +client.monthSalary!;

    return {
      ...client,
      createdAt: currentDate,
      updatedAt: currentDate,
      monthSalary,
      birthdate: dateToISO(client.birthdate!),
      id: uuid()
    }
  }

  return (
    <Create
      source="clients"
      title="Create client"
      transform={transform}
      provider={createProvider}
      defaultValue={defaultValue}
    >
      <CreateClientFields />
    </Create>
  )
}
