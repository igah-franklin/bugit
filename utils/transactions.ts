import { IExpense, IGridTransaction, IIncome } from "@/types/ITransaction";

export type ITransaction = {
    id: string;
    category: string;
    description: string;
    type: 'income' | 'expense';
    amount: number;
    date: Date;
  };
  
  export const transactions: ITransaction[] = [
    {
      id: '1',
      category: 'Salary',
      description: 'Monthly salary',
      type: 'income',
      amount: 5000,
      date: new Date('2023-01-01'),
    },
    {
      id: '2',
      category: 'Rent',
      description: 'Monthly rent',
      type: 'expense',
      amount: 1500,
      date: new Date('2023-01-05'),
    },
    {
      id: '3',
      category: 'Groceries',
      description: 'Weekly groceries',
      type: 'expense',
      amount: 200,
      date: new Date('2023-01-10'),
    },
    {
      id: '4',
      category: 'Freelance',
      description: 'Web development project',
      type: 'income',
      amount: 1000,
      date: new Date('2023-01-15'),
    },
    {
      id: '5',
      category: 'Utilities',
      description: 'Electricity bill',
      type: 'expense',
      amount: 100,
      date: new Date('2023-01-20'),
    },
  ];
  

// Sample data - in a real app this would come from an API/database
export const gridTransactions: IGridTransaction[] = [
  {
    id: '1',
    amount: 2500,
    type: 'income',
    date: '2024-03-15',
    category: 'Salary',
    description: 'Monthly salary'
  },
  {
    id: '2',
    amount: 50,
    type: 'expense',
    date: '2024-03-15',
    category: 'Food',
    description: 'Grocery shopping'
  },
  {
    id: '3',
    amount: 1000,
    type: 'income',
    date: '2024-03-10',
    category: 'Freelance',
    description: 'Web development project'
  },
  {
    id: '4',
    amount: 800,
    type: 'expense',
    date: '2024-03-05',
    category: 'Rent',
    description: 'Monthly rent'
  },
  {
    id: '5',
    amount: 1000,
    type: 'income',
    date: '2025-01-05',
    category: 'Rent',
    description: 'Monthly rent'
  },
  {
    id: '6',
    amount: 600,
    type: 'expense',
    date: '2025-01-07',
    category: 'Food',
    description: 'Monthly rent'
  },
  {
    id: '7',
    amount: 900,
    type: 'income',
    date: '2025-01-07',
    category: 'Gifting',
    description: 'Monthly rent'
  }
];


export const expenses: IExpense[] = [
  {
    id: '1',
    category: 'Salary',
    description: 'Monthly salary',
    amount: 5000,
    date: '2023-01-01',
  },
  {
    id: '2',
    category: 'Rent',
    description: 'Monthly rent',
    amount: 1500,
    date: '2023-01-05',
  },
  {
    id: '3',
    category: 'Groceries',
    description: 'Weekly groceries',
    amount: 200,
    date: '2023-01-10',
  },
  {
    id: '4',
    category: 'Freelance',
    description: 'Web development project',
    amount: 1000,
    date: '2023-01-15',
  },
  {
    id: '5',
    category: 'Utilities',
    description: 'Electricity bill',
    amount: 100,
    date: '2023-01-20',
  },
];
  
export const income: IIncome[] = [
  {
    id: '1',
    category: 'Salary',
    description: 'Monthly salary',
    amount: 5000,
    date: '2023-01-01',
  },
  {
    id: '2',
    category: 'Rent',
    description: 'Monthly rent',
    amount: 1500,
    date: '2023-01-05',
  },
  {
    id: '3',
    category: 'Groceries',
    description: 'Weekly groceries',
    amount: 200,
    date: '2023-01-10',
  },
];
  