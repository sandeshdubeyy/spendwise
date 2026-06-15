import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  user: mongoose.Types.ObjectId;
};

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            trim:true,
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

export default mongoose.model<ICategory>("Category",categorySchema);