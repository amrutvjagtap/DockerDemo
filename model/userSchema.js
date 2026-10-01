import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:String,
    technology:String,
    age:Number,
})

export const UserModle=mongoose.model("UserModle", userSchema);