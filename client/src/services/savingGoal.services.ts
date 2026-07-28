import api from "./api.services";

export interface SavingsGoal {
    _id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    deadline?: string;
}

export interface SavingsGoalInput {
    title: string;
    targetAmount: number;
    currentAmount?: number;
    deadline?: string;
}

export interface GoalProgress {
    title: string;
    targetAmount: number; 
    currentAmount: number;
    remainingAmount: number;
    progressPercentage: number;
    status: "completed" | "in_progress";
    deadline?: string;
}

export const getSavingsGoals = async () => {
    const { data } = await api.get<{ goals: SavingsGoal[] }>("/saving-goal");
    return data.goals;
};

export const getSavingGoalById = async (id: string) => {
    const { data } = await api.get<{ goal: SavingsGoal }>(`/saving-goal/${id}`);
    return data.goal;
};

export const createSavingGoal = async (payload: SavingsGoalInput) => {
    const { data } = await api.post<{ message: string; savingGoal: SavingsGoal }>("/saving-goal", payload);
    return data.savingGoal; // backend returns it as "category" — keeping as-is
};

export const updateSavingsGoal = async (id: string, payload: Partial<SavingsGoalInput>) => {
    const { data } = await api.put<{ message: string; goal: SavingsGoal }>(`/saving-goal/${id}`, payload);
    return data.goal;
};

export const deleteSavingsGoal = async (id: string) => {
    await api.delete(`/saving-goal/${id}`);
};

export const getGoalProgress = async () => {
    const { data } = await api.get<{ progress: GoalProgress[] }>("/saving-goal/progress");
    return data.progress;
};