const { request } = require('express');

const adminSchema=require('../models/admin');
const UserSchema=require('../models/user');
const PgSchema=require('../models/pg');
const { session } = require('passport');
const RatingSchema=require('../models/rating');

const admin_allUser=async(req,res)=>{
    var userList=[];
    await UserSchema.find()
    .then((result)=>{
        result.forEach(result=>{
        userList.push(result.eMail+result.name)
        })
    }).catch((err)=>{res.send(err)})  
    res.send(userList);
}

const admin_deleteReview=async(req,res)=>{
    var rateID=req.params.id;
    await RatingSchema.remove({_id: rateID}, (err, result) => {
        if (err) return console.log(err);
        console.log("deleted")
      })

}
const admin_deletePg=async(req,res)=>{
    var pgID=req.params.id;
    await PgSchema.remove({_id: pgID}, (err, result) => {
        if (err) return console.log(err);
        console.log("deleted")
      })

}

module.exports={
    admin_allUser,
    admin_deleteReview,
    admin_deletePg
}