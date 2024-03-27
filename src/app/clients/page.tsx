"use client";

import { v4 as uuid } from "uuid";

import { Client } from "@/gen/client";
import { List, LabelType } from "@/ui/components/list";
import { ClientCreateFields, ClientListActions } from "@/components/clients";
import { clientProvider } from "@/providers/client-provider";
import { renderMoney } from "@/utils/money";
import { formatDate } from "@/utils/date";

export default function ClientsList() {
  const labels: LabelType<Client>[] = [
    { source: "lastName", label: "Lastname", size: "15%" },
    { source: "firstName", label: "Firstname", size: "15%" },
    { label: "Created at", size: "15%", render: (client) => formatDate(client.createdAt!, false) },
    { label: "Updated at", size: "15%", render: (client) => formatDate(client.updatedAt!, false) },
    { label: "Month Salary", size: "15%", render: (client) => renderMoney(client.monthSalary || 0) },
    { label: "", component: ClientListActions, size: "25%" }
  ];

  const createProvider = (toSave: Client) => clientProvider
    .saveOrUpdate([toSave])
    .then((response) => response[0]);

  const createDefaultValue: Client = {
    firstName: "",
    lastName: "",
    birthdate: "",
    monthSalary: 0,
  };

  const createTransform = (client: Client): Client => {
    const currentDate = new Date().toISOString()
    return { ...client, createdAt: currentDate, updatedAt: currentDate, id: uuid() }
  }

  return (
    <List
      createProps={{
        source: "clients",
        title: "Create Client",
        defaultValue: createDefaultValue,
        provider: createProvider,
        transform: createTransform,
        content: <ClientCreateFields />
      }}
      title="Client list"
      labels={labels}
      provider={clientProvider.getAll}
    />
  );
}
