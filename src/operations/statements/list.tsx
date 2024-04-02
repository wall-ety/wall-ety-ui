import { Statement } from "@/gen/client";
import { List, LabelType, useOrder } from "@/ui/components/list";

import { accountProvider } from "@/providers/account-provider";

import { renderMoney } from "@/utils/money";
import { formatDate } from "@/utils/date";
import Link from "next/link";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

function SelectDate(props: any) {
  const { from, to, update } = props;
  return (
    <Box sx={{ my: 5, display: "flex", gap: 2, flexDirection: "column" }}>
      <Text>From</Text>
      <Input
        type="datetime-local"
        name="from"
        placeholder="From"
        value={from}
        onChange={update}
      />
      <Text>To</Text>
      <Input
        type="datetime-local"
        name="to"
        placeholder="to"
        value={to}
        onChange={update}
      />
    </Box>
  );
}

export function StatementList({ accountId }: { accountId: string }) {
  const [range, setRange] = useState({
    from: "2000-01-01",
    to: "2025-01-01",
  });

  const update = (event: ChangeEvent<HTMLInputElement>) => {
    setRange((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const labels: LabelType<Statement>[] = [
    { source: "ref", label: "Ref", size: "20%" },
    {
      label: "Credits",
      render: (statement) => renderMoney(statement.debits!),
      size: "15%",
    },
    {
      label: "Debits",
      render: (statement) => renderMoney(statement.credits!),
      size: "15%",
    },
    {
      label: "date",
      size: "18%",
      render: (statements) => formatDate(statements.date!),
    },
    {
      label: "Balance",
      size: "15%",
      render: (statements) => renderMoney(statements.balance || 0),
    },
  ];

  return (
    <List
      labels={labels}
      source={["statements"]}
      provider={() =>
        accountProvider.getBankStatements(accountId, range.from, range.to)
      }
      keys={[range.from, range.to]}
      overviewProps={{
        content: <SelectDate update={update} {...range} />,
        leftButton: (
          <Link href={`/accounts/${accountId}`}>
            <Button size="sm" px={5} colorScheme="blue">
              Back
            </Button>
          </Link>
        ),
      }}
    />
  );
}
