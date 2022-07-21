 const express= require('express');
const router= express.Router();
const academic_staff = require("../models/AcademicStaff");
const requests = require("../models/Request");

router.get('/view', async (req, res) => {
    console.log(req.query.id)
        var  find = await requests.find({ college_id:req.query.id, type:"replacement"})
        console.log(find)
        if(find.length!=0){
            res.json(find)
        }
        else{
            res.json("no replacment requests found")
        }
        });


router.post('/send', async (req, res) => {
   console.log(req.body.college_id)
    if(req.body.college_id){
        var day
        var month
        var hour
        var  year=parseInt(req.body.year1);
        switch(req.body.day1){
            case "01":day=1;break;
            case "02":day=2;break;
            case "03":day=3;break;
            case "04":day=4;break;
            case "05":day=5;break;
            case "06":day=6;break;
            case "07":day=7;break;
            case "08":day=8;break;
            case "09":day=9;break;
            default:day=parseInt(req.body.day1);
        }
        switch(req.body.month1){
            case "01":month=1;break;
            case "02":month=2;break;
            case "03":month=3;break;
            case "04":month=4;break;
            case "05":month=5;break;
            case "06":month=6;break;
            case "07":month=7;break;
            case "08":month=8;break;
            case "09":month=9;break;
            default:month=parseInt(req.body.month1);
        }
        switch(req.body.hour1){
            case "01":hour=1;break;
            case "02":hour=2;break;
            case "03":hour=3;break;
            case "04":hour=4;break;
            case "05":hour=5;break;
            case "06":hour=6;break;
            case "07":hour=7;break;
            case "08":hour=8;break;
            case "09":hour=9;break;
            default:hour=parseInt(req.body.hour1);
        }
    
        var today= new Date(year,month,day,hour,0,0,0);
       
        var coll=parseInt(req.body.college_id.substring(3))
       
        var recieverID = await academic_staff.find({ "HOD":true })
        var departments = recieverID[0].department
        let request = new requests({
            member_id: req.query.id,
            reciever_id:recieverID[0]._id,
            college_id: coll,
            type: "replacement",
            request_day: today,
            state: "pending",
            department:departments,
        });
        request.save()
        .then((doc) => {
        console.log(doc);
        })
        .catch((err) => {
        console.error(err);
        });
        res.json("replacement submitted ")
        }
        else{
            res.json("please enter all required fields")
        }
    });

module.exports= router;