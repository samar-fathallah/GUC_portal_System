const express= require('express');
const AcademicStaff= require('../models/AcademicStaff');
const SignModel=require('../models/SignIn')
const SignOut=require('../models/SignOut')
var HRStaff=require("../models/HRStaff")
const Attendance=require("../models/AttendanceRecords");
const router = express.Router();
router.get('/', async (req, res) => {
    var today= new(Date)
    console.log(req.query.id)
    const fin=await Attendance.find({member_id:req.query.id,"Days.month":today.getMonth()}) // attendance within same month
    if(fin.length!=0)
    res.json(fin)
    else 
    res.json("No attendance found")
});
router.get('/SpecificMonth', async (req, res) => {
    var month=req.query.month-1
   
      console.log(month)
const fin=await Attendance.find({member_id:req.query.id,"Days.month":month,"Days.day":{$gt :10 },"Days.day":{$lt:31}}) // attendance within same month
console.log(fin)
if(fin.length!=0){
console.log("hereeeeeeee")
res.json(fin)}
else 
res.json("No attendance found for this month")




});

module.exports= router;