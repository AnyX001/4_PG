const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const RatingSchema=require('../models/rating');

const pgSchema= new Schema({
    pgName:
        {
            type:String,
            required:true
        },
    phNo:
        {
            type:String,
            required:true
        },
    pgType:
        {
            type:String,//(male / female / both)
            required:true
        },
    vacancies:
        {
            type:Number,
            required:true
        },
    rent:
        {
            type:Number,
            required:true
        },
    dateOfRent:
        {
            type:Number,
            required:true
        },
    numberOfMeals:
        {
            type:Number,
            required:true
        },
    holidayMeals:
        {
            type:Boolean,
            required:true
        },
   ratings: [{ "type": Schema.Types.ObjectId, "ref": "RatingSchema" }],

    rating:
        [{
            type:Number,
            min:0,max:5,
            required:false},
            {
            type:Number,
            required:false
        }],
    ownerName:
        {
            type:String,
            required:true
        },
    location:
        {
            type:String,
            required:true
        },
    wifi:
        {
            type:Boolean,
            required:true
        },
    pgDiscription:
        {
            type:String,
            required:true
        },

},{timestamps:true });
const PgSchema= mongoose.model('PgSchema',pgSchema);
module.exports=PgSchema;
