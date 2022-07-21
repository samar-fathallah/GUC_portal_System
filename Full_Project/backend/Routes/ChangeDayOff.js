const express= require('express');
const academic_staff = require('../models/AcademicStaff');
const router= express.Router();
const request = require("../models/Request");


router.post('/' ,async (req, res) => {
if(req.body.dayoff){
var mem=await academic_staff.find({_id:req.query.id})
    if(mem.length!=0){
        var v=await academic_staff.find({"department":mem[0].department,"HOD":"true"})
        var today = new Date()
        if(req.body.reason)
        var reas=req.body.reason
        else 
        var reas="None"
        let requests1= new request ({
                member_id:mem[0]._id,
                type:"Change-dayOff",
                state: "pending",
                department:v[0].department,
                request_day:today,
                dayoff:req.body.dayoff,
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
    res.send("not a member cant submit request")
}

else 
  res.send("please fill missing field")
});

module.exports= router;