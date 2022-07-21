const express= require('express');
const router= express.Router();
const academic_staff = require("../models/AcademicStaff");
const requests = require("../models/Request");

router.post('/', async (req, res) => {
    if(req.body.day && req.body.document){
        var day
        var month
        var hour
        var  year=parseInt(req.body.year);
        switch(req.body.day){
            case "01":day=1;break;
            case "02":day=2;break;
            case "03":day=3;break;
            case "04":day=4;break;
            case "05":day=5;break;
            case "06":day=6;break;
            case "07":day=7;break;
            case "08":day=8;break;
            case "09":day=9;break;
            default:day=parseInt(req.body.day);
        }
        switch(req.body.month){
            case "01":month=1;break;
            case "02":month=2;break;
            case "03":month=3;break;
            case "04":month=4;break;
            case "05":month=5;break;
            case "06":month=6;break;
            case "07":month=7;break;
            case "08":month=8;break;
            case "09":month=9;break;
            default:month=parseInt(req.body.month);
        }
        switch(req.body.hour){
            case "01":hour=1;break;
            case "02":hour=2;break;
            case "03":hour=3;break;
            case "04":hour=4;break;
            case "05":hour=5;break;
            case "06":hour=6;break;
            case "07":hour=7;break;
            case "08":hour=8;break;
            case "09":hour=9;break;
            default:hour=parseInt(req.body.hour);
        }
   
        var date= new Date(year,month,day,hour,0,0,0);
    var today = new Date()

    today.setHours(0,0,0,0)
    console.log(date)
    date.setHours(0,0,0,0)
    const diff =today.getDate()-date.getDate()
    if(diff <= 3){
        var recieverID = await academic_staff.find({ _id:req.query.id})
        var departments = recieverID[0].department
        var recieverID2 = await academic_staff.find({ "HOD":"true","department":departments})
        var recieverID3 = recieverID2[0]._id
        let request = new requests({
            member_id: req.query.id,
            reciever_id: recieverID3,
            type: "sick-leave",
            request_day: date,
            state: "pending",
            document:req.body.document,
            department:departments,
        });
        request.save()
        .then((doc) => {
        console.log(doc);
        res.json("request submitted")
        })
        .catch((err) => {
        console.error(err);
        });
      

    }else{
        
        res.json("Sorry you passed the 3 day mark for submiting a sick leave")
    }
}
else{
    res.json("please enter all required fields")
}
res.end
        });

module.exports= router;