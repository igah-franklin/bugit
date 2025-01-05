"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon, Wallet2 } from 'lucide-react'

interface BudgetCardProps {
  title: string
  amount: number
  type: "expense" | "income" | "balance"
}

export const TransactionCard: React.FC<BudgetCardProps> = ({ title, amount, type }) => {
  const [animatedAmount, setAnimatedAmount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedAmount((prev) => {
        const diff = amount - prev
        const increment = diff / 10
        return Math.abs(diff) < 0.1 ? amount : prev + increment
      })
    }, 50)

    return () => clearInterval(interval)
  }, [amount])

  const getCardStyle = () => {
    switch (type) {
      case "expense":
        return "bg-red-500/10"
      case "income":
        return "bg-emerald-400/10 to-green-600"
      case "balance":
        return "bg-blue-400/10 text-blue-400"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "expense":
        return <ArrowUpIcon className="h-6 w-6" />
      case "income":
        return <ArrowDownIcon className="h-6 w-6" />
      case "balance":
        return <DollarSignIcon className="h-6 w-6" />
    }
  }
  const getSideIcon = () => {
    switch (type) {
      case "expense":
        return <span className="h-9 w-9 flex justify-center items-center rounded-md bg-red-500/20"><ArrowDownIcon className="h-6 w-6 text-red-700" /></span>
      case "income":
        return  <span className="h-9 w-9 flex justify-center items-center rounded-md bg-emerald-500/20"><Wallet2 className="h-6 w-6 text-emerald-700" /></span>
      case "balance":
        return  <span className="h-9 w-9 flex justify-center items-center rounded-md bg-blue-400/20"><DollarSignIcon className="h-6 w-6 text-blue-800" /></span>
    }
  }

  return (
    <Card className={`overflow-hidden transition-all shadow-md duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1`}>
      <CardContent className={`p-6 bg-gradient-to-br ${getCardStyle()} text-white`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {getIcon()}
        </div>
        <div className={`flex items-center gap-3 text-xl font-bold `}>
        {getSideIcon()} ${animatedAmount.toFixed(2)}
        </div>
      </CardContent>
    </Card>
    
  )
}