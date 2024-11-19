import React, { useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import { Expense } from "./types/Expense";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Plus, DollarSign, TrendingUp } from "lucide-react";

const COLORS = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];

const Dashboard: React.FC<Expense> = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [expenses, setExpenses] = useState<Expense[]>([
    {id: 1, description: "Groceries", amount: 100, category: "Food", date: "2022-01-01"},
    {id: 2, description: "Transportation", amount: 50, category: "Transport", date: "2022-01-02"},
    {id: 3, description: "Netflix", amount: 200, category: "Entertainment", date: "2022-01-03"},
    {id: 4, description: "Clothing", amount: 100, category: "Clothing", date: "2022-01-04"},
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'Food'
  });

  const categoryData = expenses.reduce((acc: { name: string, value: number}[], expense) => {
    const existingCategory = acc.find(item => item.name === expense.category);
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const topExpenses = [...expenses]
  .sort((a, b) => b.amount - a.amount)
  .slice(0, 5);

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount) {
      setExpenses([...expenses, {
        id: expenses.length + 1,
        description: newExpense.description,
        amount: parseInt(newExpense.amount),
        category: newExpense.category,
        date: new Date().toISOString().split('T')[0]
      }]);
      setNewExpense({ description: '', amount: '', category: 'Food' });
    }
  }

  const links = [
    { name: "Home", path: "/", icon: <i className="fas fa-home"></i> },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <i className="fas fa-chart-line"></i>,
    },
    { name: "Users", path: "/users", icon: <i className="fas fa-users"></i> },
    {
      name: "Settings",
      path: "/settings",
      icon: <i className="fas fa-cog"></i>,
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex">
      <Sidebar
        links={links}
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`flex-1 p-8 h-screen overflow-y-auto transition-margin duration-300
        }`}
      >
        <div className="p-6 max-w-7xl mx-auto space-y-6 bg-emerald-50">
      <h1 className="text-3xl font-bold mb-6 text-emerald-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Expenses Card */}
        <Card className="border-emerald-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <DollarSign className="h-5 w-5" />
              Total Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">${totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>

        {/* Average Expense Card */}
        <Card className="border-emerald-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-700">
              <TrendingUp className="h-5 w-5" />
              Average Expense
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-600">
              ${(totalExpenses / expenses.length).toFixed(2)}
            </p>
          </CardContent>
        </Card>

        {/* Add New Expense Card */}
        <Card className="border-emerald-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-emerald-700">Add Expense</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              className="border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
            />
            <Input
              className="border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500"
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
            />
            <select
              className="w-full p-2 border border-emerald-200 rounded focus:ring-emerald-500 focus:border-emerald-500"
              value={newExpense.category}
              onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
            >
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleAddExpense}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Distribution Chart */}
        <Card className="border-emerald-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-emerald-700">Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: $${entry.value}`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Expenses Card */}
        <Card className="border-emerald-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-emerald-700">Top Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topExpenses.map((expense) => (
                <div key={expense.id} className="flex justify-between items-center p-3 bg-emerald-50 rounded hover:bg-emerald-100 transition-colors">
                  <div>
                    <p className="font-medium text-emerald-900">{expense.description}</p>
                    <p className="text-sm text-emerald-600">{expense.category}</p>
                  </div>
                  <p className="font-bold text-emerald-700">${expense.amount.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses List */}
      <Card className="border-emerald-200 bg-white shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-emerald-700">Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {expenses.slice().reverse().map((expense) => (
              <div key={expense.id} className="flex justify-between items-center p-3 border-b border-emerald-100 hover:bg-emerald-50 transition-colors">
                <div>
                  <p className="font-medium text-emerald-900">{expense.description}</p>
                  <div className="flex gap-2 text-sm text-emerald-600">
                    <span>{expense.category}</span>
                    <span>•</span>
                    <span>{expense.date}</span>
                  </div>
                </div>
                <p className="font-bold text-emerald-700">${expense.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
      </div>
    </div>
  );
};

export default Dashboard;
