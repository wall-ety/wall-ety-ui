import { Client } from "@/gen/client";
import { List, LabelType, useOrder } from "@/ui/components/list"; import { CreateClient } from "@/operations/clients/mutation";
import { ClientListActions } from "./actions";

import { clientProvider } from "@/providers/client-provider";

import { renderMoney } from "@/utils/money";
import { formatDate, getAge } from "@/utils/date";

export function ClientList() {
  const { handleChange, orderValue } = useOrder<Client>({
    orderBy: "updatedAt",
    order: "DESC"
  });

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
      keys={[orderValue.order, orderValue.orderBy]}
      provider={() => clientProvider.getAll(orderValue)}
      overviewProps={{
        orders: {
          current: orderValue,
          handleChange,
          queries: [
            { value: "updatedAt", label: "Modification" },
            { value: "createdAt", label: "Creation" },
            { value: "lastName", label: "Last name" },
            { value: "firstName", label: "First name" },
            { value: "monthSalary", label: "Month salary" },
            { value: "birthdate", label: "Birthdate" }
          ]
        }
      }}
    />
  );
}
