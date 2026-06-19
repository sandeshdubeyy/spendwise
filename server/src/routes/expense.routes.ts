import express from "express";
import { createExpense, deleteExpense, getCurrentBalance, getDashboardSummary, getExpenseById, getExpenses, getRecentTransactions, getTotalExpense, getTotalIncome, getTransactionCount, updateExpense } from "../controllers/expense.controllers";


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

//dynamic routes
expenseRouter.get("/:id", getExpenseById);
expenseRouter.put("/:id", updateExpense);
expenseRouter.delete("/:id", deleteExpense);

export default expenseRouter;