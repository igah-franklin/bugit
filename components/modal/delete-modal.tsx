import { deleteCategoryAction } from "@/actions/category/delete-category-action"
import { deleteTransactionAction } from "@/actions/transactions/delete-transaction-action"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CircleAlert } from "lucide-react"
import { ReactNode, useCallback } from "react"
import { toast } from "sonner"

  interface IDeleteModal {
    dataId: string,
    title: string, 
    type: 'category' | 'transaction', 
    description: string, 
    actionBtnText: string,
    children: ReactNode
  }

  
  export default function DeleteModal({ 
    title, 
    type, 
    description, 
    actionBtnText, 
    dataId, 
    children 
  }: IDeleteModal) {

    const queryClient = useQueryClient();
    const  deleteItem = type === 'transaction' ? () => deleteTransactionAction(dataId) : () => deleteCategoryAction(dataId)
    const { mutate, isPending } = useMutation({
      mutationFn: deleteItem,
        onSuccess: async (data: any) => {
          toast.success(`${type} deleted successfully 🎉`, {
            id: `delete-${type}`,
          });
          await queryClient.invalidateQueries({
            queryKey: [`${type==='category' ? 'categories' : 'transactions'}`],
          });
        },
        onError: () => {
          toast.error(`Something went wrong deleting ${type}`, {
            id: `delete-${type}`,
          });
        },
    });

      const handleDeleteItem = useCallback(()=>{
        toast.loading('deleting category...', {
          id: `delete-${type}`,
        });
        mutate();
      },[mutate])

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          { children }
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
          <CircleAlert className="text-red-400" />
            <AlertDialogTitle className="text-start">{ title }</AlertDialogTitle>
            <AlertDialogDescription className="text-start">
             { description }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
            onClick={handleDeleteItem}
            disabled={isPending}
            className="bg-red-500/10 text-red-400">
                { actionBtnText }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  