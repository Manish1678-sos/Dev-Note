const express=require('express');
const User=require('../models/Users');
const router=express.Router();
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
const JWT_SECRET="Manishisagoodboy";


const{body, validationResult}= require('express-validator');

//Create a User using:POST "/api/auth/". Doesn't require Auth
router.post('/',
    [body('name','Enter a valid name').isLength({min:3}),
        
        body('email','Enter a valid email').isEmail(),
        body('password','Enter a valid password').isLength({min:5}),],
 //If there are errors, return bad request and the errors       
        async(req,res) =>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});

            }
//Check whether the User with this email exists already
try{ let user =await User.findOne({email:req.body.email});
        
if(user){
return res.status(400).json({error:"Sorry a user with this email already exists"});
}
const salt= await bcrypt.genSalt();

const secPass=await bcrypt.hash(req.body.password, salt)

//Create a new User
     user =await User.create({
        name:req.body.name,
        password:secPass,
        email:req.body.email
    });
    const data={
        user:{
            id:user.id

        }
    };
const authToken=jwt.sign(data,JWT_SECRET);

 res.json({authToken});
    }
//Catch errors
catch(error)
{
    console.error(error.message);
    res.status(500).send("Some error occured");
}
        });
    

                    
    


module.exports=router;