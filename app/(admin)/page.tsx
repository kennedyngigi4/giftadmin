"use client";

import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ApiServices } from '@/lib/api-services';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const Page = () => {

  const {data:session} = useSession();
  const [usersCount, setUsersCount] = useState(0);
  const [listingsCount, setListingsCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  
  useEffect(() => {
    const fetchAnalytics = async() => {
      if(!session?.accessToken) return;

      const resp = await ApiServices.get("management/dashboard/", session?.accessToken);
      console.log(resp);
      console.log("Testing ......");
      setUsersCount(resp.users);
      setListingsCount(resp.listings);
      setBookingsCount(resp.bookings);
      setRequestCount(resp.requests);
    };
    fetchAnalytics();
  }, [session]);

  return (
    <section>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-5 py-8">
        <div>
          <Card>
            <CardContent>
              <CardTitle className='pb-4'>{usersCount}</CardTitle>
              <CardDescription>Registered Users</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent>
              <CardTitle className='pb-4'>{listingsCount}</CardTitle>
              <CardDescription>Listings</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent>
              <CardTitle className='pb-4'>{bookingsCount}</CardTitle>
              <CardDescription>Car Hire Bookings</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent>
              <CardTitle className='pb-4'>{requestCount}</CardTitle>
              <CardDescription>Car Search </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Page