"use client";

import { ApiServices } from '@/lib/api-services';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const CarHire = () => {
    const {data:session} = useSession();
    const [ hireBookings, setHireBookings] = useState([]);

    useEffect(() => {
        const fetchHires = async() => {
            if(!session?.accessToken) return;
            const resp = await ApiServices.get("management/hire-bookings/", session?.accessToken);
            setHireBookings(resp);
        }
        fetchHires();
    }, [session])
  return (
    <section>
        <div className='py-10'>
            <DataTable columns={columns} data={hireBookings} />
        </div>
    </section>
  )
}

export default CarHire