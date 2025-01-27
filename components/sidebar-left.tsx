"use client"

import * as React from "react"
import {
  Home,
  Inbox,
  ListChecks,
  LogOutIcon,
  MoveDown,
  MoveUpIcon,
  Settings2,
  Sparkles,
  Wallet,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavBypass from "./nav-bypass"
import { useTransactionModal } from "@/hooks/use-transaction-modal"
import { CreateTransactionForm } from "./form/create-transaction-form"
import Logo from "./logo/logo"

// This is sample data.
const data = {
  teams: [
    {
      name: "Bujet",
      logo:  Wallet,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: false,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: Sparkles,
      isActive: false,
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: MoveUpIcon,
      isActive: false,
    },
    {
      title: "Income",
      url: "/income",
      icon: MoveDown,
      badge: "10",
      isActive: false,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: ListChecks,
      badge: "10",
      isActive: false,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Logout",
      url: "#",
      icon: LogOutIcon,
    },
  ],
  
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {

  const { isModalOpen, setIsModalOpen, handleOpenModal, selectedType } = useTransactionModal();

  return (
    <Sidebar className="border-r-0" {...props} collapsible="icon" >
      <SidebarHeader>
        <Logo/>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavBypass handleOpenModal={handleOpenModal} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
 
       <CreateTransactionForm
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        transactionType={selectedType}
      />
    </Sidebar>
  )
}

