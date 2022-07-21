const express= require('express');
const academic_staff = require('../models/AcademicStaff');
const router= express.Router();
const request = require("../models/Request");
const course = require("../models/Courses");
var HRstaff=require("../models/HRStaff")
var bcrypt=require("bcrypt");
const jwt =require('jsonwebtoken');
router.post('/' ,async (req, res) => {

    var day
    var month
    var hour
    var  year=parseInt(req.body.year);
    switch(req.body.day){
        case "01":day=1;break;
        case "02":day=2;break;
        case "03":day=3;break;
        case "04":day=4;break;
        case "05":day=5;break;
        case "06":day=6;break;
        case "07":day=7;break;
        case "08":day=8;break;
        case "09":day=9;break;
        default:day=parseInt(req.body.day);
    }
    switch(req.body.month){
        case "01":month=1;break;
        case "02":month=2;break;
        case "03":month=3;break;
        case "04":month=4;break;
        case "05":month=5;break;
        case "06":month=6;break;
        case "07":month=7;break;
        case "08":month=8;break;
        case "09":month=9;break;
        default:month=parseInt(req.body.month);
    }
    switch(req.body.hour){
        case "01":hour=1;break;
        case "02":hour=2;break;
        case "03":hour=3;break;
        case "04":hour=4;break;
        case "05":hour=5;break;
        case "06":hour=6;break;
        case "07":hour=7;break;
        case "08":hour=8;break;
        case "09":hour=9;break;
        default:hour=parseInt(req.body.hour);
    }

    var reqday= new Date(year,month,day,hour,0,0,0); 
var mem=await academic_staff.find({_id:req.query.id})
var today=new Date()
today.setHours(0,0,0,0)

reqday.setHours(0,0,0,0)
if(today>reqday){
    res.json("Can't submit annual leave after targeted day")
}
else{
    if(mem.length!=0){
    var leavecount=(today.getMonth()+1)*2.5
    var annual=leavecount-mem[0].annualleavebalance-mem[0].accidentalleavebalance-req.body.days
    console.log(leavecount)
    console.log(annual)
    if(annual>0){
        var v=await academic_staff.find({"department":mem[0].department,"HOD":"true"})
        if(req.body.reason)
        var reas=req.body.reason
        else 
        var reas="None"
        let requests1= new request ({
                member_id:mem[0]._id,
                type: "annual-leave",
                state: "pending",
                department:v[0].department,
                request_day:reqday,
                day_limit:req.body.days,
                reciever_id:v[0]._id,
                reason:reas
            });
            requests1.save()
            .then((doc) => {
           res.json("request submitted successfully")
            })
            .catch((err) => {
                console.error(err);
            });
    }
    else 
    res.json("Annual leave exceeded can't submit request")
    }
    else
    res.send("not a member cant submit request")
}
}

);

module.exports= router;