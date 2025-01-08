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


  export interface IExpense {
    id: string;
    amount: number;
    date: string;
    category: string;
    description: string;
  }

  export interface IIncome {
    id: string;
    amount: number;
    date: string;
    category: string;
    description: string;
  }