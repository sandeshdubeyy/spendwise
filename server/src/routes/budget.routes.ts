import express from "express";
import { createBudget, getBudgetById, getBudgets, updateBudget } from "../controllers/budget.controllers";

const budgetRouter = express.Router();

budgetRouter.get("/",getBudgets);
budgetRouter.post("/",createBudget);
budgetRouter.get("/:id", getBudgetById);
budgetRouter.put("/:id", updateBudget);

export default budgetRouter;