"use client";

import React, { useEffect, useState } from 'react';
import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from './_components/navbar';

const AdminLayout = ({ children } : Readonly<{ children: React.ReactNode}>) => {

  const { data: session, status } = useSession();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else {
      setIsReady(true);
    }
  }, [status, router]);

  if (!isReady) {
    return <div className="flex w-full h-screen justify-center items-center">
      <Image src="/animations/car.gif" alt="Loader" width={100} height={100} />
    </div>;
  }

  return (
    <SidebarProvider className='flex'>
      <AppSidebar />
      <main className='flex-1'>
        <Navbar />
        <div className='px-5 pt-2'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}

export default AdminLayout