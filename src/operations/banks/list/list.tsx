import { Box } from "@chakra-ui/react";
import { Check, Close } from "@mui/icons-material";

import { Bank } from "@/gen/client";
import { List, LabelType } from "@/ui/components/list";
import { CreateBank } from "@/operations/banks/mutation";
import { BankListActions } from "./actions";

import { bankProvider } from "@/providers/bank-provider";

import { formatDate } from "@/utils/date";

function AuthorizeCreditsShow({ data }: { data: Bank }) {
  return (
    <Box sx={{ width: "10%" }}>
      {!data.authorizeCredits ? <Close /> : <Check />}
    </Box>
  );
}

export function BankList() {
  const labels: LabelType<Bank>[] = [
    { source: "name", label: "Name", size: "15%" },
    {
      label: "F. Loan",
      size: "10%",
      render: (bank) => `${bank.firstWeekLoan} %`,
    },
    {
      label: "S. Loan",
      size: "10%",
      render: (bank) => `${bank.subsequentLoan} %`,
    },
    { label: "Crédits", size: "10%", component: AuthorizeCreditsShow },
    {
      label: "Updated at",
      size: "22%",
      render: (bank) => formatDate(bank.updatedAt!, true),
    },
    { label: "", component: BankListActions, size: "20%" },
  ];

  return (
    <List
      labels={labels}
      source="banks"
      title="Create bank"
      provider={bankProvider.getAll}
      overviewProps={{
        content: <CreateBank />,
      }}
    />
  );
}
