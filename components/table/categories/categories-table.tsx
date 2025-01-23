
'use client'
import EditCategoryForm from "@/components/form/edit-category-form";
import DeleteModal from "@/components/modal/delete-modal";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn } from "@/lib/utils";
// import { categories } from "@/utils/transactions";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

  
  export function CategoriesTable({ categories }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
         <Table>
            <TableCaption>This is a list of your recent categories.</TableCaption>
            <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Title</TableHead>
                <TableHead className="text-right">Action</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {categories.map((category: any) => (
                <TableRow key={category.id}>
                <TableCell className="font-medium">{category.categoryName}</TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <>
                                <Button 
                                    variant='ghost'
                                    className={cn('w-full text-emerald-500 justify-start p-2 hover:text-emerald-400')}
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <Edit2/> Edit
                                </Button>
                                <EditCategoryForm
                                    category={category}
                                    open={isModalOpen}
                                    onOpenChange={() => setIsModalOpen(false)}
                                />
                            </>
                            <DeleteModal
                                    title='Are you sure you want to delete this transaction' 
                                    type='delete'
                                    description='This action cannot be undone. This will permanently delete the transaction.'
                                    actionBtnText='Delete'
                                    dataId={category._id}
                                >
                                    <Button 
                                    variant='ghost'
                                    className={cn('w-full text-red-400 justify-start p-2 hover:text-red-400')}><Trash2/> Delete</Button>
                            </DeleteModal>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
         </Table>
        </>
    )
  }
  