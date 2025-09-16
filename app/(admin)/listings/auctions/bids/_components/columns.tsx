"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { toast } from "sonner"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Bid = {
    id: string
    bidder: string
    bidder_phone: string
    auction: string
    amount: string
    timestamp: string
    reserve_price: string
}

export const columns: ColumnDef<Bid>[] = [
    {
        accessorKey: "timestamp",
        header: "Date",
        cell: ({ row }) => {
            const formattedDate = row?.original.timestamp;
            return (
                <p>{new Date(formattedDate).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric"})}</p>
            );
        }
    },
    {
        accessorKey: "auction",
        header: "Auction",
    },
    {
        accessorKey: "bidder",
        header: "Bidder",
        cell: ({row}) => {
            const [isCopied, setIscopied] = useState(false); 
            const bidder = row?.original?.bidder;
            const phone = row?.original?.bidder_phone;

            const handleCopy = async() => {
                try{
                    await navigator.clipboard.writeText(phone);
                    setIscopied(true);
                    if(isCopied){
                        toast.success("Phone Copied.");
                    }
                } catch(e){
                    toast.error("An error occured.");
                }
            }
            return(
                <p onClick={handleCopy}>{bidder}</p>
            )
        }
    },
    {
        accessorKey: "reserve_price",
        header: "Reserve Price",
        cell: ({row}) => {
            const formattedPrice = row?.original;
            return(
                <p>KES {parseInt(formattedPrice.reserve_price).toLocaleString()}</p>
            );
        }
    },
    {
        accessorKey: "amount",
        header: "Bid Amount",
        cell: ({ row }) => {
            const formattedPrice = row?.original;
            return (
                <p>KES {parseInt(formattedPrice.amount).toLocaleString()}</p>
            );
        }
    }
    
]