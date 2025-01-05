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
import { CircleAlert } from "lucide-react"
import { ReactNode } from "react"

  interface IActionModal {
    dataId: string,
    title: string, 
    type: 'delete' | 'other', 
    description: string, 
    actionBtnText: string,
    children: ReactNode
  }

  
  export default function ActionModal({ title, type, description, actionBtnText, dataId, children }: IActionModal) {

      const handleDeleteItem = ()=>{
        console.log(dataId, 'transaction id')
      }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          { children }
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
          <CircleAlert className="text-red-400" />
            <AlertDialogTitle>{ title }</AlertDialogTitle>
            <AlertDialogDescription>
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
  