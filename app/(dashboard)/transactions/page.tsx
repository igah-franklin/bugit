'use client'
import { TransactionTable } from "@/components/table/transactions/transactions-table";
import { columns } from "@/components/table/transactions/columns";
import { transactions } from "@/utils/transactions";
import { useTransactionModal } from "@/hooks/use-transaction-modal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { CreateTransactionForm } from "@/components/form/create-transaction-form";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactionsAction } from "@/actions/transactions/fetch-transactions-action";

export default function TransactionsPage() {
  const { isModalOpen, setIsModalOpen, handleOpenModal, selectedType } = useTransactionModal();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactionsAction({}),
    refetchOnWindowFocus: false,
  });

  const transactionData =  data?.data.data || [];

  return (
    <>
    <div className="">
          <div className="flex items-center justify-end gap-3 mx-auto w-full max-w-5xl mb-3" >
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
      <div className="lg:mx-auto lg:w-full lg:max-w-5xl rounded-xl bg-muted/50 p-5 mx-2 ">
        <TransactionTable columns={columns} data={transactionData} />
      </div>
    </div>
    <CreateTransactionForm
      open={isModalOpen}
      onOpenChange={() => setIsModalOpen(false)}
      transactionType={selectedType}
    />
    </>
  )
}

