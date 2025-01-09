import ActionModal from "@/components/modal/action-modal";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { cn } from "@/lib/utils";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";


  interface ICategories {
    id: string;
    categoryName: string;
  }
  
  const categories: ICategories[] = [
    {
      id: '1',
      categoryName: "INV001",
    },
    {
      id: '2',
      categoryName: "INV002",
    },
    {
      id: '3',
      categoryName: "INV003",
    },
    {
      id: '4',
      categoryName: "INV004",
    },
    {
      id: '5',
      categoryName: "INV005",
    },
    {
      id: '6',
      categoryName: "INV006",
    },
    {
      id: '7',
      categoryName: "INV007",
    },
  ]
  
  export function CategoriesTable() {
    return (
      <Table>
        <TableCaption>This is a list of your recent categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
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
                          <ActionModal
                                title='Are you sure you want to delete this transaction' 
                                type='delete'
                                description='This action cannot be undone. This will permanently delete the transaction.'
                                actionBtnText='Delete'
                                dataId={category.id}
                            >
                                <Button 
                                variant='ghost'
                                className={cn('w-full text-red-400 justify-start p-2 hover:text-red-400 hover:bg-transparent')}><Trash2/> Delete</Button>
                            </ActionModal>
                    </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  