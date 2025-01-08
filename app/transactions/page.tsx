import { TransactionTable } from "@/components/table/transactions-table";
import { columns } from "@/components/table/columns";
import { transactions } from "@/utils/transactions";
export default function TransactionsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="mx-auto h-24 w-full max-w-5xl rounded-xl bg-muted/50" />
      <div className="mx-auto w-full max-w-5xl rounded-xl bg-muted/50 p-5">
      
        <TransactionTable columns={columns} data={transactions} />
      </div>
     
    </div>
  )
}

