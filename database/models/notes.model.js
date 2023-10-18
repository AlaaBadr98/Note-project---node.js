import mongoose from "mongoose";

const noteSchema=mongoose.Schema({
    title:String,
    desc:String,
    createdBy:{
        type :mongoose.SchemaTypes.ObjectId,
        ref:"user"
    }
})

export const noteModel=mongoose.model('note',noteSchema )