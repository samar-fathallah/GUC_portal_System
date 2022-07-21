const express= require('express');
const AcademicStaff = require('../models/AcademicStaff');
const router= express.Router();
const Request=require("../models/Request");
router.get('/', async (req, res) => {   //View All Request's Status
var id=parseInt(req.query.id.substring(3))
       var Requests=await Request.find({ member_id:id})
       if(Requests.length!=0)
           res.send(Requests);
       else
       res.send("No Requests Submitted");
             });
module.exports= router;