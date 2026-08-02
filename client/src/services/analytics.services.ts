import api from "./api.services";

export interface CategorySpending {
    category: string;
    totalSpent: number;
}

export interface MonthlyTrendItem {
    month: string;
    totalSpent: number;
}

export interface BudgetVsActualItem {
    category: string;
    budget: number;
    spent: number;
    remaining: number;
    status: "within_budget" | "over_budget";
    month: number;
    year: number;
}

export interface PaymentMethodBreakdownItem {
    paymentMethod: string;
    totalSpent: number;
}

export interface SavingsRateTrendItem {
    month: string;
    totalIncome: number;
    totalExpense: number;
    savingsRate: number;
}

export interface CategoryMoMItem {
    category: string;
    currentSpent: number;
    previousSpent: number;
    percentageChange: number;
}

export interface HeatmapItem {
    date: string;
    totalSpent: number;
    transactionCount: number;
}

export interface WeekdayVsWeekend {
    totalWeekdaySpent: number;
    totalWeekendSpent: number;
    weekdayAvgPerDay: number;
    weekendAvgPerDay: number;
    ratio: number;
}

export interface HolidaySpending {
    year: number;
    countryCode: string;
    holidayAvgPerDay: number;
    nonHolidayAvgPerDay: number;
    holidaysWithSpending: number;
}

export const getCategoryWiseSpending = async () => {
    const { data } = await api.get<{ spending: CategorySpending[] }>(
        "/analytics/category-wise-spending"
    );
    return data.spending;
};

export const getMonthlySpendingTrend = async () => {
    const { data } = await api.get<{ trend: MonthlyTrendItem[] }>(
        "/analytics/monthly-spending-trend"
    );
    return data.trend;
};

export const getBudgetVsActual = async () => {
    const { data } = await api.get<{ analytics: BudgetVsActualItem[] }>(
        "/analytics/budget-vs-actual"
    );
    return data.analytics;
};

export const getPaymentMethodBreakdown = async () => {
    const { data } = await api.get<{ breakdown: PaymentMethodBreakdownItem[] }>(
        "/analytics/payment-method-breakdown"
    );
    return data.breakdown;
};

export const getSavingsRateTrend = async () => {
    const { data } = await api.get<{ trend: SavingsRateTrendItem[] }>(
        "/analytics/savings-rate-trend"
    );
    return data.trend;
};

export const getCategoryMonthOverMonth = async () => {
    const { data } = await api.get<{ comparison: CategoryMoMItem[] }>(
        "/analytics/category-month-over-month"
    );
    return data.comparison;
};

export const getSpendingHeatmap = async () => {
    const { data } = await api.get<{ heatmap: HeatmapItem[] }>(
        "/analytics/spending-heatmap"
    );
    return data.heatmap;
};

export const getWeekdayVsWeekendSpending = async () => {
    const { data } = await api.get<WeekdayVsWeekend>("/analytics/weekday-vs-weekend");
    return data;
};

export const getHolidaySpendingComparison = async (params?: {
    year?: number;
    countryCode?: string;
}) => {
    const { data } = await api.get<HolidaySpending>("/analytics/holiday-spending", {
        params,
    });
    return data;
};