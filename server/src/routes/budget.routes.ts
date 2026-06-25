import express from "express";
import { createBudget, deleteBudget, getBudgetById, getBudgets, updateBudget } from "../controllers/budget.controllers";

const budgetRouter = express.Router();

budgetRouter.get("/",getBudgets);
budgetRouter.post("/",createBudget);

budgetRouter.get("/:id", getBudgetById);
budgetRouter.put("/:id", updateBudget);
budgetRouter.delete("/:id", deleteBudget);

export default budgetRouter;