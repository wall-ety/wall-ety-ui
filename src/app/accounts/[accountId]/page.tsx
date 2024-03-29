"use client";

import { useState } from "react";

import { Box, Button, Heading } from "@chakra-ui/react";
import { AttachMoney } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ListLoading } from "@/ui/components/list/list-loading";
import { BoxCard, FlexBox, Separator } from "@/ui/components";
import { Account, ApiErrorResponse, BalanceInfo } from "@/gen/client";
import { TransactionList } from "@/operations/transactions/list";
import { accountProvider } from "@/providers/account-provider";
import { useToast } from "@/ui/hooks";
import { formatDate } from "@/utils/date";

export function CurrentBalanceShow({ accountId }: { accountId: string }) {
  const { data: currentBalance, isPending } = useQuery<
    BalanceInfo,
    ApiErrorResponse,
    BalanceInfo
  >({
    queryFn: () => accountProvider.getCurrentBalance(accountId),
    queryKey: [accountId, "balances"],
  });

  return (
    <Box sx={{ mt: 5 }}>
      <Heading sx={{ fontSize: "15px", opacity: 0.8 }}>
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
      <Box>
        <Heading sx={{ fontSize: "1.6rem" }}>Account {account?.name}</Heading>
      </Box>
      <FlexBox sx={{ gap: 2, mb: 10 }}>
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
      <TransactionList accountId={accountId} />
    </>
  );
}
