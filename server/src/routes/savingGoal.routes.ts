import express from "express";
import { createSavingGoal, deleteSavingsGoal, getGoalProgress, getSavingGoalById, getSavingsGoals, updateSavingsGoal } from "../controllers/savingGoal.controllers";
import { authMiddleware } from "../middlewares/auth.middlewares";

const savingGoalRouter = express.Router();

//middleware
savingGoalRouter.use(authMiddleware);

savingGoalRouter.post("/",createSavingGoal);
savingGoalRouter.get("/",getSavingsGoals);
savingGoalRouter.get("/progress",getGoalProgress);

//dynamic routes
savingGoalRouter.get("/:id",getSavingGoalById);
savingGoalRouter.put("/:id",updateSavingsGoal);
savingGoalRouter.delete("/:id",deleteSavingsGoal);

export default savingGoalRouter