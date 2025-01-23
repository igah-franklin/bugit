'use client'
import { fetchTransactionTypeAction } from "@/actions/transactions/fetch-transaction-type-action";
import { CreateTransactionForm } from "@/components/form/create-transaction-form";
import { columns } from "@/components/table/income/columns";

import { IncomeTable } from "@/components/table/income/income-table";
import { Button } from "@/components/ui/button";
import { useTransactionModal } from "@/hooks/use-transaction-modal";
import { income } from "@/utils/transactions";
import { useQuery } from "@tanstack/react-query";


import { PlusIcon } from "lucide-react";

export default function IncomePage() {
  const { isModalOpen, setIsModalOpen, handleOpenModal, selectedType } = useTransactionModal();

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["transactions"],
    queryFn: ()=> fetchTransactionTypeAction('income'),
    refetchOnWindowFocus: false,
  });

  const incomeData =  data?.data.data || [];
  console.log(incomeData, 'incomeData')
    return (
      <>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-end mx-auto w-full max-w-5xl" >
              <div className="border-2 border-dotted dark:border-white/30 p-1 rounded-md ">
                <Button className="py-5 bg-emerald-500/20 dark:text-white hover:bg-transparent"
                onClick={() => handleOpenModal('income')}
                >
                  <PlusIcon className='text-emerald-700 shadow-md' /> Add New Income
                </Button>
              </div>
          </div>
          <div className="mx-auto w-full max-w-5xl rounded-xl bg-muted/50 p-5">
            <IncomeTable columns={columns} data={incomeData} />
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
  
  