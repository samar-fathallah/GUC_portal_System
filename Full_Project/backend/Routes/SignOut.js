const express= require('express');
const AcademicStaff= require('../models/AcademicStaff');
const SignIn=require('../models/SignIn')
const SignModel=require('../models/SignOut')
const Attendance=require('../models/AttendanceRecords')
var HRStaff=require("../models/HRStaff")
const router= express.Router();
router.post('/',async(req,res)=>{
    var id=parseInt(req.query.id.substring(3))
    var type=req.query.id.substring(0,2)
    var today= new Date()
    var hr="no"
    if(type=="ac")
      var member= await AcademicStaff.findOne({"_id":id})
    else{
     var member= await  HRStaff.findOne({"_id":id})
     hr="yes"}
if(member){
var check=await SignIn.find({member_id:req.query.id,Day:today.getDate(),Month:today.getMonth(),Year:today.getFullYear()})

    if(check.length!=0){
let signin=new SignModel({
    member_id:req.query.id});
    signin.save()
    .then((doc) => {
        console.log("sign out successful");
    })
    .catch((err) => {
    console.error(err);
    });
    var day=today.getDate()
    var month=today.getMonth()
    var year=today.getFullYear()
    var result=''
   var h=0
    var attended=await Attendance.find({member_id:req.query.id,"Days.day":day,"Days.month":month,"Days.year":year,"Days.SignOut":"none"})
    h=attended[0].Days[0].MinutesSpent
    var min=(check[0].Hour)*(check[0].Minutes)
    var max=(today.getMinutes())*(today.getHours())
   var hours=parseInt(h+(max-min))
   var fin=await Attendance.update({member_id:req.query.id,"Days.day":day,"Days.month":month,"Days.year":year,"Days.SignOut":"none"},{$set :{"Days.$.SignOut":"Signed Out","Days.$.MinutesSpent":hours}})
  var r=await SignIn.findOneAndRemove({member_id:req.query.id,Day:today.getDate(),Month:today.getMonth(),Year:today.getFullYear()})
   res.json("Sign Out Successful")
    }

else 
res.json("Can't Sign Out without a Sign In")    
 }


else 
res.send("Sorry Cant sign out") 
});
module.exports= router;































// const express= require('express');
// const academic_staff = require('../models/AcademicStaff');
// const SignModel=require('../models/SignOut')
// const router= express.Router();
// router.post('/:id',async(req,res)=>{
// var member= await academic_staff.findOne({"_id":req.params.id})
// if(member){
// let signout=new SignModel({
//     member_id:"ac-"+req.params.id

// });
// signout.save()
//     .then((doc) => {
//     console.log(doc);
//     })
//     .catch((err) => {
//     console.error(err);
//     });
//     res.send("sign out successful");
// }
// else 
// res.send("Sorry Cant sign out") 
// });
// module.exports= router;