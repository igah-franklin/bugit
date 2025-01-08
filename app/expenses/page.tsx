import { columns } from "@/components/table/expense/columns";
import { ExpenseTable } from "@/components/table/expense/expenses-table";
import { expenses } from "@/utils/transactions";

export default function ExpensesPage() {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="mx-auto h-24 w-full max-w-5xl rounded-xl bg-muted/50" />
      <div className="mx-auto w-full max-w-5xl rounded-xl bg-muted/50 p-5">
      
        <ExpenseTable columns={columns} data={expenses} />
      </div>
     
    </div>
    )
  }
  
  