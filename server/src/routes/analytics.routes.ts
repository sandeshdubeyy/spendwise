import express from "express";
import {
    getCategoryWiseSpending,
    getMonthlySpendingTrend,
    getBudgetVsActual,
    getPaymentMethodBreakdown,
    getSavingsRateTrend,
    getCategoryMonthOverMonth,
    getSpendingHeatmap,
    getWeekdayVsWeekendSpending,
    getHolidaySpendingComparison,
} from "../controllers/analytics.controllers";
import { authMiddleware } from "../middlewares/auth.middlewares";

const analyticsRouter = express.Router();

analyticsRouter.use(authMiddleware);

analyticsRouter.get("/category-wise-spending", getCategoryWiseSpending);
analyticsRouter.get("/monthly-spending-trend", getMonthlySpendingTrend);
analyticsRouter.get("/budget-vs-actual", getBudgetVsActual);
analyticsRouter.get("/payment-method-breakdown", getPaymentMethodBreakdown);
analyticsRouter.get("/savings-rate-trend", getSavingsRateTrend);
analyticsRouter.get("/category-month-over-month", getCategoryMonthOverMonth);
analyticsRouter.get("/spending-heatmap", getSpendingHeatmap);
analyticsRouter.get("/weekday-vs-weekend", getWeekdayVsWeekendSpending);
analyticsRouter.get("/holiday-spending", getHolidaySpendingComparison);

export default analyticsRouter;