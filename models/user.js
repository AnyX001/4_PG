const mongoose =require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const Schema = mongoose.Schema;


const userSchema= new Schema({
    name:
        {
            type:String,
            required:true
        },
    eMail:
        {
            type:String,
            required:true
        },
    type:
        {
            type:String,
            required:false
        }
},{timestamps:true });
const UserSchema= mongoose.model('UserSchema',userSchema);
module.exports=UserSchema;
