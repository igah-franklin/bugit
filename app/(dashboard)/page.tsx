'use client'
import { useState } from "react"
import { TransactionCard } from "@/components/card/transaction-card"
import FinancialHistory from "@/components/financial-history/financial-history"
import { TransactionHistoryGrid } from "@/components/transaction-history-grid/transaction-history-grid"

export default function dashboard() {
  const [expenses, setExpenses] = useState(1234.56)
  const [income, setIncome] = useState(2345.67)
  const balance = income - expenses
  return (
    <>
      <div className="mx-2 md:mx-0">
        <div className="w-full max-w-5xl mx-auto rounded-xl bg-muted/50 grid grid-cols-1 md:grid-cols-3 gap-4 p-2" >
          <TransactionCard title="Expense Total" amount={expenses} type="expense" />
          <TransactionCard title="Income Total" amount={income} type="income" />
          <TransactionCard title="Balance" amount={balance} type="balance" />
        </div>
        {/* <div className="mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50" >
        </div> */}
        {/* <div className="w-full max-w-5xl mx-auto rounded-xl bg-mute grid grid-cols-1 md:grid-cols-3 gap-4 p-2" >
        </div> */}
        <div className="w-full max-w-5xl mx-auto bg-muted/50 p-2 my-5 rounded-md hidden lg:block">
          <TransactionHistoryGrid />
        </div>
        <div className="md:w-full max-w-5xl mx-auto bg-muted/50 p-2 rounded-md mt-5 md:mt-0">
          <FinancialHistory />
        </div>
      </div>
    </>
  )
}
