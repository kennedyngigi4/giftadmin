"use client";

import { ApiServices } from '@/lib/api-services';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { DataTable } from '../_components/data-table';
import { columns } from '../_components/columns';

const LuxuryPage = () => {
  const {data:session} = useSession();
  const [ luxuryListings, setLuxuryListings] = useState<any>([]);
  
  
  useEffect(() => {
    const fetchListings = async() => {
      if(!session?.accessToken) return;
      const response = await ApiServices.get("management/listings?type=luxury", session?.accessToken);
      setLuxuryListings(response);
    }
    fetchListings();
  }, [session]);

  return (
    <section className="pb-16 pt-5">
      <DataTable columns={columns} data={luxuryListings} />
    </section>
  )
}

export default LuxuryPage