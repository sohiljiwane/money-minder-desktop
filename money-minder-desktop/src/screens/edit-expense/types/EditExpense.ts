
export interface ExpenseFormData {
    id: number;
    type: 'Investment' | 'Expense';
    amount: number;
    category: string;
    expense_date: string;
    description: string;
    tags: string[];
  }

export interface TagData {
  id: number;
  expense_id: number;
  tag_name: string;
}