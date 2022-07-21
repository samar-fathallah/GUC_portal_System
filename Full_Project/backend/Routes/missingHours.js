const express= require('express');
const academic_staff = require("../models/AcademicStaff");
const router= express.Router();
const course= require("../models/Courses");
const AttendanceRecords= require("../models/AttendanceRecords");
const HRStaff= require("../models/HRStaff");

router.get('/', async (req, res) => {
    console.log("kkkk")
var today = new Date()
var min = 0
var fin=await AttendanceRecords.find({member_id:req.query.id,"Days.month":today.getMonth(),"Days.day":{$gt :10}})

// days in next month but within the same working month

var extraMins =0 
var missMins = 0
if(today.getMonth()==11)
var finM=await AttendanceRecords.find({member_id:req.query.id,"Days.month":0,"Days.day":{$lt:10}})
else
var finM=await AttendanceRecords.find({member_id:req.query.id,"Days.month":today.getMonth()+1,"Days.day":{$lt:10}})
    for(var i = 0; i < fin.length;i++ ){
        if(fin[i].Days[0].MinutesSpent< 720){
        min += fin[i].Days[0].MinutesSpent
        }
        else{
            min += 720
        }
    }
    for(var i = 0; i < finM.length;i++ ){
        if(finM[i].Days[0].MinutesSpent< 720){
            min += finM[i].Days[0].MinutesSpent
            }
            else{
                min += 720
            }
    }
    
    if(min < 9901){
        missMins= 10080 - min
    }else{
        if(min > 10080)
        extraMins = min - 10080
    }

    var id=parseInt(req.query.id.substring(3))
    var type=req.query.id.substring(0,2)
    var hr="no"
    if(type=="ac")
      var member1= await academic_staff.findOne({"_id":id})
    else{
     var member2= await  HRStaff.findOne({"_id":id})
     hr="yes"}
     if(hr == "no"){
        var salary= await academic_staff.findOne({"_id":id},{salary:true,_id:false})
        salary = salary.salary
     }
     if(hr == "yes"){
        var salary= await HRStaff.findOne({"_id":id},{salary:true,_id:false})
        salary = salary.salary
     }
     var missHours = 0
     var missHoursMins = 0
     var desalary = 0
     console.log(missMins)
     if(missMins > 0){
     missHours = Math.floor(missMins/60)
     missHoursMins = missMins % 60

    if(missHours > 179){
        desalary = (salary/180) * missHours
        salary = salary - desalary
    }
    if(missHoursMins > 0){
        desalary = ((salary/180) * 60) * missHoursMins
        salary = salary - desalary
    }
    if(hr == "no"){
        var ded= await academic_staff.updateOne({"_id":id},{salary:salary})
    }
    if(hr =="yes"){
        var ded= await HRStaff.updateOne({"_id":id},{salary:salary})
    }
  
     }
    

     var p=[]
     p.push(missHours)
     p.push(extraMins/60)
     console.log(p)
    
       res.json(p);



    });


module.exports= router;