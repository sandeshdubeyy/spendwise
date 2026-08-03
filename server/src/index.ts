import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./configs/db.configs";
import authRouter from "./routes/auth.routes";
import categoryRouter from "./routes/category.routes";
import expenseRouter from "./routes/expense.routes";
import budgetRouter from "./routes/budget.routes";
import savingGoalRouter from "./routes/savingGoal.routes";
import analyticsRouter from "./routes/analytics.routes";

dotenv.config();

const app: Application = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SpendWise API");
});

app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/budgets", budgetRouter);
app.use("/api/saving-goal", savingGoalRouter);
app.use("/api/analytics", analyticsRouter);

export default app;