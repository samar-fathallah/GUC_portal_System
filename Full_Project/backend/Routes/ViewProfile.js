const express= require('express');
const academic_staff = require('../models/AcademicStaff');
const router= express.Router();
const request = require("../models/Request");
const course = require("../models/Courses");
const HRStaff=require("../models/HRStaff");
router.get('/', async (req, res) => {   //view profile
  if(req.query.id ){
    console.log("here");
    var id=parseInt(req.query.id.substring(3))
    console.log(id)
    var type=req.query.id.substring(0,2)
    var hr="no"
    if(type=="ac")
      var member= await academic_staff.findOne({"_id":id})
    else{
     var member= await  HRStaff.findOne({"_id":id})
     hr="yes"}
  res.json( member)
    }
else
  res.json("No Profile to view")
}); 

module.exports= router;