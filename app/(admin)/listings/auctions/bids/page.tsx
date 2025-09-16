"use client";

import React, { useEffect, useState } from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { useSession } from 'next-auth/react';
import { ApiServices } from '@/lib/api-services';

const BidsPage = () => {
    const {data:session} = useSession();
    const [bids, setBids] = useState([]);

    useEffect(() => {
        const fetchBids = async() => {
            if(!session?.accessToken) return;
            const resp = await ApiServices.get("management/bids/", session?.accessToken);
            setBids(resp);
        }
        fetchBids();
    }, [session]);

    return (
        <section>
            <div>
                <DataTable columns={columns} data={bids} />
            </div>
        </section>
    )
}

export default BidsPage