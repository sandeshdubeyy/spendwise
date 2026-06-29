import express from "express";
import { createBudget, deleteBudget, getBudgetById, getBudgets, updateBudget } from "../controllers/budget.controllers";
import { authMiddleware } from "../middlewares/auth.middlewares";

const budgetRouter = express.Router();

//middleware
budgetRouter.use(authMiddleware);

budgetRouter.get("/",getBudgets);
budgetRouter.post("/",createBudget);

budgetRouter.get("/:id", getBudgetById);
budgetRouter.put("/:id", updateBudget);
budgetRouter.delete("/:id", deleteBudget);

export default budgetRouter;