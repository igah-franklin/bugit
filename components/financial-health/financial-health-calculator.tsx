"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Financial data for 12 months
const financialData = [
  { month: "january", income: 5000, expenses: 4000 },
  { month: "february", income: 5500, expenses: 4200 },
  { month: "march", income: 6000, expenses: 4500 },
  { month: "april", income: 5800, expenses: 4300 },
  { month: "may", income: 6200, expenses: 4600 },
  { month: "june", income: 6500, expenses: 4800 },
  { month: "july", income: 6800, expenses: 5000 },
  { month: "august", income: 7000, expenses: 5200 },
  { month: "september", income: 6700, expenses: 5100 },
  { month: "october", income: 6900, expenses: 5300 },
  { month: "november", income: 7200, expenses: 5500 },
  { month: "december", income: 7500, expenses: 5800 },
]

// Calculate financial health for each month
const calculateFinancialHealth = (income: number, expenses: number) => {
  const ratio = income / expenses
  if (ratio >= 1.5) return { health: "Excellent", value: 100 }
  if (ratio >= 1.2) return { health: "Good", value: 75 }
  if (ratio >= 1) return { health: "Fair", value: 50 }
  return { health: "Poor", value: 25 }
}

const processedData = financialData.map(item => ({
  ...item,
  ...calculateFinancialHealth(item.income, item.expenses),
  fill: `var(--color-${item.month})`
}))

// Calculate overall financial health
const overallIncome = financialData.reduce((sum, item) => sum + item.income, 0)
const overallExpenses = financialData.reduce((sum, item) => sum + item.expenses, 0)
const overallHealth = calculateFinancialHealth(overallIncome, overallExpenses)

const chartConfig = {
  overall: {
    label: "Overall",
    color: "hsl(280, 100%, 70%)", // Bright purple
  },
  january: { label: "January", color: "hsl(0, 100%, 70%)" }, // Bright red
  february: { label: "February", color: "hsl(30, 100%, 70%)" }, // Bright orange
  march: { label: "March", color: "hsl(60, 100%, 70%)" }, // Bright yellow
  april: { label: "April", color: "hsl(90, 100%, 70%)" }, // Bright lime
  may: { label: "May", color: "hsl(120, 100%, 70%)" }, // Bright green
  june: { label: "June", color: "hsl(150, 100%, 70%)" }, // Bright teal
  july: { label: "July", color: "hsl(180, 100%, 70%)" }, // Bright cyan
  august: { label: "August", color: "hsl(210, 100%, 70%)" }, // Bright sky blue
  september: { label: "September", color: "hsl(240, 100%, 70%)" }, // Bright blue
  october: { label: "October", color: "hsl(270, 100%, 70%)" }, // Bright indigo
  november: { label: "November", color: "hsl(300, 100%, 70%)" }, // Bright magenta
  december: { label: "December", color: "hsl(330, 100%, 70%)" }, // Bright pink
} satisfies ChartConfig

export function FinancialHealthCalculator() {
  const id = "pie-financial-health"
  const [activeMonth, setActiveMonth] = React.useState("overall")

  const activeIndex = React.useMemo(
    () => processedData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  )
  const months = React.useMemo(() => ["overall", ...processedData.map((item) => item.month)], [])

  const displayData = activeMonth === "overall" 
    ? [{ month: "overall", value: overallHealth.value, health: overallHealth.health, fill: chartConfig.overall.color }] 
    : processedData

  const financialTotals = React.useMemo(() => {
    if (activeMonth === "overall") {
      return {
        income: overallIncome,
        expenses: overallExpenses,
        balance: overallIncome - overallExpenses
      }
    } else {
      const monthData = processedData.find(item => item.month === activeMonth)
      return {
        income: monthData?.income || 0,
        expenses: monthData?.expenses || 0,
        balance: (monthData?.income || 0) - (monthData?.expenses || 0)
      }
    }
  }, [activeMonth])

  return (
    <Card data-chart={id} className="flex flex-col bg-gray-900 text-white">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Financial Health Chart</CardTitle>
          {/* <CardDescription className="text-gray-300">January - December 2024</CardDescription> */}
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5 bg-gray-800 text-white"
            aria-label="Select a month"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl bg-gray-800 text-white">
            {months.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: config.color,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pb-4">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px] my-5"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={displayData}
              dataKey="value"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeMonth === "overall" ? 0 : activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    const activeData = activeMonth === "overall" ? displayData[0] : processedData[activeIndex]
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-3xl font-bold"
                        >
                          {activeData.health}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-gray-300"
                        >
                          Financial Health
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 w-full max-w-[300px] text-center">
          <p className="text-lg font-semibold">Financial Summary</p>
          <div className="mt-2 grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-300">Income</p>
              <p className="text-lg font-medium text-green-400">${financialTotals.income.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Expenses</p>
              <p className="text-lg font-medium text-red-400">${financialTotals.expenses.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Balance</p>
              <p className={`text-lg font-medium ${financialTotals.balance >= 0 ? 'text-blue-400' : 'text-yellow-400'}`}>
                ${financialTotals.balance.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

