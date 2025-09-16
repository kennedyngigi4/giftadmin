"use client"

import { VehicleModel } from "@/lib/models"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AuctionModal from "@/components/modals/auction-modal";
import { useState } from "react";
import { ApiServices } from "@/lib/api-services";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const columns: ColumnDef<VehicleModel>[] = [
    {
        accessorKey: "",
        header: "Car",
        cell: ({row}) => {
            const car = row.original;
            return (
                <div className="flex space-x-2">
                    {car.images.length > 0 ? (
                        <Image src={`http://127.0.0.1:8000${car?.images[0]?.image}`} alt="" width={70} height={70} />
                    ) : (
                        <p className="text-red-500 text-xs">No image</p>
                    )}
                    <div>
                        {car?.year_of_make} {car?.make} {car?.model}

                    </div>
                </div>
            );
        }
    },
    
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            const price = row?.original.price;
            return(
                <p>KES {parseInt(price).toLocaleString()}</p>
            );
        }
    },
    {
        accessorKey: "vehicle_type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Vehicle Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "dealer",
        accessorFn: (row) => row?.dealer?.name,
        header: "Sold By",
        cell: ({row}) => {
            const dealer = row?.original?.dealer?.name;
            return(
                <p>{dealer}</p>
            )
        }
    },
    {
        id: "clicks",
        accessorKey: "clicks",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Clicks
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            const clicks = row?.original?.clicks
            return(
                <p className="text-center">{clicks}</p>
            );
        }
    },
    {
        accessorKey: "",
        header: "Action",
        cell: ({ row }) => {
            const listing = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(listing.dealer.phone)}
                        >
                            Copy Contact
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Seller</DropdownMenuItem>
                        <DropdownMenuItem>View listing details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    {
        accessorKey: "display_type",
        header: "Home Category",
        cell: ({row}) => {
            const vehicle = row?.original;
            const [open, setOpen] = useState(false);
            const { data:session} = useSession();
            const router = useRouter();

            const handleChange = async (value: string) => {
                if(!session?.accessToken) return; 

                if(value === "auction"){
                    setOpen(true);
                } else {
                    const formData = new FormData();
                    formData.append("display_type", value);
                    const resp = await ApiServices.patch(`management/vehicle-update/${vehicle?.listing_id}/`, session?.accessToken, formData);
                    if(resp.success){
                        toast.success(resp.message);
                        router.push("/listings/luxury");
                    }
                }
            }

            return(
                <>
                    <Select value={vehicle.display_type} onValueChange={handleChange}>
                        <SelectTrigger className="w-[50%]">
                            <SelectValue placeholder="Choose home category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Default</SelectItem>
                            <SelectItem value="auction">Auction</SelectItem>
                            <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                    </Select>

                    <AuctionModal open={open} onClose={() => setOpen(false)} vehicle={vehicle} />
                </>
            )
        }
    }
]