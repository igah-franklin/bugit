"use client"

import * as React from "react"
import {
  AudioWaveform,
  Banknote,
  Blocks,
  Calendar,
  Command,
  DollarSign,
  Home,
  Inbox,
  LogOutIcon,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react"

import { NavFavorites } from "./nav-favorites"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavWorkspaces } from "./nav-workspaces"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavBypass from "./nav-bypass"
import { useState } from "react"
import { AddTransactionModal } from "./modal/transaction-modal"
import { AddTransactionForm } from "./form/create-transaction-form"
import { useTransactionModal } from "@/hooks/use-transaction-modal"

// This is sample data.
const data = {
  teams: [
    {
      name: "Bujet",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: Sparkles,
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: Home,
      isActive: true,
    },
    {
      title: "Income",
      url: "/income",
      icon: Inbox,
      badge: "10",
    },
    // {
    //   title: "Categories",
    //   url: "/categories",
    //   icon: Inbox,
    //   badge: "10",
    // },
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

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedType, setSelectedType] = useState<string>('')
  const { isModalOpen, setIsModalOpen, handleOpenModal, selectedType } = useTransactionModal();


  const handleAddIncome = (data: any) => {
    console.log('Income added:', data)
    // Here you would typically save the data to your backend or state management system
  }

  // const handleOpenModal = (type: string)=>{
  //   setSelectedType(type);
  //   setIsModalOpen(true);
  // }

  return (
    <Sidebar className="border-r-0" {...props} collapsible="icon" >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavBypass handleOpenModal={handleOpenModal} />
  
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
 
       <AddTransactionForm
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
        transactionType={selectedType}
      />
    </Sidebar>
  )
}

