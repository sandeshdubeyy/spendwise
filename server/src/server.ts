import express,{Application} from "express";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.models";

import connectDB from "./configs/db.configs";
import authRouter from "./routes/auth.routes";

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

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})