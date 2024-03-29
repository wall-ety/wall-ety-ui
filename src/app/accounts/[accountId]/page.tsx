"use client";

import { Box, Heading } from "@chakra-ui/react";
import { AccountBalance } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ListLoading } from "@/ui/components/list/list-loading";
import { BoxCard, FlexBox, Separator } from "@/ui/components";
import { Account, ApiErrorResponse, BalanceInfo } from "@/gen/client";
import { accountProvider } from "@/providers/account-provider";
import { useToast } from "@/ui/hooks";
import { formatDate } from "@/utils/date";

export function CurrentBalanceShow({ accountId }: { accountId: string }) {
  const { data: currentBalance, isPending } = useQuery<BalanceInfo, ApiErrorResponse, BalanceInfo>({
    queryFn: () => accountProvider.getCurrentBalance(accountId),
    queryKey: [accountId]
  });

  return (
    <Box sx={{mt: 5}}>
      <Heading sx={{ fontSize: "15px", opacity: .8 }}>
        Balance last modification: <span style={{ fontWeight: "normal" }}>{!isPending && formatDate(currentBalance?.balance?.createdAt!)}</span>
      </Heading>
      <FlexBox sx={{ gap: 5, mt: 2 }}>
        <BoxCard
          icon={<AccountBalance sx={{ color: "#e68225" }} />}
          label={{
            content: "Current balance"
          }}
          value={{
            content: currentBalance?.balance?.amount!
          }}
        />
        <BoxCard
          icon={<AccountBalance sx={{ color: "#46e09d" }} />}
          label={{
            content: "Loan"
          }}
          value={{
            content: currentBalance?.loan!,
          }}
        />
        <BoxCard
          icon={<AccountBalance sx={{ color: "#51e85e" }} />}
          label={{
            content: "Loan intereset"
          }}
          value={{
            content: currentBalance?.loanInterest!,
          }}
        />
      </FlexBox>
    </Box>
  )
}

export default function AccountShow({ params: { accountId } }: { params: { accountId: string } }) {
  const router = useRouter();
  const toast = useToast();
  const { data: account, isPending, isError, error } = useQuery<Account, ApiErrorResponse, Account>({
    queryFn: () => accountProvider.getById(accountId),
    queryKey: [accountId]
  });

  if (isError) {
    toast({
      title: "Account not found",
      description: error.message,
      status: "error"
    })
    router.push("/accounts");
  }

  return (
    isPending ? <ListLoading /> : (
      <>
        <Box>
          <Heading sx={{ fontSize: "1.6rem" }}>
            Account {account?.name}
          </Heading>
        </Box>
        <FlexBox sx={{ gap: 2 }}>
          <CurrentBalanceShow accountId={accountId} />
          <Separator />
        </FlexBox>
      </>
    )
  )
}
