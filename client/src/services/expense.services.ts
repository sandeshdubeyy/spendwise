import api from "./api.services";

export type ExpenseType = "income" | "expense";
export type PaymentMethod = "upi" | "cash" | "bank_transfer" | "card";

export interface Expense {
    _id: string;
    title: string;
    amount: number;
    category: string | { _id: string; name: string; };
    type: ExpenseType;
    paymentMethod: PaymentMethod;
    date: string;
    isReccuring: boolean;
    note?: string;
}

export interface GetExpensesParams {
    search?: string;
    type?: ExpenseType;
}


export interface ExpenseInput {
    title: string;
    amount: number;
    category: string;
    type: ExpenseType;
    paymentMethod: PaymentMethod;
    date?: string;
    isReccuring?: boolean;
    note?: string;
}

export const getExpenses = async (params?: GetExpensesParams) => {
    const { data } = await api.get<{ expenses: Expense[] }>("/expenses", { params });
    return data.expenses;
};

export const getExpenseById = async (id: string) => {
    const { data } = await api.get<{ expense: Expense; }>(`/expenses/${id}`);
    return data.expense;
};

export const createExpense = async (payload: ExpenseInput) => {
    const { data } = await api.post<{ message: string; expense: Expense; }>("/expenses", payload);
    return data.expense;
};

export const updateExpense = async (id: string, payload: Partial<ExpenseInput>) => {
    const { data } = await api.put<{ message: string; expense: Expense; }>(`/expenses/${id}`, payload);
    return data.expense;
};

export const deleteExpense = async (id: string) => {
    await api.delete(`/expenses/${id}`);
};

export const getDashboardSummary = async () => {
    const { data } = await api.get<{
        transactionCount: number;
        totalIncome: number;
        totalExpense: number;
        currentBalance: number;
    }>("/expenses/dashboard-summary");
    return data;
};

export const getRecentTransactions = async () => {
    const { data } = await api.get<{ recentTransaction: Expense[]; }>("/expenses/recent-transaction");
    return data.recentTransaction;
};

export const getCategoryWiseSpending = async () => {
    const { data } = await api.get<{ spending: { category: string; totalSpent: number; }[]; }>(
        "/expenses/category-wise-spending"
    );
    return data.spending;
};

export const getMonthlySpendingTrend = async () => {
    const { data } = await api.get<{ trend: { month: string; totalSpent: number; }[]; }>(
        "/expenses/monthly-spending-trend"
    );
    return data.trend;
};

export const getBudgetVsActual = async () => {
    const { data } = await api.get<{ analytics: any[]; }>("/expenses/budget-vs-actual");
    return data.analytics;
};