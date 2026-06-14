import mongoose,{Schema, Document} from "mongoose";

export interface IUser extends Document {
    name:string;
    password:string;
    email:string;
}

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
});

const User = mongoose.model<IUser>("User",userSchema);

export default User;