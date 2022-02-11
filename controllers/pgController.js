const { request } = require('express');
const PgSchema=require('../models/pg');
const RatingSchema=require('../models/rating');
const UserSchema=require('../models/user');

const pg_pgIndex=async(req,res)=>{
    var pgList=[];
    await PgSchema.find()
    .then((result)=>{
        result.forEach(result=>{
        pgList.push(result)
        
        })
    }).catch((err)=>{res.send(err)})
    res.send(pgList);
    
}
const pg_addPg=async(req,res)=>{        // ADDing new PG
    var request=req.body;
    const post=new PgSchema
    (
    {
        pgName       :request.pgName,
        phNo         :request.phNo,
        pgType       :request.pgType,//type:String,//(boys / girls / both)
        vacancies    :request.vacancies,
        rent         :request.rent,
        dateOfRent   :request.dateOfRent,
        numberOfMeals:request.numberOfMeals,
        holidayMeals :request.holidayMeals,
        ownerName    :req.user.displayName,
        rating       :[(0,0)],// saved as a 2d array where first vale is avg rating and 2nd value is no. of raters
        location     :request.location,
        wifi         :request.wifi,//bool
        pgDiscription:request.pgDiscription,
    }
    );
    await post.save()
   // res.send("saved pg")
   await UserSchema.update({eMail: req.user.emails[0].value},{type:"PGowner"})
   

}

const pg_pgDetails=async(req,res)=>{
    var id=req.params.id;
    console.log(id)
    await PgSchema.findById(id)
    .then((result)=>{
        if(result)
        res.send(result);
        else
        res.send('not found')
        
    }).catch((err)=>{res.send(err)})
}

const pg_pgRating=async(req,res)=>{
    var pgID=req.params._id;
    var userID=req.user.displayName;
    var reqRate=req.body.rating;
    var reqreview=req.body.review;
    await PgSchema.findById(pgId)
    .then((result)=>{
        if(result){
            const newrating=new RatingSchema(
            {
                pgId:pgID,
                userId:userID,
                rating:reqRate,
                review:reqreview,
            })
            newrating.save()
        }
        
    }).catch((err)=>{res.send(err)})
    PgSchema.update({_id:pgID},{rating:[((rating(0,0)+reqRate)/rating(0,1)+1,rating(0,1)+1)]});

}

const pg_EditpgDetails=async(req,res)=>{
    var pgId=req.params._id;
    await PgSchema.findById(pgId)
    .then((result)=>{
        PgSchema.update({_id:pgID},
        {
        pgName       :request.pgName,
        phNo         :request.phNo,
        pgType       :request.pgType,//type:String,//(boys / girls / both)
        vacancies    :request.vacancies,
        rent         :request.rent,
        dateOfRent   :request.dateOfRent,
        numberOfMeals:request.numberOfMeals,
        holidayMeals :request.holidayMeals,
        ownerName    :req.user.displayName,
        location     :request.location,
        wifi         :request.wifi,
        pgDiscription:request.pgDiscription,
        });
    })
}
module.exports={
    pg_pgIndex,
    pg_addPg,
    pg_pgDetails,
    pg_pgRating,
    pg_EditpgDetails,
}