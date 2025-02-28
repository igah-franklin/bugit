import * as React from "react"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { FinancialHealthCalculator } from "./financial-health/financial-health-calculator"

// This is sample data.
const data = {
  user: {
    name: "Igah",
    email: "igahfranklin.com",
    avatar: "/avatars/shadcn.jpg",
  }
}

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <FinancialHealthCalculator/>
      </SidebarContent>
    </Sidebar>
  )
}
