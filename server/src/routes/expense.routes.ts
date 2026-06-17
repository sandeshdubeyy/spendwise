import express from "express";
import { createExpense, deleteExpense, getCurrentBalance, getExpenseById, getExpenses, getTotalExpense, getTotalIncome, updateExpense } from "../controllers/expense.controllers";


const expenseRouter = express.Router();

//specific routes
expenseRouter.post("/",createExpense);
expenseRouter.get("/",getExpenses);
expenseRouter.get("/total-income",getTotalIncome);
expenseRouter.get("/total-expense",getTotalExpense);
expenseRouter.get("/current-balance",getCurrentBalance);

//dynamic routes
expenseRouter.get("/:id", getExpenseById);
expenseRouter.put("/:id", updateExpense);
expenseRouter.delete("/:id", deleteExpense);

export default expenseRouter;