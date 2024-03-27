import { v4 as uuid } from "uuid";

import { Client } from "@/gen/client";
import { Create } from "@/ui/components/create";
import { clientProvider } from "@/providers/client-provider";
import { CreateClientFields } from "./create-fields";

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
    return { ...client, createdAt: currentDate, updatedAt: currentDate, id: uuid() }
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


