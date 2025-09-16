"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Bookings = {
    id: string,
    fullname: string, 
    phone: string, 
    occasion: string, 
    vehicle: string, 
    occasion_date: string, 
    pickup_time: string,
    pickup_location: string, 
    additionals: string, 
    status: string, 
    created_at: string
}

export const columns: ColumnDef<Bookings>[] = [
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            const dateCreated = new Date(row.original.created_at).toLocaleDateString("en-us", {
                year: "numeric", month: "short", day: "numeric"
            });

            return(
                <p>{dateCreated}</p>
            )
        }
    },
    {
        accessorKey: "fullname",
        header: "Full Name",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "occasion_date",
        header: "Date",
    },
    {
        accessorKey: "pickup_time",
        header: "Pickup Time",
    },
    {
        accessorKey: "pickup_location",
        header: "Pickup Location",
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
]