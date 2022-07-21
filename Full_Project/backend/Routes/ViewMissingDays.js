const express= require('express');
const AcademicStaff= require('../models/AcademicStaff');
const SignModel=require('../models/SignIn')
const SignOut=require('../models/SignOut')
var HRStaff=require("../models/HRStaff")
const request = require("../models/Request");
const Attendance=require("../models/AttendanceRecords");
const router = express.Router();
router.get('/', async (req, res) => {
var today=new Date()
var month=today.getMonth()
var missingday=[]
var id=parseInt(req.query.id.substring(3))
var type=req.query.id.substring(0,2)
var hr="no"
if(type=="ac")
  var member= await AcademicStaff.find({"_id":id})
else{
 var member= await  HRStaff.find({"_id":id})
 hr="yes"}
 var d=0
 switch(member[0].day_off) {
     case "sunday":d=0;break;
     case "monday":d=1; break;
     case "tuesday":d=2;break;
     case "wednesday":d=3;break;
     case "thursday":d=4;break;
     case "friday":d=5;break;
     case "saturday":d=6;break;
   }
//var test=new Date(25,12,2020)
//console.log(test.getDate())
//new Date(fin[l].Days[0].year,fin[l].Days[0].month,i)
//i +"/"+fin[len].Days[0].month+"/"+fin[len].Days[0].year)
const fin=await Attendance.find({member_id:req.query.id,"Days.month":today.getMonth(),"Days.day":{$gt :10}}) // attendance within same month
// days in same month 
 var s=10
 var len=fin.length-1
     for(var l=0;l<fin.length;l++){
        for( i=s; i<fin[l].Days[0].day;i++){
            
            missingday.push(i +"/"+fin[len].Days[0].month+"/"+fin[len].Days[0].year)}
          s=fin[l].Days[0].day+1
        }

     if(fin[len].Days[0].day+1<31){
        for(var j=fin[len].Days[0].day+1;j<31;j++){
            missingday.push(j +"/"+fin[len].Days[0].month+"/"+fin[len].Days[0].year)
        }
     }
// days in next month but within the same working month
if(today.getMonth()==11)
var finM=await Attendance.find({member_id:req.query.id,"Days.month":0,"Days.day":{$lt:10}})
else
var finM=await Attendance.find({member_id:req.query.id,"Days.month":today.getMonth()+1,"Days.day":{$lt:10}})
var s=0
if(finM.length!=0){
 var len=finM.length-1
     for(var l=0;l<finM.length;l++){
        for( i=s; i<finM[l].Days[0].day ;i++){
            missingday.push(i +"/"+finM[l].Days[0].month+"/"+finM[l].Days[0].year) }
          s=finM[l].Days[0].day+1
        }
     
     if(finM[len].Days[0].day+1<10){
        for(var j=finM[len].Days[0].day+1;j<31;j++){
            missingday.push(j +"/"+finM[len].Days[0].month+"/"+finM[len].Days[0].year)
        }
     }
}
for(var j=1;j<10;j++){
    missingday.push(j +"/"+(fin[len].Days[0].month+1)+"/"+(fin[len].Days[0].year))
}

res.json(missingday)
 

});
module.exports= router;