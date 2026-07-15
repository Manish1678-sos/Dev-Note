const express=require('express');
const User=require('../models/Users');
const router=express.Router();

const{body, validationResult}= require('express-validator');

//Create a User using:POST "/api/auth/". Doesn't require Auth
router.post('/',
    [body('name','Enter a valid name').isLength({min:3}),
        
        body('email','Enter a valid email').isEmail(),
        body('password','Enter a valid password').isLength({min:5}),],
        
        async(req,res) =>{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});

            }
       try{ let user =await User.findOne({email:req.body.email});
        
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exists"});
        }
     user =await User.create({
        name:req.body.name,
        password:req.body.password,
        email:req.body.email
    }) 
    //.then(user=>res.json(user))
    //.catch(err=>{
       // console.log(err);
        //res.status(400).json({error:"Email already exists",message:err.message});
    res.json({message:"User created successfully"})
    }
catch(error)
{
    console.error(error.message);
    res.status(500).send("Some error occured");
}
        });
    //});

                    
    


module.exports=router;