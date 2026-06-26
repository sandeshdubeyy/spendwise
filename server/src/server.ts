import express,{Application} from "express";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.models";

import connectDB from "./configs/db.configs";

//import routers
import authRouter from "./routes/auth.routes";
import categoryRouter from "./routes/category.routes";
import expenseRouter from "./routes/expense.routes";
import budgetRouter from "./routes/budget.routes";
import savingGoalRouter from "./routes/savingGoal.routes";

dotenv.config();

const app: Application = express();

connectDB();

//middleware
app.use(cors());
app.use(express.json());    

//api routes
app.get('/',(req,res)=>{
    res.send("SpendWise API");
})
app.use('/api/auth',authRouter)
app.use('/api/categories',categoryRouter);
app.use('/api/expenses',expenseRouter);
app.use('/api/budgets',budgetRouter);
app.use('/api/saving-goal',savingGoalRouter);


const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})