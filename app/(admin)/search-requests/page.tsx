"use client";

import { ApiServices } from '@/lib/api-services';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const SearchRequestsPage = () => {
    const {data:session} = useSession();
    const [ searchRequests, setSearchRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async() => {
            if(!session?.accessToken) return;
            const resp = await ApiServices.get("management/search-requests/", session?.accessToken);
            setSearchRequests(resp);
        }
        fetchRequests();
    }, [session]);

    return (
        <section>
            <div className='py-10'>
                <DataTable columns={columns} data={searchRequests} />
            </div>
        </section>
    )
}

export default SearchRequestsPage