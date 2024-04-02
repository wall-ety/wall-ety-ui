import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heading, Box, Text, Button, Select } from "@chakra-ui/react";
import {
  ApiErrorResponse,
  Transfer,
  TransferDirection,
  TransferStatus,
} from "@/gen/client";
import { LabelType, List, useOrder } from "@/ui/components/list";
import { ButtonModal, FlexBox, Separator } from "@/ui/components";
import { CreateTransfers } from "../mutation/create";
import { AxiosError } from "axios";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { accountProvider } from "@/providers/account-provider";
import { formatDate } from "@/utils/date";
import { renderMoney } from "@/utils/money";
import { useToast } from "@/ui/hooks";

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

function ShowOneTransfer({
  refetch,
  data: transfer,
}: {
  refetch: () => void;
  data: Transfer;
}) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<
    string,
    AxiosError<ApiErrorResponse>,
    string
  >({
    mutationFn: (id: string) => accountProvider.cancelTransfer(id),
    onError: (error) => {
      toast({
        title: error!.response?.data.message,
        status: "error",
        description: `Exit code with ${error!.response?.data?.code}`,
      });
    },
    onSuccess: () => {
      queryClient.clear();
      toast({
        title: "Transfer cancelled by success",
        description: "Exit code with 200",
      });
      refetch();
    },
  });

  return (
    <FlexBox sx={{ width: "35%", gap: 4, justifyContent: "end", pr: 5 }}>
      {transfer.status === TransferStatus.Pending && (
        <Button
          onClick={() => mutate(transfer.id!)}
          disabled
          isLoading={isPending}
          size="sm"
          colorScheme="red"
        >
          Cancel
        </Button>
      )}
      <ButtonModal
        button={{
          label: "More info",
          props: {
            colorScheme: "blue",
            sx: { py: 2 },
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
    </FlexBox>
  );
}

export function TransferList({
  accountId,
  refetch,
}: {
  refetch: () => void;
  accountId: string;
}) {
  const [filter, setFilter] = useState<TransferFilter>({
    direction: TransferDirection.All,
    status: undefined,
  });

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
      render: (transfer) => renderMoney(transfer.amount!),
      size: "15%",
    },
    {
      label: "Effective date",
      render: (transfer) => formatDate(transfer?.effectiveDatetime!),
      size: "20%",
    },
    {
      label: "",
      component: ({ data }) => (
        <ShowOneTransfer refetch={refetch} data={data} />
      ),
      size: "35%",
    },
  ];

  return (
    <List
      labels={labels}
      source={["balances", "transactions", "transfers"]}
      provider={() =>
        accountProvider.getTransfers(
          accountId,
          filter.direction,
          filter.status,
          orderValue
        )
      }
      keys={[
        accountId,
        orderValue.order,
        orderValue.orderBy,
        filter.direction,
        filter.status,
      ]}
      overviewProps={{
        leftButton: <CreateTransfers refetch={refetch} accounId={accountId} />,
        content: <TransferListOverview onChange={setFilter} />,
        orders: {
          current: orderValue,
          handleChange,
          queries: [
            { value: "amount", label: "Amount" },
            { value: "effectiveDatetime", label: "Effective Date" },
            { value: "label", label: "Label" },
            { value: "createdAt", label: "Creation" },
          ],
        },
      }}
    />
  );
}

type TransferFilter = {
  status?: TransferStatus;
  direction?: TransferDirection;
};

function TransferListOverview({
  onChange,
}: {
  onChange: Dispatch<SetStateAction<TransferFilter>>;
}) {
  const directionOptions = [
    { label: "IN", value: TransferDirection.In },
    { label: "OUT", value: TransferDirection.Out },
    { label: "ALL", value: TransferDirection.All },
  ];

  const statusOptions = [
    { label: "Failed", value: TransferStatus.Failed },
    { label: "Completed", value: TransferStatus.Completed },
    { label: "Cancelled", value: TransferStatus.Cancelled },
    { label: "Pending", value: TransferStatus.Pending },
  ];

  return (
    <>
      <Separator />
      <FlexBox sx={{ gap: 2, mb: 5, width: "300px" }}>
        <Box sx={{ width: "150px" }}>
          <Text sx={{ fontSize: "14px" }}>Status: </Text>
        </Box>
        <Select
          size="sm"
          placeholder="No filter"
          variant="filled"
          minWidth={150}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onChange((prev) => ({
              ...prev,
              status: e.target.value as TransferStatus,
            }))
          }
        >
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </Select>
        <Box sx={{ width: "150px" }}>
          <Text sx={{ fontSize: "14px" }}>Direction: </Text>
        </Box>
        <Select
          size="sm"
          variant="filled"
          minWidth={150}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onChange((prev) => ({
              ...prev,
              direction: e.target.value as TransferDirection,
            }))
          }
        >
          {directionOptions.map((direction) => (
            <option key={direction.value} value={direction.value}>
              {direction.label}
            </option>
          ))}
        </Select>
      </FlexBox>
      <Separator />
    </>
  );
}
