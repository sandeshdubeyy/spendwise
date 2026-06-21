import express from "express";
import { createExpense, deleteExpense, getBudgetVsActual, getCategoryWiseSpending, getCurrentBalance, getDashboardSummary, getExpenseById, getExpenses, getMonthlySpendingTrend, getRecentTransactions, getTotalExpense, getTotalIncome, getTransactionCount, updateExpense } from "../controllers/expense.controllers";


const expenseRouter = express.Router();

//specific routes
expenseRouter.post("/",createExpense);
expenseRouter.get("/",getExpenses);
expenseRouter.get("/total-income",getTotalIncome);
expenseRouter.get("/total-expense",getTotalExpense);
expenseRouter.get("/current-balance",getCurrentBalance);
expenseRouter.get("/transaction-count",getTransactionCount);
expenseRouter.get("/dashboard-summary",getDashboardSummary);
expenseRouter.get("/recent-transaction",getRecentTransactions);
expenseRouter.get("/category-wise-spending",getCategoryWiseSpending);
expenseRouter.get("/monthly-spending-trend",getMonthlySpendingTrend);
expenseRouter.get("/budget-vs-actual",getBudgetVsActual);

//dynamic routes
expenseRouter.get("/:id", getExpenseById);
expenseRouter.put("/:id", updateExpense);
expenseRouter.delete("/:id", deleteExpense);

export default expenseRouter;