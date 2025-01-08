import React from 'react'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { EyeIcon, MoreHorizontal, PlusIcon } from 'lucide-react'

interface INavBypassProps {
    setIsModalOpen: Function
}
export default function NavBypass({ setIsModalOpen }: INavBypassProps ) {
    
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Favorites Actions</SidebarGroupLabel>
      <SidebarMenu>
        <div className='grid grid-cols-2 gap-3'>
            <div className='cursor-pointer'>
                <div className='h-16 w-16 flex justify-center items-center border-2 border-dotted dark:border-white/30 p-1 rounded-lg'>
                    <div className='h-12 w-12 flex justify-center items-center bg-gray-800 rounded-lg'>
                        <EyeIcon />
                    </div>
                </div>
                <span className='text-xsm'>View all</span>
            </div>
            <div className='cursor-pointer'
            onClick={() => setIsModalOpen(true)}
            >
                <div className='h-16 w-16 flex justify-center items-center border-2 border-dotted dark:border-white/30 p-1 rounded-lg'>
                    <div className='h-12 w-12   bg-emerald-500/20 flex justify-center items-center rounded-lg shadow-md'>
                        <PlusIcon className='text-emerald-700 shadow-md' />
                    </div>
                </div>
                <span className='text-xsm'>Income</span>
            </div>
            <div className='cursor-pointer'>
                <div className='h-16 w-16 flex justify-center items-center border-2 border-dotted dark:border-white/30 p-1 rounded-lg'>
                    <div className='h-12 w-12 flex justify-center items-center bg-red-500/20 text-red-700 rounded-lg shadow-md p-1'>
                        <PlusIcon />
                    </div>
                </div>
                <span className='text-xsm'>Expenses</span>
            </div>
            <div className='cursor-pointer'>
                <div className='h-16 w-16 flex justify-center items-center border-2 border-dotted dark:border-white/30 p-1 rounded-lg'>
                    <div className='h-12 w-12 flex justify-center items-center bg-black/50 rounded-lg'>
                        <PlusIcon />
                    </div>
                </div>
                <span className='text-xsm'>category</span>
            </div>
        </div>
      </SidebarMenu>
    </SidebarGroup>
  )
}
