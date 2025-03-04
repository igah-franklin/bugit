"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "../column-header"
import { cn } from "@/lib/utils"
import { ITransactions } from "@/types/ITransaction"
import DeleteModal from "../../modal/delete-modal"
import { EditTransactionForm } from "@/components/form/edit-transaction-form"


export const columns: ColumnDef<ITransactions>[] = [
  {
    accessorKey: "category",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
    filterFn: (row, id, value)=>{
        return value.includes(row.getValue(id))
    },
    cell: ({ row }) => {
        return (
          <div className="capitalize">
            {row.original?.category?.categoryName}
          </div>
        )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
    cell: ({ row }) => {
        return (
          <div className="capitalize">
            {row.original.description}
          </div>
        )
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    filterFn: (row, id, value)=>{
        return value.includes(row.getValue(id))
    },
    cell: ({ row }) => {
      const type = row.original.type
      return (
        <div className={cn("capitalize rounded-md text-center p-2", 
            type === 'income' && 'bg-emerald-400/10 text-emerald-500',
            type === 'expense' && 'bg-red-400/10 text-red-600'
        )}>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Amount" />
      ),
    cell: ({ row }) => {
      const amount = row.original.amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
    cell: ({ row }) => {
        const date = new Date(row.original.date);
        const formattedDate = date.toLocaleString("default", {
            timeZone: "UTC",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        })
        return (
          <div className="capitalize">
            {formattedDate}
          </div>
        )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <EditTransactionForm
                  transactionType={transaction.type}
                  transactionData={transaction}
                  triggerBtnText={<Button variant="ghost" className="w-full justify-start"><Edit2/> Edit</Button>}
                />
              <DeleteModal
                  title='Are you sure you want to delete this transaction' 
                  type='transaction'
                  description='This action cannot be undone. This will permanently delete the transaction.'
                  actionBtnText='Delete'
                  dataId={transaction._id}
              >
                  <Button 
                  variant='ghost'
                  className={cn('w-full text-red-400 justify-start p-2 hover:text-red-400 hover:bg-transparent')}><Trash2/> Delete</Button>
              </DeleteModal>
              </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
]

