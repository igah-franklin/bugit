export interface IGridTransaction {
    id: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
    category: string;
    description: string;
  }
  
  export interface IDayData {
    date: string;
    transactions: IGridTransaction[];
    totalIncome: number;
    totalExpense: number;
  }