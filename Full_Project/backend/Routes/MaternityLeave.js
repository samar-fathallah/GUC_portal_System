const express= require('express');
const router= express.Router();
const academic_staff = require('../models/AcademicStaff');
const request = require('../models/Request');


router.post('/', async (req, res) => {   //applying for maternity leave
    console.log("hereeee")
    var today = new Date()
    if(req.body.days && req.body.doc ){
        const staff=await academic_staff.find({ _id:req.query.id})
        const gen = staff[0].gender
    if(gen=="female"){
        console.log("heree")
        const depModel = staff[0].department
        const HODmodel=await academic_staff.find({ department:depModel,HOD:"true"})
        
    if(req.body.days>90)
        res.json("leave request can not exceed 90 days")
        else{
            console.log("arrived")
        let request1 = new request({
            reciever_id:HODmodel[0]._id,
            member_id:req.query.id,
            type:"maternity-leave",
            dayLimit:req.body.days,
            request_day:today,
            document:req.body.doc,
            department:staff[0].department,
        });
         request1.save()
        .then((doc) => {
            console.log(doc)
        res.json("Request submitted")
        })
        .catch((err) => {
        console.error(err);
        });
    }
    }
    else 
    res.json("Materninty leave is only available for females")
    }
   else
    res.json("please submit missing fields")
  }); 

module.exports= router;