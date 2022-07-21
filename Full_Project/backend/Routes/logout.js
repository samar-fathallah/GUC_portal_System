const express= require('express');
const academic_staff = require('../models/AcademicStaff');
const router= express.Router();
var bcrypt=require("bcrypt");
const jwt =require('jsonwebtoken');

router.get('/',function(req,res){
    
        res.send( req.header("auth-token"));
    });




module.exports= router;

