
export interface ExpenseFormData {
    type: 'Investment' | 'Expense';
    amount: string;
    category: string;
    date: string;
    description: string;
    tags: string[];
  }