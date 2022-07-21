const express= require('express');
const router= express.Router();
const academic_staff = require("../models/AcademicStaff");
const Request = require("../models/Request");
router.post('/', async (req, res) => {   //cancel 
var id=parseInt(req.query.id)
var today = new Date()

var Requests=await Request.find({ member_id:id})
   
           if(Requests[0].request_day>today && Requests[0].state=="pending" ){
            var del= Request.findOneAndDelete(
                { _id:req.body.reqid})
            .then((doc) => {
                console.log("heree")
                res.json("Request Cancelled")
            })
            .catch((err) => {
            console.error(err);
            });
           }
        else if(Requests[0].request_day>today ){
        var del= Request.findOneAndDelete(
            { _id:req.body.reqid,state:"pending"})
        .then((doc) => {
            res.json("Request Cancelled")
        })
        .catch((err) => {
        console.error(err);
        });
    }

        else 
        res.json("cant cancel request ")
}
          
  


             );



module.exports= router;