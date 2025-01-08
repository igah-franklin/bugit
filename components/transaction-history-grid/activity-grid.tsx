import React, { useState } from 'react';
;

import { IDayData, IGridTransaction } from '@/types/ITransaction';
import { TransactionModal } from './activity-grid-modal';

interface ActivityGridProps {
  transactions: IGridTransaction[];
  year: number;
}

export function ActivityGrid({ transactions, year }: ActivityGridProps) {
  const [selectedDay, setSelectedDay] = useState<IDayData | null>(null);

  const today = new Date(); // Current date
  const isFutureYear = year > today.getFullYear();

  // Helper to check if a year is a leap year
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  // Returns the number of days in a month for a given year
  const getDaysInMonth = (month: number, year: number) => {
    if (month === 1) {
      // February
      return isLeapYear(year) ? 29 : 28;
    }
    if ([3, 5, 8, 10].includes(month)) {
      // April, June, September, November
      return 30;
    }
    return 31; // All other months
  };

  // Generate all days in a given year up to today (if it's a future year)
  const getDaysInYear = (year: number) => {
    const days: IDayData[] = [];
    for (let month = 0; month < 12; month++) {
      const daysInMonth = getDaysInMonth(month, year);
      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        // Stop adding future dates if year is greater than today
        if (isFutureYear && currentDate > today) break;

        const dateStr = currentDate.toISOString().split('T')[0];
        const dayTransactions = transactions.filter((t) => t.date === dateStr);

        days.push({
          date: dateStr,
          transactions: dayTransactions,
          totalIncome: dayTransactions
            .filter((t) => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0),
          totalExpense: dayTransactions
            .filter((t) => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0),
        });
      }
    }
    return days;
  };

  const days = getDaysInYear(year);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getBoxColor = (day: IDayData) => {
    if (day.totalIncome === 0 && day.totalExpense === 0) return 'bg-gray-100';
    if (day.totalIncome > 0 && day.totalExpense > 0) return 'bg-amber-500';
    if (day.totalIncome > 0) return 'bg-green-500';
    return 'bg-red-500';
  };

  const formatTooltip = (day: IDayData) => {
    const date = new Date(day.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return `
      ${date}
      ${day.totalIncome > 0 ? `\nIncome: $${day.totalIncome}` : ''}
      ${day.totalExpense > 0 ? `\nExpense: $${day.totalExpense}` : ''}
    `;
  };

  return (
    <div className="p-4">
      <div className="flex">
        <div className="w-8 mr-2">
          {weekdays.map((day) => (
            <div key={day} className="h-4 text-xs text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div>
          <div className="flex mb-2">
            {months.map((month) => (
              <div key={month} className="w-12 text-xs text-gray-500">
                {month}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-53 gap-1">
            {days.map((day) => (
              <div
                key={day.date}
                className={`w-4 h-4 rounded-sm cursor-pointer ${getBoxColor(day)} hover:ring-2 hover:ring-gray-400`}
                style={{ gridRow: new Date(day.date).getDay() + 1 }}
                title={formatTooltip(day)}
                onClick={() => day.transactions.length > 0 && setSelectedDay(day)}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedDay && (
        <TransactionModal
          transactions={selectedDay.transactions}
          date={selectedDay.date}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
}
