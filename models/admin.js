const mongoose =require("mongoose");
const Schema = mongoose.Schema;


const adminSchema= new Schema({
    name:
        {
            type:String,
            required:true
        },
    phNo:
        {
            type:String,
            required:true
        },
    eMail:
        {
            type:String,
            required:true
        },
    adminPassword:
        {
            type:String,
            required:true
        }
},{timestamps:true });
const AdminSchema= mongoose.model('AdminSchema',adminSchema);
module.exports=AdminSchema;
