import { SidebarLeft } from '@/components/sidebar-left'
import { SidebarRight } from '@/components/sidebar-right'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@radix-ui/react-separator'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children:ReactNode }) {
  return (
    <div className=''>
        <SidebarProvider>
            <SidebarLeft />
            <SidebarInset>
              <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
                <div className="flex flex-1 items-center gap-2 px-3">
                  <SidebarTrigger />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbPage className="line-clamp-1">
                          Manage all your transactions in one place
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </header>
              { children }
            </SidebarInset>
            <SidebarRight />
        </SidebarProvider>
    </div>
  )
}
