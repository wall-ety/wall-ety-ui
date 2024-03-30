import { Client } from "@/gen/client";
import { EditMutation } from "@/ui/components/mutation";
import { ClientFields } from "./fields";

import { clientProvider } from "@/providers/client-provider";
import { dateToISO } from "@/utils/date";

export function EditClient({ data }: { data: Client }) {
  const updateProvider = (toSave: Client) =>
    clientProvider.saveOrUpdate([toSave]).then((response) => response[0]);

  const transform = (client: Client): Client => {
    const currentDate = new Date().toISOString();
    const monthSalary = +client.monthSalary!;

    return {
      ...client,
      updatedAt: currentDate,
      monthSalary,
      birthdate: dateToISO(client.birthdate!),
    };
  };

  return (
    <EditMutation
      source={["clients"]}
      title={`Edit ${data.firstName}`}
      data={data}
      defaultValue={data}
      transform={transform}
      provider={updateProvider}
    >
      <ClientFields />
    </EditMutation>
  );
}
