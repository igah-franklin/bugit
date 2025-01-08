'use client'
import { AddTransactionForm } from "@/components/form/create-transaction-form";
import { columns } from "@/components/table/expense/columns";
import { ExpenseTable } from "@/components/table/expense/expenses-table";
import { Button } from "@/components/ui/button";
import { useTransactionModal } from "@/hooks/use-transaction-modal";
import { expenses } from "@/utils/transactions";
import { PlusIcon } from "lucide-react";

export default function ExpensesPage() {
  const { isModalOpen, setIsModalOpen, handleOpenModal, selectedType } = useTransactionModal();
    return (
      <>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-end mx-auto w-full max-w-5xl" >
              <div className="border-2 border-dotted dark:border-white/30 p-1 rounded-md ">
                <Button className="py-5 bg-red-500/20 text-red-700 hover:bg-transparent"
                onClick={() => handleOpenModal('expense')}
                >
                  <PlusIcon className='text-red-700 shadow-md font-bold' /> Add New Expense
                </Button>
              </div>
          </div>
          <div className="mx-auto w-full max-w-5xl rounded-xl bg-muted/50 p-5">
            <ExpenseTable columns={columns} data={expenses} />
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
  
  