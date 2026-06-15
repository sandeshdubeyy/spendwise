import mongoose, { Schema, Document } from "mongoose";

export interface ISavingsGoal extends Document {
  title: string;
  targetAmount:number;
  currentAmount:number;
  deadline?:Date;
  user: mongoose.Types.ObjectId;
};


const savingsGoalSchema = new Schema<ISavingsGoal>(
    {
        title: {
            type: String,
            required:true,
        },
        targetAmount:{
            type:Number,
            required:true,
        },
        currentAmount:{
            type:Number,
            default: 0,
        },
        deadline:{
            type:Date,
        },
        user:{
            type:mongoose.Types.ObjectId,
            ref: "User",
            required:true,
        }
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<ISavingsGoal>("SavingsGoal",savingsGoalSchema);