"use client";

import { Client } from "@/gen/client";
import { List, LabelType } from "@/ui/components/list";

import { ClientListActions } from "@/operations/clients/list";
import { CreateClient } from "@/operations/clients/create";

import { clientProvider } from "@/providers/client-provider";

import { renderMoney } from "@/utils/money";
import { formatDate } from "@/utils/date";

export default function ClientsList() {
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
      size: "15%",
      render: (client) => formatDate(client.updatedAt!, false),
    },
    {
      label: "Month Salary",
      size: "15%",
      render: (client) => renderMoney(client.monthSalary || 0),
    },
    { label: "", component: ClientListActions, size: "25%" },
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
