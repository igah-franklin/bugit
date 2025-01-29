'use client'
import { SidebarLeft } from '@/components/sidebar-left'
import { SidebarRight } from '@/components/sidebar-right'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { getAccessToken } from '@/services/token.service'
import { Separator } from '@radix-ui/react-separator'
import React, { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TableSkeleton from '@/components/skeleton/table-skeleton'

export default function layout({ children }: { children:ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      router.replace('/login');
    }
  }, [router]);

  const accessToken = getAccessToken();
  if (!accessToken) {
    return <div className='h-screen flex justify-center items-center'>
      <TableSkeleton />
    </div>; 
  }


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
