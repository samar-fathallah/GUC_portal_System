const express= require('express');
const router= express.Router();
const academic_staff = require('../models/AcademicStaff');
const request = require('../models/Request');

//applying for compensation leave
router.post('/', async (req, res) => {   
    if(req.body.reason){
    const staff=await academic_staff.find({ _id:req.query.id})
    var day
    var month
    var hour
    var  year=parseInt(req.body.year1);
    switch(req.body.day1){
        case "01":day=1;break;
        case "02":day=2;break;
        case "03":day=3;break;
        case "04":day=4;break;
        case "05":day=5;break;
        case "06":day=6;break;
        case "07":day=7;break;
        case "08":day=8;break;
        case "09":day=9;break;
        default:day=parseInt(req.body.day1);
    }
    switch(req.body.month1){
        case "01":month=1;break;
        case "02":month=2;break;
        case "03":month=3;break;
        case "04":month=4;break;
        case "05":month=5;break;
        case "06":month=6;break;
        case "07":month=7;break;
        case "08":month=8;break;
        case "09":month=9;break;
        default:month=parseInt(req.body.month1);
    }
    switch(req.body.hour1){
        case "01":hour=1;break;
        case "02":hour=2;break;
        case "03":hour=3;break;
        case "04":hour=4;break;
        case "05":hour=5;break;
        case "06":hour=6;break;
        case "07":hour=7;break;
        case "08":hour=8;break;
        case "09":hour=9;break;
        default:hour=parseInt(req.body.hour1);
    }

    var oldDate= new Date(year,month,day,hour,0,0,0);
   console.log(oldDate)
    oldDate.setHours(0,0,0,0)
    var day2
    var month2
    var hour2
    var  year=parseInt(req.body.year2);
    switch(req.body.day2){
        case "01":day2=1;break;
        case "02":day2=2;break;
        case "03":day2=3;break;
        case "04":day2=4;break;
        case "05":day2=5;break;
        case "06":day2=6;break;
        case "07":day2=7;break;
        case "08":day2=8;break;
        case "09":day2=9;break;
        default:day=parseInt(req.body.day2);
    }
    switch(req.body.month2){
        case "01":month2=1;break;
        case "02":mont2=2;break;
        case "03":month2=3;break;
        case "04":month2=4;break;
        case "05":month2=5;break;
        case "06":month2=6;break;
        case "07":month2=7;break;
        case "08":month2=8;break;
        case "09":month2=9;break;
        default:month2=parseInt(req.body.month2);
    }
    switch(req.body.hour2){
        case "01":hour2=1;break;
        case "02":hour2=2;break;
        case "03":hour2=3;break;
        case "04":hour2=4;break;
        case "05":hour2=5;break;
        case "06":hour2=6;break;
        case "07":hour2=7;break;
        case "08":hour2=8;break;
        case "09":hour2=9;break;
        default:hour2=parseInt(req.body.hour2);
    }

    const compday= new Date (year,month,day,hour,0,0,0)
    console.log(compday)
    compday.setHours(0,0,0,0)
    const diff = compday - oldDate
    const CM=compday.getMonth()
    const CD=compday.getDate()
    const OM=oldDate.getMonth()
    const OD=oldDate.getDate()
    var check="false"
    if(compday>oldDate){
    if(CM==OM && compday.getFullYear()==oldDate.getFullYear()){
   if(CD>=11 && OD>=11 || CD<11 && OD<11)
        check="true"}
    if((CM-OM)==1 || (CM-OM)==-11){
    if(CD<11 && OD>=10)
    check="true"}
    }
    if(check=="true"){
        const depModel = staff[0].department
        const HODmodel=await academic_staff.find({ department:depModel,HOD:"true"})
        let request1 = new request({
            reciever_id:HODmodel[0]._id,
            member_id:req.query.id,
            type:"compensation-leave",
            dayLimit:1,
            request_day:oldDate,
            compensation_day:compday,
            document:req.body.doc,
            department:staff[0].department,
            reason: req.body.reason,
        });
         request1.save()
        .then((doc) => {
        res.json("Request submitted")
        })
        .catch((err) => {
        console.error(err);
        });
    
    }
    else 
    res.json("please enter a valid date")
    }
   else
    res.json("please submit missing fields")
  }); 

module.exports= router;