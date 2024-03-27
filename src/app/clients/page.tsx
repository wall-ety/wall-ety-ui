"use client"

import { Client } from "@/gen/client";

import { List, LabelType } from "@/ui/components/list";

import { clientProvider } from "@/providers/client-provider";

export default function ClientsList() {
  const labels: LabelType<Client>[] = [
    { source: "lastName", label: "LastName" },
    { source: "updatedAt", label: "Updated At" },
    { source: "birthdate", label: "Birthdate", size: 200 }
  ]

  return (
    <List
      title="Client list"
      labels={labels}
      provider={clientProvider.getAll}
    />
  )
}
