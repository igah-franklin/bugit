'use client'
import { TransactionTable } from "@/components/table/transactions-table";
import { columns } from "@/components/table/columns";
import { transactions } from "@/utils/transactions";
import { AddTransactionForm } from "@/components/form/create-transaction-form";
import { useTransactionModal } from "@/hooks/use-transaction-modal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export default function TransactionsPage() {
  const { isModalOpen, setIsModalOpen, handleOpenModal, selectedType } = useTransactionModal();
  return (
    <>
    <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-end gap-3 mx-auto w-full max-w-5xl" >
              <div className="border-2 border-dotted dark:border-white/30 p-1 rounded-md ">
                <Button className="py-5 bg-emerald-500/20 dark:text-white hover:bg-transparent"
                onClick={() => handleOpenModal('income')}
                >
                  <PlusIcon className='text-emerald-700 shadow-md' /> Add New Income
                </Button>
              </div>
              <div className="border-2 border-dotted dark:border-white/30 p-1 rounded-md ">
                <Button className="py-5 bg-red-500/20 text-red-700 hover:bg-transparent"
                onClick={() => handleOpenModal('expense')}
                >
                  <PlusIcon className='text-red-700 shadow-md font-bold' /> Add New Expense
                </Button>
              </div>
          </div>
      <div className="mx-auto w-full max-w-5xl rounded-xl bg-muted/50 p-5">
        <TransactionTable columns={columns} data={transactions} />
      </div>
    </div>
    <AddTransactionForm
      open={isModalOpen}
      onOpenChange={() => setIsModalOpen(false)}
      transactionType={selectedType}
    />
    </>
  )
}

