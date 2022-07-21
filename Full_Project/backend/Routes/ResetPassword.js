const express= require('express');
const academic_staff = require('../models/AcademicStaff');
const router= express.Router();
const request = require("../models/Request");
const course = require("../models/Courses");
const HRStaff=require("../models/HRStaff")
var bcrypt=require("bcrypt");
const jwt =require('jsonwebtoken');
router.post('/', async (req, res) => {
   
        var id=parseInt(req.query.id.substring(3))
        var type=req.query.id.substring(0,2)
        var hr="no"
        if(type=="ac"){
        var member= await academic_staff.find({"_id":id})
        console.log(member[0])
        }
        else{
         var member= await  HRStaff.find({"_id":id})
         hr="yes"}
    const confirmed= await bcrypt.compare(req.body.oldpassword,member[0].password);   
    if(confirmed)
    {
        const salt=bcrypt.genSaltSync();
       const hashedPassword=bcrypt.hashSync(req.body.newpassword,salt);
       if(hr=="no")
       var y1= await academic_staff.updateOne({"_id":id}, {"password": hashedPassword});
      else 
      var y2=await HRStaff.updateOne({"_id":id}, {"password": hashedPassword});
        res.json("updated");
      console.log(y1)
    }
    else 
    res.json("cant reset password")
   


});


module.exports= router;