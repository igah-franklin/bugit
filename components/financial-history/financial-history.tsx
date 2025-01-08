"use client"

import { useState, useMemo } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, TooltipProps } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Comprehensive mock data for multiple years
const mockData = [
  // 2024 Data
  { year: 2024, month: "January", income: 450, expenses: 380 },
  { year: 2024, month: "February", income: 520, expenses: 410 },
  { year: 2024, month: "March", income: 580, expenses: 450 },
  { year: 2024, month: "April", income: 620, expenses: 480 },
  { year: 2024, month: "May", income: 680, expenses: 520 },
  { year: 2024, month: "June", income: 720, expenses: 550 },
  { year: 2024, month: "July", income: 750, expenses: 580 },
  { year: 2024, month: "August", income: 780, expenses: 600 },
  { year: 2024, month: "September", income: 800, expenses: 620 },
  { year: 2024, month: "October", income: 820, expenses: 640 },
  { year: 2024, month: "November", income: 850, expenses: 660 },
  { year: 2024, month: "December", income: 880, expenses: 680 },

  // 2023 Data
  { year: 2023, month: "January", income: 400, expenses: 350 },
  { year: 2023, month: "February", income: 420, expenses: 360 },
  { year: 2023, month: "March", income: 450, expenses: 380 },
  { year: 2023, month: "April", income: 480, expenses: 400 },
  { year: 2023, month: "May", income: 510, expenses: 420 },
  { year: 2023, month: "June", income: 540, expenses: 440 },
  { year: 2023, month: "July", income: 570, expenses: 460 },
  { year: 2023, month: "August", income: 600, expenses: 480 },
  { year: 2023, month: "September", income: 630, expenses: 500 },
  { year: 2023, month: "October", income: 660, expenses: 520 },
  { year: 2023, month: "November", income: 690, expenses: 540 },
  { year: 2023, month: "December", income: 720, expenses: 560 },

  // 2022 Data
  { year: 2022, month: "January", income: 300, expenses: 280 },
  { year: 2022, month: "February", income: 320, expenses: 290 },
  { year: 2022, month: "March", income: 340, expenses: 300 },
  { year: 2022, month: "April", income: 360, expenses: 310 },
  { year: 2022, month: "May", income: 380, expenses: 320 },
  { year: 2022, month: "June", income: 400, expenses: 330 },
  { year: 2022, month: "July", income: 420, expenses: 340 },
  { year: 2022, month: "August", income: 440, expenses: 350 },
  { year: 2022, month: "September", income: 460, expenses: 360 },
  { year: 2022, month: "October", income: 480, expenses: 370 },
  { year: 2022, month: "November", income: 500, expenses: 380 },
  { year: 2022, month: "December", income: 520, expenses: 390 },
]

const years = [2024, 2023, 2022]
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const income = payload[0]?.value || 0
    const expenses = payload[1]?.value || 0
    const balance = income - expenses

    return (
      <div className="rounded-lg bg-black/80 p-4 text-sm shadow-xl">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-gray-400">Expense</span>
          <span className="ml-auto text-white">{expenses.toFixed(2)} €</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
          <span className="text-gray-400">Income</span>
          <span className="ml-auto text-white">{income.toFixed(2)} €</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-white" />
          <span className="text-gray-400">Balance</span>
          <span className="ml-auto text-white">{balance.toFixed(2)} €</span>
        </div>
      </div>
    )
  }
  return null
}

export default function FinancialHistory() {
  const [viewMode, setViewMode] = useState<"year" | "month">("year")
  const [selectedYear, setSelectedYear] = useState<number>(2024)
  const [selectedMonth, setSelectedMonth] = useState<string | "all">("all")

  const chartData = useMemo(() => {
    if (viewMode === "year") {
      // Aggregate data by year
      return years.map(year => {
        const yearData = mockData.filter(item => item.year === year)
        return {
          month: year.toString(),
          income: yearData.reduce((sum, item) => sum + item.income, 0),
          expenses: yearData.reduce((sum, item) => sum + item.expenses, 0)
        }
      })
    } else {
      // Show monthly data for selected year
      let filteredData = mockData.filter(item => item.year === selectedYear)
      
      // Apply month filter if a specific month is selected
      if (selectedMonth !== "all") {
        filteredData = filteredData.filter(item => item.month === selectedMonth)
      }
      
      return filteredData.map(item => ({
        month: item.month,
        income: item.income,
        expenses: item.expenses
      }))
    }
  }, [viewMode, selectedYear, selectedMonth])

  return (
    <div className="w-full shadow-md">
      <Card className=" text-white bg-transparent">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">History</CardTitle>
          <div className="flex gap-2 flex-wrap">
            <div className="inline-flex rounded-lg bg-neutral-900">
              <button 
                className={`px-3 py-1 text-sm rounded-lg ${viewMode === "year" ? "bg-neutral-800" : "text-gray-400"}`}
                onClick={() => {
                  setViewMode("year")
                  setSelectedMonth("all")
                }}
              >
                Year
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-lg ${viewMode === "month" ? "bg-neutral-800" : "text-gray-400"}`}
                onClick={() => setViewMode("month")}
              >
                Month
              </button>
            </div>
            <Select 
              defaultValue={selectedYear.toString()} 
              onValueChange={(value) => {
                setSelectedYear(parseInt(value))
                setSelectedMonth("all")
              }}
              disabled={viewMode === "year"}
            >
              <SelectTrigger className="w-[120px] bg-neutral-900 border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select 
              value={selectedMonth}
              onValueChange={setSelectedMonth}
              disabled={viewMode === "year"}
            >
              <SelectTrigger className="w-[140px] bg-neutral-900 border-0">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="ml-auto flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="text-sm">Expenses</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="">
          <div className="h-[400px] w-full">
            <BarChart
              width={800}
              height={400}
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666' }}
                domain={[0, 'auto']}
                tickCount={6}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ fill: 'transparent' }}
              />
              <Bar 
                dataKey="income" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
              />
              <Bar 
                dataKey="expenses" 
                fill="#ef4444" 
                radius={[4, 4, 0, 0]} 
                barSize={20}
              />
            </BarChart>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

