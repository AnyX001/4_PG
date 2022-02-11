require('dotenv').config()
const express= require('express');
const appController= require('../controllers/appController');
const pgController= require('../controllers/pgController');
const adminController= require('../controllers/adminController');
const passport = require('passport');
const router = express.Router();
const cookieSession = require('cookie-session');
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express')

//middlware 
router.use(passport.initialize())

router.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))


router.use(passport.session())





//app/user controller routes

/**
 *@swagger
 * /create_user:
 *  get:
 *     description: saves new user to db  send to homepage after google login
 *     responses:
 *        '200':
 *         description: sucessfull
*/
router.get("/create_user",appController.app_createUser);


/**
 *@swagger
 * /user:
 *  get:
 *     description: get user :id/current user details
 *     responses:
 *        '200':
 *         description: sucessfull
*/
router.get("/user",appController.app_User);   //get user id and details



//pg controller routes
/**
 *@swagger
 * /allPg:
 *  get:
 *     description: gives a list of all pg's
 *     responses:
 *        '200':
 *         description: sucessfull
*/
router.get("/allPg",pgController.pg_pgIndex);//send a list of all pg's


/**
 *@swagger
 * /post_Pg:
 *   post:
 *     description: add pg to db
 *     parameters:
 *     - name: pgName
 *       description: name of pg
 *       in: formData
 *       type: String
 *     - name: phNo
 *       description: Phone No.
 *       in: formData
 *       type: String
 *     - name: pgType
 *       description: Gender (male/femal/both)
 *       in: formData
 *       type: String
 *     - name: vacancies
 *       description: no. of rooms availabe
 *       in: formData
 *       type: Number
 *     - name: rent
 *       description: Rent of Pg
 *       in: formData
 *       type: Number
 *     - name: dateOfRent
 *       description: Date of rent /DD only
 *       in: formData
 *       type: Number
 *     - name: numberOfMeals
 *       description: no. of times meal served
 *       in: formData
 *       type: Number
 *     - name: holidayMeals
 *       description: Lunch served
 *       in: formData
 *       type: Bool
 *     - name: ownerName
 *       description: name of Owner
 *       in: formData
 *       type: String
 *     - name: location
 *       description: address of pg
 *       in: formData
 *       type: String
 *     - name: wifi
 *       description: wifi available
 *       in: formData
 *       type: Bool
 *     - name: pgDiscription
 *       description: Any description of pg
 *       in: formData
 *       type: String
 *     responses:
 *        '200':
 *         description: sucessfull
*/
router.post("/post_Pg",pgController.pg_addPg);//add pg to db



/**
 *@swagger
 * /pgDetails/{orderId}:
 *  get:
 *     description: give pg details 
 *     parameters:
 *     - name: orderId
 *       description: :id
 *       in: path
 *       type: String
 *     responses:
 *        '200':
 *         description: sucessfull
*/
router.get("/pgDetails/:id",pgController.pg_pgDetails);//to check pg details


/**
 *@swagger
 * /pgRatings/{orderId}:
 *   post:
 *     description: add rating to pg 
 *     parameters:
 *     - name: orderId
 *       description: :id
 *       in: path
 *       type: String
 *     - name: pgId
 *       description: pg id
 *       in: formData
 *       type: String
 *     - name: userId
 *       description: user id
 *       in: formData
 *       type: String
 *     - name: rating
 *       description: rate 0-5
 *       in: formData
 *       type: Number
 *     - name: review
 *       description: review
 *       in: formData
 *       type: String
 *     responses:
 *        '200':
 *         description: sucessfull
*/
router.post("/pgRating/:id",pgController.pg_pgRating);// add rating to pg (id get by links in frontend)


/**
 *@swagger
 * /pgDetails/{orderId}/edit:
 *   post:
 *     description: edit :id pg details
 *     parameters:
 *     - name: orderId
 *       description: :id
 *       in: path
 *       type: String
 *     - name: pgName
 *       description: name of pg
 *       in: formData
 *       type: String
 *     - name: phNo
 *       description: Phone No.
 *       in: formData
 *       type: String
 *     - name: pgType
 *       description: Gender (male/femal/both)
 *       in: formData
 *       type: String
 *     - name: vacancies
 *       description: no. of rooms availabe
 *       in: formData
 *       type: Number
 *     - name: rent
 *       description: Rent of Pg
 *       in: formData
 *       type: Number
 *     - name: dateOfRent
 *       description: Date of rent /DD only
 *       in: formData
 *       type: Number
 *     - name: numberOfMeals
 *       description: no. of times meal served
 *       in: formData
 *       type: Number
 *     - name: holidayMeals
 *       description: Lunch served
 *       in: formData
 *       type: Bool
 *     - name: ownerName
 *       description: name of Owner
 *       in: formData
 *       type: String
 *     - name: location
 *       description: address of pg
 *       in: formData
 *       type: String
 *     - name: wifi
 *       description: wifi available
 *       in: formData
 *       type: Bool
 *     - name: pgDiscription
 *       description: Any description of pg
 *       in: formData
 *       type: String
 *     responses:
 *        '200':
 *         description: sucessfull
*/
router.post("/pgDetails/:id/edit",pgController.pg_EditpgDetails);//edit pg details


//admin controller routes
/**
 *@swagger
 * /admin/allUsers:
 *  get:
 *     description: give a list of all users
 *     responses:
 *        '200':
 *         description: sucessfull
*/
router.get("/admin/allUsers",adminController.admin_allUser);  //get a list of all users


/**
 *@swagger
 * /admin/delete_review/{orderId}:
 *  post:
 *     description: delete review of :id
 *     parameters:
 *     - name: orderId
 *       description: :id
 *       in: path
 *       type: String
 *     responses:
 *        '200':
 *         description: sucessfull
*/
router.post("/admin/delete_review/:id",adminController.admin_deleteReview);


/**
 *@swagger
 * /admin/delete_pg/{orderId}:
 *  post:
 *     description: delete pg of :id
 *     parameters:
 *     - name: orderId
 *       description: :id
 *       in: path
 *       type: String
 *     responses:
 *        '200':
 *         description: sucessfull
*/
router.post("/admin/delete_pg/:id",adminController.admin_deletePg);

//passport controller routes 



/**
 *@swagger
 * /google:
 *  get:
 *     description: google login
 *     responses:
 *        '200':
 *         description: sucessfull
*/
router.get("/google",passport.authenticate('google',{scope:['profile','email']}));//google login
 //callback for after authentication has been made & failed if authentication failed
router.get("/google/callback",passport.authenticate('google',{failureRedirect:'/failed'}),
function(req,res){
    //sucess authenticate redirect home
    res.redirect("/create_user")               
   // res.send({name:req.user.displayName,email:req.user.emails[0].value,pic:req.user.photos[0].value });

});

//logout
/**
 *@swagger
 * /logout:
 *  get:
 *     description: logout and redirect to '/'
 *     responses:
 *        '200':
 *         description: sucessfull
*/
router.get('/logout',(req,res)=>{
    req.session=null;
    req.logout();
    res.redirect('/');
})

//exporting all routes
module.exports  = router;