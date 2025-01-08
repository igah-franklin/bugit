import React from 'react';

import { X } from 'lucide-react';
import { IGridTransaction } from '@/types/ITransaction';

interface TransactionModalProps {
  transactions: IGridTransaction[];
  date: string;
  onClose: () => void;
}

export function TransactionModal({ transactions, date, onClose }: TransactionModalProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{formattedDate}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`p-4 rounded-lg ${
                transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{transaction.category}</p>
                  <p className="text-sm text-gray-600">{transaction.description}</p>
                </div>
                <p
                  className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}