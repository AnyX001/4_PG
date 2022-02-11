const { request } = require('express');

const UserSchema=require('../models/user');
const { session } = require('passport');



const app_createUser=async(req,res)=>{
    let checkId=await UserSchema.findOne({eMail: req.user.emails[0].value})
    console.log(checkId)
    if(checkId==null)
    {
    const userSchema=new UserSchema({
        name        : req.user.displayName ,
        eMail       : req.user.emails[0].value,
    })
    userSchema.save()
        .then((result)=>{
            console.log('created')
            res.send(result);                       // change it to index page redirect 
        }).catch((err)=>{
            res.send(err);
            console.log(err);
        })                        
    }else
    {
        res.send("email already present:- logging in")// change it to index page redirect 
    }
}

const app_User=(req,res)=>{ // it will send the name of user when logged in
        

    if(session.name==req.user.displayName)
    {
    res.send(req.user.displayName);
    console.log('req.user.displayName');
    }else
    res.send('no user logged in');
    
    
}
module.exports={
    app_createUser,
    app_User,
    
}