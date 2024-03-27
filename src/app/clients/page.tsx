"use client";

import { Button } from "@chakra-ui/react";
import { Client } from "@/gen/client";
import { List, LabelType } from "@/ui/components/list";
import { FlexBox } from "@/ui/components";
import { Edit as EditIcon } from "@mui/icons-material";
import { clientProvider } from "@/providers/client-provider";
import { renderMoney } from "@/utils/money";
import { formatDate } from "@/utils/date";

function ClientListActions({ data }: { data: Client }) {
  return (
    <FlexBox
      sx={{ display: "flex", alignItems: "centrer", justifyContent: "end", width: "25%", gap: 4, pe: 5 }}
    >
      <Button
        leftIcon={<EditIcon sx={{ fontSize: "15px" }} />}
        colorScheme="yellow"
        size="sm"
        fontSize="14px"
      >
        Edit
      </Button>
    </FlexBox>
  );
}

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

  return (
    <List
      overviewProps={{
        source: "clients",
        createProvider,
        title: "Create Client",
        createContent: <p>Hello from list of clients</p>,
      }}
      title="Client list"
      labels={labels}
      provider={clientProvider.getAll}
    />
  );
}
