"use client";

import { Button, Text } from "@chakra-ui/react";
import { Client } from "@/gen/client";
import { List, LabelType } from "@/ui/components/list";
import { clientProvider } from "@/providers/client-provider";
import { renderMoney } from "@/utils/money";
import { FlexBox } from "@/ui/components";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

function MonthSalaryView({ data: client }: { data: Client }) {
  return (
    <Text sx={{ fontSize: "14px", width: "15%", textAlign: "center" }}>
      {renderMoney(client.monthSalary || 0)}
    </Text>
  );
}

function ClientListActions({ data }: { data: Client }) {
  return (
    <FlexBox
      sx={{ display: "flex", alignItems: "centrer", width: "25%", gap: 4 }}
    >
      <Button
        leftIcon={<EditIcon sx={{ fontSize: "15px" }} />}
        colorScheme="yellow"
        size="sm"
        fontSize="14px"
      >
        Edit
      </Button>
      <Button
        leftIcon={<DeleteIcon sx={{ fontSize: "15px" }} />}
        colorScheme="red"
        size="sm"
        fontSize="14px"
      >
        Delete
      </Button>
    </FlexBox>
  );
}
export default function ClientsList() {
  const labels: LabelType<Client>[] = [
    { source: "lastName", label: "Lastname", size: "15%" },
    { source: "firstName", label: "Firstname", size: "15%" },
    { source: "createdAt", label: "Created at", size: "15%" },
    { source: "updatedAt", label: "Updated at", size: "15%" },
    { label: "Month Salary", component: MonthSalaryView, size: "15%" },
    { label: "", component: ClientListActions, size: "25%" },
  ];

  return (
    <List
      title="Client list"
      labels={labels}
      provider={clientProvider.getAll}
    />
  );
}
