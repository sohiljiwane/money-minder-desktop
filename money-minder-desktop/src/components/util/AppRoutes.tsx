import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../../screens/login/Login";
import Register from "../../screens/register/Register";
import Dashboard from "../../screens/dashboard/Dashboard";
import EditExpense from "../../screens/edit-expense/EditExpense";
import ExpenseList from "../../screens/expense-list/ExpenseList";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard id={0} description={""} amount={0} category={""} date={""} />} />
       <Route path="/editExpense/:id" element={<EditExpense />} />
       <Route path="/expense" element={<ExpenseList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
