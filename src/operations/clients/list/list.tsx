import { Client } from "@/gen/client";
import { List, LabelType } from "@/ui/components/list";
import { CreateClient } from "@/operations/clients/mutation";
import { ClientListActions } from "./actions";

import { clientProvider } from "@/providers/client-provider";

import { renderMoney } from "@/utils/money";
import { formatDate, getAge } from "@/utils/date";

export function ClientList() {
  const labels: LabelType<Client>[] = [
    { source: "lastName", label: "Lastname", size: "15%" },
    { source: "firstName", label: "Firstname", size: "15%" },
    {
      label: "Birthdate",
      size: "18%",
      render: (client) =>
        `${formatDate(client.birthdate!, false)} ( ${getAge(client.birthdate!).toString()}y )`,
    },
    {
      label: "Month Salary",
      size: "15%",
      render: (client) => renderMoney(client.monthSalary || 0),
    },
    {
      label: "Updated at",
      size: "22%",
      render: (client) => formatDate(client.updatedAt!, true),
    },
    { label: "", component: ClientListActions, size: "15%" },
  ];

  return (
    <List
      labels={labels}
      source="clients"
      title="Create client"
      provider={clientProvider.getAll}
      overviewProps={{
        content: <CreateClient />,
      }}
    />
  );
}
