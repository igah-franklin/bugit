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
  
  