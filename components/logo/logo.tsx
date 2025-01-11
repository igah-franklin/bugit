'use client'
import { Wallet } from 'lucide-react'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href={'/'} className='flex items-center gap-1'>
        <span className="flex aspect-square size-5 items-center justify-center rounded-md bg-green-900 text-sidebar-primary-foreground">
        <Wallet className="size-5" />
        </span>
        <span className="truncate font-semibold">Bujet</span>
    </Link>
  )
}
