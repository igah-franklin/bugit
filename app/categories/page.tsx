'use client'
import CreateCategoryForm from "@/components/form/create-category-form";
import { CategoriesTable } from "@/components/table/categories/categories-table";
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
                <Button className="py-5 bg-gray-500/20 text-white hover:bg-transparent"
                onClick={() => setIsModalOpen(true)}
                >
                  <PlusIcon className='text-white shadow-md font-bold' /> Add New Category
                </Button>
              </div>
          </div>
          <div className="mx-auto w-full max-w-5xl rounded-xl bg-muted/50 p-5">
            <CategoriesTable />
          </div>
        </div>
        <CreateCategoryForm
          open={isModalOpen}
          onOpenChange={() => setIsModalOpen(false)}
        />
      </>
    )
  }
  
  