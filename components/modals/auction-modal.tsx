"use client";

import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { VehicleModel } from '@/lib/models';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ApiServices } from '@/lib/api-services';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AuctionModalProps {
    vehicle: VehicleModel;
    open: boolean;
    onClose: () => void;
}


const auctionShema = z.object({
    starting_price: z.string().min(1, "Starting price is required."),
    reserve_price: z.string().min(1, "Reserve price is required."),
    buy_now_price: z.string().min(1, "Buy now price is required."),
    start_time: z.string().min(1, "Starting time is required"),
    end_time: z.string().min(1, "Ending time is required"),
})

const AuctionModal = ({ vehicle, open, onClose } : AuctionModalProps) => {
    const {data:session} = useSession();
    const router = useRouter();

    if (!vehicle) return null;

    const form = useForm<z.infer <typeof auctionShema>>({
        resolver: zodResolver(auctionShema),
        defaultValues: {
            starting_price: "",
            reserve_price: "",
            buy_now_price: "",
            start_time: "",
            end_time: "",
        }
    });
    const { isValid, isSubmitting } = form.formState;


    const onSubmit = async(values: z.infer<typeof auctionShema>) => {

        const formData = new FormData();
        formData.append("vehicle", vehicle.listing_id);
        formData.append("starting_price", values.starting_price);
        formData.append("reserve_price", values.reserve_price);
        formData.append("buy_now_price", values.buy_now_price);
        formData.append("start_time", values.start_time);
        formData.append("end_time", values.end_time);

        if(!session?.accessToken) return;

        const resp = await ApiServices.post("management/create-auction/", session?.accessToken, formData);
        if(resp.success){
            toast.success(resp.message);
            router.push("/listings/auctions");
        } else {
            toast.error("An error occured.");
        }
    }
  
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{vehicle.year_of_make} {vehicle.make} {vehicle.model}</DialogTitle>
                    <DialogTitle className='text-orange-400 text-sm'>Auction Settings</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <FormField 
                                name="starting_price"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Starting Price</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="number"
                                                placeholder="e.g. 500000"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <FormField
                                name="reserve_price"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reserve Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="e.g. 700000"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <FormField
                                name="buy_now_price"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Buy Now Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="e.g. 1000000"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                            <div>
                                <FormField
                                    name="start_time"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Starting Time</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="datetime-local"
                                                    
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    name="end_time"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Ending Time</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="datetime-local"
                                                    
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <Button className='w-full cursor-pointer'>Submit</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AuctionModal