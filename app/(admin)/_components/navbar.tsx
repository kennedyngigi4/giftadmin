"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';


const Navbar = () => {
  return (
    <div className='h-[40px] shadow-sm w-full min-w-lg'>
        <SidebarTrigger />
    </div>
  )
}

export default Navbar