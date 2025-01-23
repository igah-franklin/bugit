'use client'
import { useState } from "react"
import { TransactionCard } from "@/components/card/transaction-card"
import FinancialHistory from "@/components/financial-history/financial-history"
import { TransactionHistoryGrid } from "@/components/transaction-history-grid/transaction-history-grid"
import { getAccessToken } from "@/services/token.service"
import { fetchFinancialSummaryAction } from "@/actions/transactions/fetch-financial-summary-actions"
import { useQuery } from "@tanstack/react-query"

export default function dashboard() {
  const [expenses, setExpenses] = useState(1234.56)
  const [income, setIncome] = useState(2345.67)
  const balance = income - expenses
  
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["financial-summary"],
    queryFn: fetchFinancialSummaryAction,
    refetchOnWindowFocus: false,
  });

  const financialSummaryData =  data?.data.data || [];
  console.log(financialSummaryData[0], 'financialSummaryData financialSummaryData')

  
  return (
    <>
      <div className="mx-2 md:mx-0">
        <div className="w-full max-w-5xl mx-auto rounded-xl bg-muted/50 grid grid-cols-1 md:grid-cols-3 gap-4 p-2" >
          <TransactionCard title="Expense Total" amount={financialSummaryData[0]?.totalExpenses} type="expense" />
          <TransactionCard title="Income Total" amount={financialSummaryData[0]?.totalIncome} type="income" />
          <TransactionCard title="Balance" amount={financialSummaryData[0]?.balance} type="balance" />
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
