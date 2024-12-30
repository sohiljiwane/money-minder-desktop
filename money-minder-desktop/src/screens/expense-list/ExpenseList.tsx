import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { ChevronRight, PlusCircle, Wallet } from "lucide-react";
import { Button } from "../../components/ui/button";
import SidebarLayout from "../../components/common/SidebarLayout";
import { useNavigate } from "react-router-dom";
import { ExpenseListProps } from "../../types/ExpenseList";
import { expenseService } from "../../services/expenseService";

const ExpenseList: React.FC = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<ExpenseListProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    try {
        setIsLoading(true);
        const data = await expenseService.fetchExpenses();
        setExpenses(data);
        setError(null);
    } catch (err) {
        setError('Failed to fetch expenses');
        console.log(err);
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleExpenseClick = (expenseId: number): void => {
    navigate(`/editExpense/${expenseId}`, { state: { id: expenseId}});
  };

  const handleAddExpense = (): void => {
    // Add logic to handle adding a new expense
    navigate('/editExpense');
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-emerald-50 p-4 w-inherit">
        <div className="max-w-6xl mx-auto space-y-4">
          <Card className="w-full">
            <CardHeader className="bg-emerald-600 text-white">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-6 h-6" />
                  Expense List
                </CardTitle>
                <button
                  onClick={handleAddExpense}
                  className="text-white hover:bg-emerald-700 p-2 rounded-full transition-colors"
                >
                  <PlusCircle className="w-6 h-6" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-emerald-200">
                {expenses.map((expense: ExpenseListProps) => (
                  <li
                    key={expense.id}
                    onClick={() => handleExpenseClick(expense.id)}
                    className="p-4 hover:bg-emerald-100 cursor-pointer flex justify-between items-center transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-emerald-800">
                        {expense.description}
                      </p>
                      <p className="text-sm text-emerald-600">
                        {expense.category} • {expense.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-700">
                        ${expense.amount.toFixed(2)}
                      </span>
                      <ChevronRight className="text-emerald-500 w-5 h-5" />
                    </div>
                  </li>
                ))}
              </ul>
              {expenses.length === 0 && (
                <div className="text-center py-8 text-emerald-600">
                  No expenses found. Add your first expense!
                </div>
              )}
            </CardContent>
          </Card>

          {/* New Add Expense Button Outside the Card */}
          <Button
            onClick={handleAddExpense}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add New Expense
          </Button>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default ExpenseList;
