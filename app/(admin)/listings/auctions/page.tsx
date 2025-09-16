"use client";

import { ApiServices } from '@/lib/api-services';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { DataTable } from '../_components/data-table';
import { columns } from '../_components/columns';

const AuctionsPage = () => {
  const {data:session} = useSession();
  const [ auctionListings, setAuctionListings] = useState<any>([]);
    
    
  useEffect(() => {
    const fetchListings = async() => {
      if(!session?.accessToken) return;
      const response = await ApiServices.get("management/listings?type=auction", session?.accessToken);
      setAuctionListings(response);
    }
    fetchListings();
  }, [session]);

  return (
    <section className="pb-16 pt-5">
      <DataTable columns={columns} data={auctionListings} />
    </section>
  )
}

export default AuctionsPage