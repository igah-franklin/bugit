import { deleteCategoryAction } from "@/actions/category/delete-category-action"
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
  import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CircleAlert } from "lucide-react"
import { ReactNode, useCallback } from "react"
import { toast } from "sonner"

  interface IDeleteModal {
    dataId: string,
    title: string, 
    type: 'delete' | 'other', 
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

    const { mutate, isPending } = useMutation({
      mutationFn: () =>
        deleteCategoryAction(dataId),
        onSuccess: async (data: any) => {
          toast.success(`Category deleted successfully 🎉`, {
            id: 'delete-category',
          });
          await queryClient.invalidateQueries({
            queryKey: ['categories'],
          });
        },
        onError: () => {
          toast.error('Something went wrong editing the category', {
            id: 'delete-category',
          });
        },
    });

      const handleDeleteItem = useCallback(()=>{
        toast.loading('deleting category...', {
          id: 'delete-category',
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
            className={`${type==='delete' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-400/10 text-emerald-400'}`}>
                { actionBtnText }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  