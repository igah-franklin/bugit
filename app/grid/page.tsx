
'use client'
import InputForm from "@/components/form/input-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AddIncomeForm } from "./grid-form";
import { useState } from "react";


export default function gridPage() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      {/* <AlertDialog>
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <InputForm />
          <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
          <div className="p-4">
      <Button onClick={() => setOpen(true)}>Add Income</Button>
      <AddIncomeForm open={open} onOpenChange={setOpen} />
    </div>

    </div>
  )
}
