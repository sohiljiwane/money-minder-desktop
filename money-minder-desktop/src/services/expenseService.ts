import {
  ExpenseFormData,
  TagData,
} from "../types/EditExpense";
import { ExpenseListProps } from "../types/ExpenseList";
import axiosInstance from "./axiosInstance";

export const expenseService = {
  fetchExpenses: async () => {
    const response = await axiosInstance.get<ExpenseListProps[]>(
      "/expenses/list"
    );
    return response.data;
  },
  fetchExpense: async (id: number) => {
    const response = await axiosInstance.get<
      ExpenseFormData & { tags: string[] | TagData[] }
    >(`/expenses/edit/${id}`);
    return response.data;
  },
};
