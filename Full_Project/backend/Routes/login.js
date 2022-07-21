const express= require('express');
const academic_staff = require('../models/AcademicStaff');
const hr_staff = require('../models/HRStaff');
const router= express.Router();
var bcrypt=require("bcrypt");
const jwt =require('jsonwebtoken');
var type;
router.post('/',async(req,res)=>{
    try{
        
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({msg:"Please Enter valid email or password"});

        }
        else{
        var existingUser= await academic_staff.findOne({email:email});
   
        if(!existingUser){
         
             existingUser= await hr_staff.findOne({email:email});
        
            if(!existingUser)
                return res.json("User is not registered");
        }
        const isMatched=await bcrypt.compare(password,existingUser.password);
        if(!isMatched)
        {
             console.log("Invalid credentials")
            return res.json("Invalid credentials");

        }
    
        const JWT_Password="password";
        const token = jwt.sign({_id:existingUser._id},JWT_Password);
       res.json({token,existingUser,type});
        
    }
}
    catch(error)
    {
        res.json({error:error.message});
    }
});
module.exports= router;