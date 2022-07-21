const express= require('express');
const AcademicStaff = require('../models/AcademicStaff');
const router= express.Router();
router.get('/', async (req, res) => { //View Schedule
    var id=parseInt(req.query.id.substring(3))
  var StaffMem=await AcademicStaff.find({ _id:id})

 


  res.send(StaffMem[0].schedule);
       });

module.exports= router;