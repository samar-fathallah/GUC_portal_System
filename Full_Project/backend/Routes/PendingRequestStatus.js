const express= require('express');
const AcademicStaff = require('../models/AcademicStaff');
const router= express.Router();
const Request=require("../models/Request");
router.get('/', async (req, res) => {  //View Only PendingRequests
    var id=parseInt(req.query.id.substring(3))
    var Requests=await Request.find({ member_id:id,state:"pending"})
      if(Requests.length!=0)
        res.json(Requests);
      else
        res.json("No Pending requests Found");
          });
module.exports= router;