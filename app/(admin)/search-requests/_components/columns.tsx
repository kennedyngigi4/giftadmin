"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Request = {
    id: string
    name: string 
    phone: string 
    make: string
    model: string
    budget: string
    notes: string
    status: string
    created_at: string
}

export const columns: ColumnDef<Request>[] = [
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({row}) => {
            const dateCreated = new Date(row?.original.created_at).toLocaleDateString("en-us", {
                year: "numeric", month: "short", day: "numeric"
            });

            return (
                <p>{dateCreated}</p>
            )
        }
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "make",
        header: "Vehicle",
        cell: ({row}) => {
            const make = String(row.getValue("make"));
            const model = row.original.model;
            const budget = row.original.budget;

            return (
                <p>{make} {model} - KES {budget}</p>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
    },
]