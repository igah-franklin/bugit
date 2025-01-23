export interface ICategories {
  _id: string;
  categoryName: string;
}

export interface IGridTransaction {
    id: string;
    amount: number;
    type: 'income' | 'expense';
    date: string;
    category: string;
    description: string;
  }
  export type ITransactions = {
    _id: string;
    category: ICategories;
    description: string;
    type: 'income' | 'expense';
    amount: number;
    date: Date;
  };
  
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

