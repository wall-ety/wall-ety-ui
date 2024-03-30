import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Box, Select, Text } from "@chakra-ui/react";
import { Check, Close } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Account } from "@/gen/client";
import { List, LabelType, useOrder } from "@/ui/components/list";
import { CreateAccountModal } from "@/operations/accounts/mutation";
import { AccountListActions } from "./actions";
import { FlexBox, Separator } from "@/ui/components";

import { accountProvider } from "@/providers/account-provider";

import { formatDate } from "@/utils/date";
import { clientProvider } from "@/providers/client-provider";
import { bankProvider } from "@/providers/bank-provider";

function AuthorizeCreditsShow({ data }: { data: Account }) {
  return (
    <Box sx={{ width: "10%" }}>
      {!data.authorizeCredits ? <Close /> : <Check />}
    </Box>
  );
}

export type AccountListFilter = {
  idBank?: string;
  idCient?: string;
};

export function AccountList() {
  const router = useRouter();
  const [filter, setFilter] = useState<AccountListFilter>({});

  const { handleChange, orderValue } = useOrder<Account>({
    orderBy: "updatedAt",
    order: "DESC",
  });

  const labels: LabelType<Account>[] = [
    { label: "Name", source: "name", size: "10%" },
    { label: "Bank", source: "bank.name", size: "15%" },
    { label: "Client", source: "client.firstName", size: "15%" },
    { label: "Crédits", size: "10%", component: AuthorizeCreditsShow },
    {
      label: "Updated at",
      size: "22%",
      render: (account) => formatDate(account.updatedAt!, true),
    },
    { label: "", component: AccountListActions, size: "20%" },
  ];

  return (
    <List
      labels={labels}
      source={["accounts"]}
      keys={[
        orderValue.order,
        orderValue.orderBy,
        filter.idBank,
        filter.idCient,
      ]}
      provider={() =>
        accountProvider.getAll(
          orderValue,
          filter.idCient || undefined,
          filter.idBank || undefined
        )
      }
      rowClick={(account) => router.push(`/accounts/${account.id!}`)}
      overviewProps={{
        leftButton: <CreateAccountModal />,
        content: <AccountListOverview onChange={(value) => setFilter(value)} />,
        orders: {
          current: orderValue,
          handleChange,
          queries: [
            { value: "name", label: "Account name" },
            { value: "createdAt", label: "Creation" },
            { value: "updatedAt", label: "Modification" },
          ],
        },
      }}
    />
  );
}

function AccountListOverview({
  onChange,
}: {
  onChange: Dispatch<SetStateAction<AccountListFilter>>;
}) {
  const { data: banks } = useQuery({
    queryFn: () => bankProvider.getAll({ orderBy: "name", order: "DESC" }),
    queryKey: ["banks"],
  });

  const { data: clients } = useQuery({
    queryFn: () =>
      clientProvider.getAll({ orderBy: "firstName", order: "DESC" }),
    queryKey: ["clients"],
  });

  return (
    <>
      <Separator />
      <FlexBox sx={{ gap: 2, mb: 5, width: "300px" }}>
        <Box sx={{ width: "150px" }}>
          <Text sx={{ fontSize: "14px" }}>Bank:</Text>
        </Box>
        <Select
          size="sm"
          placeholder="No filter"
          variant="filled"
          minWidth={150}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onChange((prev) => ({ ...prev, idBank: e.target.value }))
          }
        >
          {(banks || []).map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.name}
            </option>
          ))}
        </Select>
        <Box sx={{ width: "150px" }}>
          <Text sx={{ fontSize: "14px" }}>Owner:</Text>
        </Box>
        <Select
          size="sm"
          placeholder="No filter"
          variant="filled"
          minWidth={150}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onChange((prev) => ({ ...prev, idCient: e.target.value }))
          }
        >
          {(clients || []).map((client) => (
            <option key={client.id} value={client.id}>
              {client.firstName}
            </option>
          ))}
        </Select>
      </FlexBox>
      <Separator />
    </>
  );
}
