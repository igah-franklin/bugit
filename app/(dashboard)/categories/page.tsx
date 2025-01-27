'use client'

import { fetchCategoryAction } from "@/actions/category/fetch-category-action";
import CreateCategoryForm from "@/components/form/create-category-form";
import TableSkeleton from "@/components/skeleton/table-skeleton";
import { CategoriesTable } from "@/components/table/categories/categories-table";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoryAction,
    refetchOnWindowFocus: false,
  });

  const categoryData =  data?.data.data || [];

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
          {
            isFetching ? <TableSkeleton /> : (
              <CategoriesTable categories={categoryData}/>
            )
          }
          </div>
        </div>
        <CreateCategoryForm
          open={isModalOpen}
          onOpenChange={() => setIsModalOpen(false)}
        />
      </>
    )
  }
  
  