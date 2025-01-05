
'use client'
import { Calendar } from "@/components/ui/calendar"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import React from "react"

export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        {/* <Calendar className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]" /> */}
        <div>
          <SidebarGroupLabel>Start date</SidebarGroupLabel>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

