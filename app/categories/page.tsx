'use client'
import CreateCategoryForm from "@/components/form/create-category-form";
import { Button } from "@/components/ui/button";
import { useTransactionModal } from "@/hooks/use-transaction-modal";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export default function ExpensesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    return (
      <>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-end mx-auto w-full max-w-5xl" >
              <div className="border-2 border-dotted dark:border-white/30 p-1 rounded-md ">
                <Button className="py-5 bg-red-500/20 text-red-700 hover:bg-transparent"
                onClick={() => setIsModalOpen(true)}
                >
                  <PlusIcon className='text-red-700 shadow-md font-bold' /> Add New Category
                </Button>
              </div>
          </div>
        </div>
        <CreateCategoryForm
          open={isModalOpen}
          onOpenChange={() => setIsModalOpen(false)}
        />
      </>
    )
  }
  
  