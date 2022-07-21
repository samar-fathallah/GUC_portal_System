const express= require('express');
const AcademicStaff = require('../models/AcademicStaff');
const Courses = require('../models/Courses');
const router= express.Router();
const Request=require("../models/Request");
router.get("/",function(req,res){
    res.send("welcome to course coordinator");
});
    
router.get('/SlotlinkingRequests', async (req, res) => { //view slotLinking Requests
 const CourseName= await Courses.find({CCid:req.query.id})

 if(CourseName.length!=0){
  
  for (var i = 0; i < CourseName.length; i++) {
      var result=await Request.find({course_name:CourseName[i].name,type:"slotLinking",reciever_id:req.query.id})
  }

if(result.length!=0)
    res.send(result)
else
    res.json("No Slot Linking requests Found")
 }
res.json("Sorry Can't access requests")

});
router.post('/RejectLikingRequest', async (req,res)=>{
  
  if(req.body.reqid){
    var coursename= req.body.course
    if(coursename.length!=0){
    var requests= await Request.find({ course_name:coursename, reciever_id:req.query.id,type:"slotLinking"})
    console.log(requests.length)
    if(requests.length!=0){
    var change= Request.updateOne(
      { _id:req.body.reqid},{state:"rejected"})
      .then((doc) => {
        res.json("Request rejected")
    })
    .catch((err) => {
        res.json("Cant reject request")
    });
  }
    else 
    res.json("This request is not slot linking")
    }
    else 
    res.json("you are not a coordinator for any course")
  }
 else 
 res.json("please enter request id")

})
router.post('/AcceptLinkingRequest',async (req,res)=>{
  if(req.body.reqid){
    var coursename= req.body.course

    if(coursename.length!=0){
    var requests= await Request.find({ course_name:coursename, reciever_id:req.query.id,type:"slotLinking"})

    if(requests.length!=0){
    var change= Request.updateOne(
      { _id:req.body.reqid},
      {$set: {state:"accepted"}},
      )
      .then((doc) => {
        res.json("Request Accept")
    })
    .catch((err) => {
        res.json("Cant accept request")
    });
    var memb=await Request.find({_id:req.body.reqid,state:"accepted"},{member_id:true,slot:true})
    var memberid=memb[0].member_id
    console.log(memb)
    console.log(memberid)
    var slot=memb.slot
    var sc=await AcademicStaff.updateOne({_id:memberid},{ $push: {
      schedule: {day_slot:slot,course:coursename }
  }  }      )
  }
    else 
    res.json("This request is not slot linking")
    }
    else 
    res.json("you are not a coordinator for any course")
  }
 else 
 res.json("please enter request id")

})
//addSlot
router.post('/addSlot', async (req, res) => { 
  var check = await Courses.find(
    { name:req.body.course , CCid:req.query.id})
  if(req.body.course && req.body.slot){
    if(check.length!=0){
  var courses = await Courses.updateOne(
    { name:req.body.course , CCid:req.query.id},
   { $push: {
      slot: [{day_slot:req.body.slot, assigned:"false"}]
    }  
    }
    )
.then((doc) => {
console.log(doc);
})
.catch((err) => {
console.error(err);
});
res.json("slot added");
  }

else{
  res.json("data not found");
}
  }
  else{
    res.json("please enter all required fields");
  }
  });
//update slot
router.post('/updateSlot', async (req, res) => { //View Schedule
    if(req.body.course && req.body.oldSlot && req.body.newSlot && req.body.assigned){
      var b =false
      var check = await Courses.find(
        { name:req.body.course , CCid:req.query.id})
        check = check[0].slot
        var ass = null
        for(var i = 0; i< check.length;i++){
          if(check[i].day_slot == req.body.oldSlot){
              b = true
              ass = check[i].assigned
              break;
          }
        }

      
    if(b){
    var courses = await Courses.updateOne({ name:req.body.course , CCid:req.query.id},
      { $pull: {slot:{day_slot:req.body.oldSlot,assigned:ass}}})
      .then((doc) => {
      console.log(doc);
      })
      .catch((err) => {
      console.error(err);
      });

      var courses = await Courses.updateOne({ name:req.body.course , CCid:req.query.id},
        { $push: {slot:{day_slot:req.body.newSlot,assigned:req.body.assigned}}})
        .then((doc) => {
        console.log(doc);
        })
        .catch((err) => {
        console.error(err);
        });
  

  res.json("slot updated");
 
    }else{
      res.json("no match found");
    }
  }
    else{
      res.json("please enter all required fields");
    }
    });

//delete slot
router.post('/deleteSlot', async (req, res) => { 
  if(req.body.course && req.body.oldSlot){
    var b =false
    var check = await Courses.find(
      { name:req.body.course , CCid:req.query.id})
      check = check[0].slot
      var ass = null
      for(var i = 0; i< check.length;i++){
        if(check[i].day_slot == req.body.oldSlot){
            b = true
            ass = check[i].assigned
            break;
        }
      }

    
  if(b){
  var courses = await Courses.updateOne({ name:req.body.course , CCid:req.query.id},
    { $pull: {slot:{day_slot:req.body.oldSlot,assigned:ass}}})
    .then((doc) => {
    console.log(doc);
    })
    .catch((err) => {
    console.error(err);
    });
  
res.json("slot deleted");
  }
}
  else{
    res.json("please enter all required fields");
  }
  });  
module.exports= router;