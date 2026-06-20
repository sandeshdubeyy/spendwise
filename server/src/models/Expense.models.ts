import mongoose,{Schema, Document} from "mongoose";

export interface IExpense extends Document{
    title:string;
    amount:number;
    category:mongoose.Types.ObjectId;
    type:"income" | "expense";
    paymentMethod:string;
    date:Date;
    isReccuring:boolean;
    note:string;
    user:mongoose.Types.ObjectId;
}

const expenseSchema = new Schema<IExpense>(
    {
        title:{
            type:String,
            required:true,
        },
        amount:{
            type:Number,
            required:true,
        },
        category:{
            type:Schema.Types.ObjectId,
            ref: "Category",
            required:true,
        },
        type:{
            type:String,
            enum:["income","expense"],
            required:true,
        },
        paymentMethod:{
            type:String,
            enum:["upi","cash","bank_transfer","card"],
            required:true,
        },
        date:{
            type:Date,
            default:Date.now,
        },
        isReccuring:{
            type:Boolean,
            default:false,
        },
        note:{
            type:String,
        },
        user:{
            type:mongoose.Types.ObjectId,
            ref: "User",
            required:true,
        },
    },
    {
        timestamps:true,
    }
)

export default mongoose.model<IExpense>("Expense",expenseSchema);