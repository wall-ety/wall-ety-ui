import { Client } from "@/gen/client";
import { List, LabelType } from "@/ui/components/list";
import { CreateClient } from "@/operations/clients/mutation";
import { ClientListActions } from "./actions";

import { clientProvider } from "@/providers/client-provider";

import { renderMoney } from "@/utils/money";
import { formatDate } from "@/utils/date";

export function ClientList() {
  const labels: LabelType<Client>[] = [
    { source: "lastName", label: "Lastname", size: "15%" },
    { source: "firstName", label: "Firstname", size: "15%" },
    {
      label: "Created at",
      size: "15%",
      render: (client) => formatDate(client.createdAt!, false),
    },
    {
      label: "Updated at",
      size: "25%",
      render: (client) => formatDate(client.updatedAt!, true),
    },
    {
      label: "Month Salary",
      size: "15%",
      render: (client) => renderMoney(client.monthSalary || 0),
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
