import React from 'react'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { BookOpen, Calendar, CalendarCheckIcon, Car, CarFront, CloudCogIcon, Edit2Icon, GavelIcon, InboxIcon, LayoutDashboard, ListIcon, PenLine, TagIcon, UserRoundPlus, Users2Icon } from 'lucide-react'
import Link from 'next/link'


const items = [
    {
        title: "Blogs",
        url: "/blogs",
        icon: BookOpen,
        group: "blogs",
    },
    {
        title: "Add Blog",
        url: "/blogs/add-blog",
        icon: PenLine,
        group: "blogs",
    },
    {
        title: "Listings",
        url: "/listings",
        icon: Car,
        group: "listings",
    },
    {
        title: "Luxury",
        url: "/listings/luxury",
        icon: CarFront,
        group: "listings",
    },
    {
        title: "Auctions",
        url: "/listings/auctions",
        icon: GavelIcon,
        group: "listings",
    },
    {
        title: "Bids",
        url: "/listings/auctions/bids",
        icon: TagIcon,
        group: "listings",
    },
    {
        title: "Dealers",
        url: "/users",
        icon: Users2Icon,
        group: "users",
    },
    {
        title: "Managers",
        url: "/users",
        icon: UserRoundPlus,
        group: "users",
    },
    {
        title: "Pricing",
        url: "/settings",
        icon: CloudCogIcon,
        group: "settings",
    }
]


const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" variant='sidebar'>
        <SidebarHeader>
            ADMIN
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/"><LayoutDashboard /> Dashboard</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/car-hire"><CalendarCheckIcon /> Car Hire Bookings</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/search-requests"><InboxIcon /> Search Requests</Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarGroup>
                <SidebarGroupLabel>Blogs</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item: any) => (
                            <div key={item.title}>
                                {item.group == "blogs" && (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}><item.icon /> {item.title}</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </div>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
             
            <SidebarGroup>
                <SidebarGroupLabel>Listings</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item: any) => (
                            <div key={item.title}>
                                {item.group == "listings" && (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}><item.icon /> {item.title}</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </div>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            
            <SidebarGroup>
                <SidebarGroupLabel>Users</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item: any) => (
                            <div key={item.title}>
                                {item.group == "users" && (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}><item.icon /> {item.title}</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </div>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>


            <SidebarGroup>
                <SidebarGroupLabel>Settings</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item: any) => (
                            <div key={item.title}>
                                {item.group == "settings" && (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}><item.icon /> {item.title}</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </div>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

        </SidebarContent>
        <SidebarFooter>
            ADMIN
        </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar