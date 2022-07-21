const express= require('express');
const academic_staff = require('../models/AcademicStaff');
const router= express.Router();
const request = require("../models/Request");
const Courses=require("../models/Courses")

router.post('/' ,async (req, res) => {
if( req.body.course && req.body.day_slot){
var mem=await academic_staff.find({_id:req.query.id})
var c=await Courses.find({name:req.body.course})
console.log(c)
    if(mem.length!=0 && c.length!=0){
        var coursename="none"
    for(var i=0;i<mem[0].courses.length;i++){
    if(mem[0].courses[i]==req.body.course)
        coursename=req.body.course
        }
    var slotname="none"
    for(var i=0;i<c[0].slot.length;i++){
            if(c[0].slot[i].day_slot==req.body.day_slot)
                slotname=req.body.day_slot
                }
    if(coursename!="none" && slotname !="none") {
        let requests1= new request ({
                member_id:mem[0]._id,
                type:"slotLinking",
                state: "pending",
                department:c[0].department,
                request_day:new Date(),
                reciever_id:c[0].CCid,
                slot:req.body.day_slot,
                course_name:coursename
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
    res.send("Cant submit slot-linking request for un-available course/slot")}
    else
    res.send("Can't submit Slotlinking request to this Course")
}

else 
  res.send("please fill missing field")
});

module.exports= router;