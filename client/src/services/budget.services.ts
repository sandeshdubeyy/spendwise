import api from "./api.services";

export interface Budget {
    _id: string;
    category: string | { _id: string; name: string };
    amount: number;
    month: number;
    year: number;
}

export interface BudgetInput {
    category: string;
    amount: number;
    month: number;
    year: number;
}

export interface BudgetSummary {
    totalBudget: number;
    totalCategories: number;
    currentMonthBudget: number;
    highestBudgetCategory: {
        category: string;
        amount: number;
    } | null;
}


export const getBudgets = async (params?: { month?: number; year?: number }) => {
    const { data } = await api.get<{ budgets: Budget[] }>("/budgets", { params });
    return data.budgets;
};

export const getBudgetById = async (id: string) => {
    const { data } = await api.get<{ budget: Budget }>(`/budgets/${id}`);
    return data.budget;
};

export const createBudget = async (payload: BudgetInput) => {
    const { data } = await api.post<{ message: string; budget: Budget }>("/budgets", payload);
    return data.budget;
};

export const updateBudget = async (id: string, payload: Partial<BudgetInput>) => {
    const { data } = await api.put<{ message: string; budget: Budget }>(`/budgets/${id}`, payload);
    return data.budget;
};

export const deleteBudget = async (id: string) => {
    await api.delete(`/budgets/${id}`);
};

export const getBudgetSummary = async () => {
    const { data } = await api.get<BudgetSummary>("/budgets/summary");
    return data;
};