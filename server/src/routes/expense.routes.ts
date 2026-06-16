import express from "express";
import { createExpense, deleteExpense, getExpenseById, getExpenses, updateExpense } from "../controllers/expense.controllers";


const expenseRouter = express.Router();

expenseRouter.post("/",createExpense);
expenseRouter.get("/",getExpenses);
expenseRouter.get("/:id", getExpenseById);
expenseRouter.put("/:id", updateExpense);
expenseRouter.delete("/:id", deleteExpense);


export default expenseRouter;