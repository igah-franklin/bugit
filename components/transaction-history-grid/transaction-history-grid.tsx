'use client'

import React, { useState } from 'react';
import { format, getDaysInMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ITransactions } from '@/types/ITransaction';

interface ITransactionsProps {
  transactionData: ITransactions[]
}

interface DayTransactions {
  income: boolean;
  expense: boolean;
  transactions: ITransactions[];
}

export const TransactionHistoryGrid = ({ transactionData }: ITransactionsProps) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<ITransactions[] | null>(null);


  const getTransactionsForDay = (year: number, month: number, day: number): DayTransactions => {
    const dayTransactions = transactionData.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getFullYear() === year &&
        transactionDate.getMonth() === month &&
        transactionDate.getDate() === day
      );
    });

    return {
      income: dayTransactions.some(t => t.type === 'income'),
      expense: dayTransactions.some(t => t.type === 'expense'),
      transactions: dayTransactions,
    };
  };

  const getColorForDay = (dayTransactions: DayTransactions): string => {
    if (dayTransactions.income && dayTransactions.expense) {
      return 'dark:bg-[#92400e] bg-[#92400e]'; // Brown
    } else if (dayTransactions.income) {
      return 'dark:bg-[#4ade80] bg-[#4ade80]'; // Green
    } else if (dayTransactions.expense) {
      return 'dark:bg-[#f87171] bg-[#f87171]'; // Red
    }
    return 'bg-gray-100';
  };

  const renderMonth = (month: number) => {
    const daysInMonth = getDaysInMonth(new Date(selectedYear, month));
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div key={month} className="flex flex-col gap-1 py-3">
        <div className="text-sm font-medium text-gray-500">
          {format(new Date(selectedYear, month), 'MMM')}
        </div>
        <div className="grid grid-cols-5 md:grid-cols-7 gap-x-3 md:gap-x-4 gap-y-0 md:gap-y-1">
          {days.map(day => {
            const dayTransactions = getTransactionsForDay(selectedYear, month, day);
            return (
              <Tooltip key={`${month}-${day}`}>
                <TooltipTrigger asChild className=''>
                  <button
                    className={cn(
                      'h-2 w-2 md:w-3 md:h-3 rounded-sm transition-all hover:ring-2 hover:ring-offset-1 dark:bg-gray-600',
                      getColorForDay(dayTransactions)
                    )}
                    onClick={() => setSelectedDay(dayTransactions.transactions)}
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <div className="text-sm">
                    <div className="font-medium">
                      {format(new Date(selectedYear, month, day), 'PP')}
                    </div>
                    {dayTransactions.transactions.map(t => (
                      <div key={t._id} className="text-xs">
                        {t.type === 'income' ? '+' : '-'}${Math.abs(t.amount)} - {t.category.categoryName}
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    );
  };

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="pl-3 pr-12 bg-white dark:bg-transparent rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(parseInt(value))}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map(year => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {Array.from({ length: 12 }, (_, i) => renderMonth(i))}
      </div>

      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 ">
            {selectedDay?.map(transaction => (
              <div
                key={transaction._id}
                className={cn(
                  'p-4 rounded-lg dark:bg-black/50',
                  transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'
                )}
              >
                <div className="flex justify-between items-start ">
                  <div>
                    {/* <div className="font-medium">{transaction.category.categoryName}</div> */}
                    <div className="text-sm text-gray-500">{transaction.description}</div>
                    <div className="text-xs text-gray-400">
                      {format(transaction.date, 'PPp')}
                    </div>
                  </div>
                  <div className={cn(
                    'font-medium',
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
