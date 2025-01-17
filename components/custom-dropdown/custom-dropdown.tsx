'use client'

import { ReactNode } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"


interface ICustomDropdownProps {
    title: string;
    bgColor: string;
    children: ReactNode
}
export default function CustomDropdown({ title, bgColor, children }: ICustomDropdownProps) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className={`px-3 py-1 rounded-md cursor-pointer ${bgColor}`}>
         <span>{title}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
            {/* <DropdownMenuItem>
            </DropdownMenuItem> */}
                { children }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
