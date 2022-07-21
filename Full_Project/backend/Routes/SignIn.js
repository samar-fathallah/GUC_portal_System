const express= require('express');
const AcademicStaff= require('../models/AcademicStaff');
const SignModel=require('../models/SignIn')
const SignOut=require('../models/SignOut')
var HRStaff=require("../models/HRStaff")
const Attendance=require("../models/AttendanceRecords");
const router= express.Router();
router.post('/',async(req,res)=>{ // like ac-1 or hr-1
    // check ya2ema de awel sign in fl yom  (table sign in msh feeha elnharda) aw fe ablaha sign out fe nafs elyom 
    var   today=new Date()
var id=parseInt(req.query.id.substring(3))
    var type=req.query.id.substring(0,2)
   
    var hr="no"
    if(type=="ac")
      var member= await AcademicStaff.findOne({"_id":id})
    else{
     var member= await  HRStaff.findOne({"_id":id})
     hr="yes"}
if(member){
    var check= await  SignModel.find({member_id:req.query.id,Day:today.getDate(),Month:today.getMonth(),Year:today.getFullYear()})
    var out= await  SignOut.find({member_id:req.query.id,Day:today.getDate(),Month:today.getMonth(),Year:today.getFullYear()})
    var ins= await Attendance.find({member_id:req.query.id,"Days.Signin":"Signed in","Days.SignOut":"none"}) // sign in without signout
    if(check.length==0 && out.length==0 ){ /// yom gdeed
            let signin=new SignModel({
                member_id:req.query.id,
                Day:today.getDate(),
        Month:today.getMonth(),
        Year: today.getFullYear(),
        Hour:today.getHours(),
        Minutes:today.getMinutes()
            })
        signin.save()
                .then((doc) => {
                   // console.log("ok")
                })
                .catch((err) => {
                console.error(err);
                }); 
                
        let attended=new Attendance({
            member_id:req.query.id,
            Days:[{Signin:"Signed in",day:today.getDate(),dayname:today.getDay(),
            month:today.getMonth(),
            year: today.getFullYear()}]
        })
        attended.save()
                .then((doc) => {
                    res.send("Signed in successfully");
                })
                .catch((err) => {
                console.error(err);
                }); 
            }
    else if (check.length !=0)
    res.json("Sorry cant sign in more than once without sign outs ")
    else
    {
        let signin=new SignModel({
            member_id:req.query.id,
            Day:today.getDate(),
    Month:today.getMonth(),
    Year: today.getFullYear(),
    Hour:today.getHours()
        })
    signin.save()
            .then((doc) => {
               // console.log("ok")
            })
            .catch((err) => {
            console.error(err);
            });  
        }
    }

else 
res.json("member not found")
}



);
module.exports= router;