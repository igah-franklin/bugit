
'use client'
import { TransactionCard } from "@/components/card/transaction-card"
import FinancialHistory from "@/components/financial-history/financial-history"
import { useState } from "react"


export default function Page() {
  const [expenses, setExpenses] = useState(1234.56)
  const [income, setIncome] = useState(2345.67)
  const balance = income - expenses

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="w-full max-w-5xl mx-auto rounded-xl bg-muted/50 grid grid-cols-1 md:grid-cols-3 gap-4 p-2" >
          <TransactionCard title="Expense Total" amount={expenses} type="expense" />
          <TransactionCard title="Income Total" amount={income} type="income" />
          <TransactionCard title="Balance" amount={balance} type="balance" />
        </div>
        {/* <div className="mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50" >
        </div> */}
        {/* <div className="w-full max-w-5xl mx-auto rounded-xl bg-mute grid grid-cols-1 md:grid-cols-3 gap-4 p-2" >
        </div> */}
        <div className="w-full max-w-5xl mx-auto bg-muted/50 p-2 rounded-md">
          <FinancialHistory />
        </div>
        <div className="w-full max-w-5xl mx-auto flex justify-between">
          <h3>Recent transactions</h3>
          <span>View all</span>
        </div>
        <div className="w-full max-w-5xl mx-auto rounded-xl bg-muted/50 grid grid-cols-1 md:grid-cols-3 gap-4 p-2" >
          
        </div>
      </div>
    </>
  )
}

