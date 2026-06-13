import express,{Application} from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/configs/db.configs";

dotenv.config();

const app: Application = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("SpendWise API");
})

const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})