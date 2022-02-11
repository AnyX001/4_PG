require('dotenv').config()
const routes = require('./routes/routes');
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session')
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express')

require('./passport-setup')
//express app
const app= express();

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header
    (
        "Access-Control-Allow-Headers",
        "Origin ,X-Requested-With,Content-Type,Accept,Authorization"
    );
    res.header("Access-Control-Allow-Methods","GET,PUT,PATCH,POST,DELETE,OPTIONS");
    next();
})


//swagger
const swaggerOptions={
    swaggerDefinition:{
      info:{
        title:"4pg API",
        description:"API Information",
        contact:{
          name:"Any-X"
        },
        servers:["http://localhost:5000"]
      }
    },
    apis:['./routes/routes.js']
  };
  const swaggerDocs=swaggerJsDoc(swaggerOptions);
  app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));



app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
//connect to mongodb
const dbURI ='mongodb+srv://anyx:Y35yzhvXhcx3OAkF@nodenuts.cdcxi.mongodb.net/4PG?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then((result)=>{
        console.log("Connected DB")
        app.listen(3000,()=>{// listen for requests
    console.log("listning to 3000 backend");
});
    }).catch((err)=>{
        console.log(err)
    });


//routes
app.use(routes)

// 404 
app.use((req,res)=>{
    res.status(404).send('404');
  });