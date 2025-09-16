"use client";

import { ApiServices } from '@/lib/api-services';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

const ListingsPage = () => {

  const {data:session} = useSession();
  const [allListings, setAllListings] = useState<any>([]);


  useEffect(() => {
    const fetchListings = async() => {
      if(!session?.accessToken) return;
      const response = await ApiServices.get("management/listings?type=all", session?.accessToken);
      console.log(response);
      setAllListings(response);
    }
    fetchListings();
  }, [session]);

  return (
    <section className="pb-16 pt-5">
      <DataTable columns={columns} data={allListings} />
    </section>
  )
}

export default ListingsPage