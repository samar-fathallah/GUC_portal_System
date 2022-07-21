const express= require('express');
const academic_staff = require('../models/AcademicStaff');
const router= express.Router();
const HRStaff = require("../models/HRStaff");

router.post('/:id/updateField', async (req, res) =>{

    if(req.body.updateField && req.body.newField){
        var id=parseInt(req.params.id.substring(3))
   var type=req.params.id.substring(0,2)
        var hr="no"
    if(type=="ac")
      var member= await academic_staff.findOne({"_id":id})
    else{
     var member= await  HRStaff.findOne({"_id":id})
     hr="yes"}
    //var member= await academic_staff.find({id:req.body.id})
    if(hr=="yes"){
        const updateReq= await req.body.updateField
        if(updateReq=="email"){
            var Staff2=await academic_staff.updateOne(
                { _id:id},
                {email:req.body.newField},  
                
            )
            .then((doc) => {
            console.log(doc);
            })
            .catch((err) => {
            console.error(err);
            });
            res.json("field updated")

        }
        else if(updateReq=="password"){
            var Staff2=await academic_staff.updateOne(
                { _id:id},
                {password:req.body.newField},
                
            )
            .then((doc) => {
            console.log(doc);
            })
            .catch((err) => {
            console.error(err);
            });
            res.json("field updated")

        }
        else if(updateReq=="gender"){
            var Staff2=await academic_staff.updateOne(
                { _id:id},
                {gender:req.body.newField}
                
            )
            .then((doc) => {
            console.log(Staff2);
            })
            .catch((err) => {
            console.error(err);
            });
            res.json("field updated")
        }
        else{
            res.json("please enter correct field name in order to update")
        }
    } 
    else if(hr=="no"){
        const updateReq= req.body.updateField
        if(updateReq=="email"){
            var Staff2=await academic_staff.updateOne(
                { _id:id},
                {email:req.body.newField},
                res.json("field updated")
                
            )
            .then((doc) => {
            console.log(doc);
            })
            .catch((err) => {
            console.error(err);
            });

        }
        else if(updateReq=="password"){
            var Staff2= await academic_staff.updateOne(
                { _id:id},
                {password:req.body.newField},
                
            )
            .then((doc) => {
            console.log(doc);
            })
            .catch((err) => {
            console.error(err);
            });
            res.json("field updated")

        }
        else if(updateReq=="gender"){
            var Staff2= await academic_staff.updateOne(
                { _id:id},{gender:req.body.newField}   
            )
            // console.log(Staff2)
            .then((doc) => {
                
            })
            .catch((err) => {
            console.error(err);
            });
            res.json("field  gender updated")
            
        }
        else{
            res.json("please enter correct field name in order to update")
        }
    }

    }
    else{
        req.json("please enter missing fields")
    }

})

module.exports= router;