const express= require('express');
const AcademicStaff = require('../models/AcademicStaff');
const router= express.Router();
const Request=require("../models/Request");
router.get('/', async (req, res) => { //View Only RejectedRequests
    var id=parseInt(req.query.id.substring(3))
    var Requests=await Request.find({ member_id:id,state:"rejected"})
    if(Requests.length!=0)
        res.json(Requests);
      else{
        res.json("No Rejected requests Found");
        console.log("mnno")}
          });     
module.exports= router;