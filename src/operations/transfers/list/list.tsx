import { Heading, Box, Text } from "@chakra-ui/react";
import { Transfer, TransferStatus } from "@/gen/client";
import { LabelType, List, useOrder } from "@/ui/components/list";
import { ButtonModal } from "@/ui/components";
import { CreateTransfers } from "../mutation/create";
import { accountProvider } from "@/providers/account-provider";
import { formatDate } from "@/utils/date";
import { renderMoney } from "@/utils/money";

function getColors(status: TransferStatus) {
  switch (status) {
    case TransferStatus.Failed:
      return "red.500";
    case TransferStatus.Pending:
      return "yellow.500";
    case TransferStatus.Cancelled:
      return "orange.500";
    case TransferStatus.Completed:
      return "green.500";
  }
}

function TransferStatusShow({ data: transfer }: { data: Transfer }) {
  return (
    <Box sx={{ width: "10%" }}>
      <Heading sx={{ fontSize: "14px" }} color={getColors(transfer.status!)}>
        {transfer.status}
      </Heading>
    </Box>
  );
}

function ShowOneTransfer({ data: transfer }: { data: Transfer }) {
  return (
    <ButtonModal
      button={{
        label: "More info",
        props: {
          colorScheme: "blue",
        },
      }}
      modalContent={{
        props: {
          sx: {
            p: 5,
          },
        },
      }}
    >
      <Heading sx={{ fontSize: "16px", mb: 3 }}>Transfer Reason</Heading>
      <Text sx={{ fontSize: "14px" }}>{transfer.reason}</Text>
    </ButtonModal>
  );
}

export function TransferList({ accountId }: { accountId: string }) {
  const { handleChange, orderValue } = useOrder<Transfer>({
    orderBy: "effectiveDatetime",
    order: "DESC",
  });

  const labels: LabelType<Transfer>[] = [
    { label: "Status", component: TransferStatusShow, size: "10%" },
    { label: "Label", source: "label", size: "10%" },
    { label: "Category", source: "category.name", size: "10%" },
    {
      label: "Amount",
      /*@ts-ignore*/ //wrong spec
      render: (transfer) => renderMoney(transfer.amount),
      size: "15%",
    },
    {
      label: "Effective date",
      /*@ts-ignore*/ //wrong spec
      render: (transfer) => formatDate(transfer?.effectiveDatetime!),
      size: "20%",
    },
    { label: "", component: ShowOneTransfer, size: "20%" },
  ];

  return (
    <List
      labels={labels}
      source={["transactions", "balances", "tranfers"]}
      provider={() =>
        accountProvider.getTransfers(
          accountId,
          undefined,
          undefined,
          orderValue
        )
      }
      keys={[accountId, orderValue.order, orderValue.orderBy]}
      overviewProps={{
        leftButton: <CreateTransfers accounId={accountId} />,
        orders: {
          current: orderValue,
          handleChange,
          queries: [
            { value: "amount", label: "Amount" },
            { value: "effectiveDatetime", label: "Effective Date" },
            { value: "label", label: "Label" },
          ],
        },
      }}
    />
  );
}
