"use client";

import { useEffect, useState } from "react";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { Box, Button, Heading } from "@chakra-ui/react";
import { AttachMoney } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ListLoading } from "@/ui/components/list/list-loading";
import { BoxCard, FlexBox, Separator } from "@/ui/components";
import {
  Account,
  ApiErrorResponse,
  BalanceInfo,
  CategoryStatement,
} from "@/gen/client";
import { TransactionList } from "@/operations/transactions/list";
import { accountProvider } from "@/providers/account-provider";
import { useToast } from "@/ui/hooks";
import { formatDate } from "@/utils/date";
import { TransferList } from "@/operations/transfers/list";

ChartJS.register(ArcElement, Tooltip, Legend);

export function CurrentBalanceShow({ accountId }: { accountId: string }) {
  const queryClient = useQueryClient();
  const { data: currentBalance, isPending } = useQuery<
    BalanceInfo,
    ApiErrorResponse,
    BalanceInfo
  >({
    queryFn: () => accountProvider.getCurrentBalance(accountId),
    queryKey: ["balances", "transactions", "transfers"],
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: ["balances", "transactions", "transfers"],
      });
    };
  }, [queryClient]);

  return (
    <Box>
      <Heading sx={{ mb: 5, fontSize: "15px", opacity: 0.8 }}>
        Balance last modification:{" "}
        <span style={{ fontWeight: "normal" }}>
          {!isPending && formatDate(currentBalance?.balance?.createdAt!)}
        </span>
      </Heading>
      <FlexBox sx={{ gap: 5, mt: 2 }}>
        <BoxCard
          icon={<AttachMoney sx={{ color: "#e68225" }} />}
          label={{
            content: "Current balance",
          }}
          value={{
            content: currentBalance?.balance?.amount!,
          }}
        />
        <BoxCard
          icon={<AttachMoney sx={{ color: "#46e09d" }} />}
          label={{
            content: "Loan",
          }}
          value={{
            content: currentBalance?.loan!,
          }}
        />
        <BoxCard
          icon={<AttachMoney sx={{ color: "#51e85e" }} />}
          label={{
            content: "Loan intereset",
          }}
          value={{
            content: currentBalance?.loanInterest!,
          }}
        />
      </FlexBox>
    </Box>
  );
}

enum ViewType {
  TRANSACTIONS,
  TRANSFER,
}

export default function AccountShow({
  params: { accountId },
}: {
  params: { accountId: string };
}) {
  const [test, setTetst] = useState(false);
  const [view, setView] = useState<ViewType>(ViewType.TRANSACTIONS);
  const router = useRouter();
  const toast = useToast();
  const {
    data: account,
    isPending,
    isError,
    error,
  } = useQuery<Account, ApiErrorResponse, Account>({
    queryFn: () => accountProvider.getById(accountId),
    queryKey: [accountId],
  });

  if (isError) {
    toast({
      title: "Account not found",
      description: error.message,
      status: "error",
    });
    router.push("/accounts");
  }
  const isTransfer = view === ViewType.TRANSFER;

  if (isPending) {
    return <ListLoading />;
  }

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Heading sx={{ fontSize: "1.6rem" }}>
          Account of {account?.client?.firstName}
        </Heading>
      </Box>
      <Heading sx={{ fontSize: "15px", opacity: 0.8, mb: 1 }}>
        Bank:{" "}
        <span style={{ fontWeight: "normal" }}>{account?.bank?.name}</span>
      </Heading>
      <Heading sx={{ fontSize: "15px", opacity: 0.8, mb: 5 }}>
        Owner:{" "}
        <span style={{ fontWeight: "normal" }}>
          {account?.client?.firstName} {account?.client?.lastName}
        </span>
      </Heading>
      <FlexBox sx={{ gap: 5, mb: 10 }}>
        <PieChart accountId={accountId} />
        <CurrentBalanceShow accountId={accountId} />
        <Separator />
      </FlexBox>
      <FlexBox sx={{ gap: 3, mb: 5, pb: 4, borderBottom: "1px solid #b3afaf" }}>
        <Button
          size="sm"
          disabled={!isTransfer}
          variant={!isTransfer ? "solid" : "ghost"}
          colorScheme={!isTransfer ? "green" : undefined}
          onClick={() => setView(ViewType.TRANSACTIONS)}
        >
          Transactions
        </Button>
        <Heading sx={{ fontSize: "16px" }}>/</Heading>
        <Button
          size="sm"
          disabled={isTransfer}
          variant={isTransfer ? "solid" : "ghost"}
          colorScheme={isTransfer ? "green" : undefined}
          onClick={() => setView(ViewType.TRANSFER)}
        >
          Transfers
        </Button>
      </FlexBox>
      {!isTransfer ? (
        <TransactionList
          refetch={() => setTetst(!test)}
          accountId={accountId}
        />
      ) : (
        <TransferList refetch={() => setTetst(!test)} accountId={accountId} />
      )}
    </>
  );
}

const getBgColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

function PieChart({ accountId }: { accountId: string }) {
  const { data: statements, isPending } = useQuery({
    queryFn: () =>
      accountProvider.getStatements(
        accountId,
        "2024-02-02T18:55:46.457Z",
        new Date().toISOString()
      ),
    queryKey: ["statemens"],
    refetchOnReconnect: true,
    refetchOnMount: true,
  });

  if (isPending || !statements) {
    return <ListLoading />;
  }

  if (statements.filter((el) => el.amount !== 0).length === 0) {
    return null;
  }

  const colors = statements
    .filter((el) => el.amount !== 0)
    .map(() => getBgColor());

  const dataToShow = {
    labels: statements?.filter((el) => el.amount !== 0).map((el) => el.name),
    datasets: [
      {
        label: "# money",
        data: statements.filter((el) => el.amount !== 0).map((el) => el.amount),
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ width: "350px" }}>
      {/*@ts-ignore*/}
      <Pie data={dataToShow} />
    </Box>
  );
}
