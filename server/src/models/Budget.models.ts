import mongoose, { Schema, Document } from "mongoose";

export interface IBudget extends Document {
  category: mongoose.Types.ObjectId;
  amount:number;
  month:number;
  year:number;
  user: mongoose.Types.ObjectId;
};

const budgetSchema = new Schema<IBudget>(
    {
        category: {
            type: mongoose.Types.ObjectId,
            ref:"Category",
            required:true,
        },
        amount:{
            type:Number,
            required:true,
        },
        month:{
            type:Number,
            required:true,
        },
        year:{
            type:Number,
            required:true,
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

export default mongoose.model<IBudget>("Budget",budgetSchema);