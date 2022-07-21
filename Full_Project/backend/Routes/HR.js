var express= require('express');
var AcademicStaff = require('../models/AcademicStaff');
var router= express.Router();
var locationModel=require('../models/Locations');
var HRstaff=require("../models/HRStaff")
var SignModel=require('../models/SignIn');
var SignOutModel=require('../models/SignOut')
const HRStaff = require('../models/HRStaff');
const Attendance=require("../models/AttendanceRecords");
const AttendanceRecords= require("../models/AttendanceRecords");
const Faculty=require("../models/Faculty");
const course=require("../models/Courses");
router.get('/',async(req, res) => {
    res.send("HR STAFF WINDOW")
});
router.post('/addlocation', async (req, res) => {
    console.log(req.body.type)
    let location=new locationModel({
        room_number:req.body.room,
        type:req.body.type,
    max_capacity:req.body.capacity,
    });
    location.save()
        .then((doc) => {
            res.send("Location added");
        })
        .catch((err) => {
            res.send("Wrong Validation or missing field");
        });
      
    
    });
router.post('/updatelocation' ,async (req, res) => {
    if(req.body.room){
    var loc= await locationModel.findOne({"room_number":req.body.room})
    if(loc){
    if(req.body.type){
    var up = locationModel.updateOne(
        { "room_number":loc.room_number},
         {type:req.body.type})
         .then((doc) => {
            res.send("Location Updated")
            })
            .catch((err) => {
            console.error(err);
            })
        }   
    if(req.body.capacity){
        console.log("dddd")
    var up = locationModel.updateOne(
        { "room_number":loc.room_number},
     {"max_capacity":req.body.capacity})
        .then((doc) => {
            res.json("Location Updated")
            })
            .catch((err) => {
                res.json("Can't Update location")
            })
        }
    }
    else 
    res.send("no location found to be updated,maybe wrong room number")
}
else 
res.json("please enter missing field");
})
router.post('/deletelocation' ,async (req, res) => {
    if(req.body.room){
    var del=await locationModel.deleteOne({"room_number":req.body.room})
   
    if(del.n!=0)
    res.send("deleted Successfully")
    else 
    res.send("no location found to be deleted,maybe wrong room number")
    }
    else 
    res.json("please enter missing field")
})
router.post('/addmember',async(req,res)=>{
    

    if(req.body.type=="HR")
    var model=HRstaff
    else 
    var model= AcademicStaff
    if(!req.body.extra)
    var extra="none"
    else
    var extra=req.body.extra
    if(req.body.name && req.body.email && req.body.salary && req.body.office){
    var room=await locationModel.findOne({"room_number":req.body.office})
    if(room && room.type=="office"){
        if(room.current_capacity<room.max_capacity){
           
    let mem=new model({
        Name: req.body.name ,
        email:req.body.email,
        salary:req.body.salary,
        OfficeLocation:req.body.office,
        Personal_info:extra
    });
    mem.save()
        .then((doc) => {
            res.send("Member added");
            var update = locationModel.updateOne({ "room_number":room.room_number},{current_capacity:room.current_capacity+1})
            .then((doc) => {
                  console.log("tmm")
               })
               .catch((err) => {
               console.error(err);
               })   
        })
        .catch((err) => {
            res.send("Can't add member,Wrong validation");
        });
    
    }
    else
    res.send("office reached full capacity please choose different one")
}
else 
res.send("please enter correct room location")}
    else 
    res.send("please enter missing info to add member required fields are (name,email,salary,office)")
}
);
router.post('/addCourse', async (req, res) => {
        if(req.body.course && req.body.department){
        var Courses = new course({
                name: req.body.course,
                department: req.body.department
            });
            Courses.save()
            .then((doc) => {
                res.json("Course added")
            })
            .catch((err) => {
            console.error(err);
            });
     
        }
        else 
        res.send("please enter missing field")
        
    res.end
        });
router.post('/deleteCourse', async (req, res) => {
            if(req.body.course ){
            var Courses = await course.deleteOne({
                     name: req.body.course
                });
                console.log(Courses)
                if(Courses.n!=0)
                res.send("deleted Successfully")
                else 
                res.send("no course found to be deleted") 
            
            }
            else 
            res.send("please enter missing field")

        res.end
            });
router.post('/updateCourse', async(req, res) => {
                if(req.body.course && req.body.newcourse){
                   
                    var Courses= course.updateMany(
                        { name:req.body.course},
                        {$set: {name:req.body.newcourse}})
                    .then((doc) => {
                        if(Courses)
                        res.json("Course updated")
                        else
                        res.json("Course not found to be updated")
                    })
                    .catch((err) => {
                    console.error(err);
                    });
                    
                }
                else 
                res.send("please enter missing field")
    
            res.end
                });
router.post('/addFaculty', async (req, res) => {
                if(req.body.faculty){
                let faculty1 = new Faculty({
                        name: req.body.faculty
                    });
                    faculty1.save()
                    .then((doc) => {
                    console.log(doc);
                    })
                    .catch((err) => {
                    console.error(err);
                    });
                res.json("faculty added")
                }
                else 
                res.json("please enter missing field")
              
            res.end
});
router.post('/updatefaculty', async(req, res) => {
    console.log("heree")
    if(req.body.course && req.body.newcourse){
       
        var Courses= Faculty.updateMany(
            { name:req.body.course},
            {$set: {name:req.body.newcourse}})
        .then((doc) => {
            if(Courses)
            res.json("Faculty updated")
            else
            res.json("Faculty not found to be updated")
        })
        .catch((err) => {
        console.error(err);
        });
        
    }
    else 
    res.send("please enter missing field")

res.end
    });
router.post('/addDepartment', async (req, res) => {
   
        if(req.body.faculty && req.body.department){
            var faculty2=await Faculty.findOne({ name:req.body.faculty})
            if(faculty2){
        var faculty1 = await Faculty.update(
            { name:req.body.faculty},
           { $push: {
                department: req.body.department
            }  
            }
            )
        .then((doc) => {
            res.json("department added")
        })
        .catch((err) => {
        console.error(err);
        });
    }
    else 
    res.json("No faculty with this name found")
        }
        else res.json("please enter missing field")
     
    res.end
        });
router.post('/updatedepartment', async(req, res) => {
            if(req.body.course && req.body.newcourse){
                var facultyModel= Faculty.updateMany(
                    { department:req.body.course},
                    {$set: {department:req.body.newcourse}},
                    
                )
                    .then((doc) => {
                        if(doc.nModified==0){
                            res.json("No such department found to be updated")
                        }
                        else{
                        res.json("department Updated");
                        var academicstaff= AcademicStaff.updateMany(
                            { department:req.body.course},
                    {$set: {department:req.body.newcourse}}      
                    )
                    .then((doc) => {
                      
                        })
                        .catch((err) => {
                        console.error(err);
                        });
                    var courseModel= course.updateMany(
                        { department:req.body.course},
                    {$set: {department:req.body.newcourse}}
                        
                    ) .then((doc) => {
                   
                    
                    })
                    .catch((err) => {
                    console.error(err);
                    });
                       
                }    
                })
                .catch((err) => {
                console.error(err);
                });
            }
            else 
            res.send("please enter missing field")

        res.end
            });
router.post('/deleteFaculty', async (req, res) => {

                if(req.body.faculty){
                var academicstaff= AcademicStaff.updateMany(
                    { faculty:req.params.faculty},
                    {$set: {faculty:"unassigned"}},)
                .then((doc) => {
                    res.json("faculty deleted")
                })
                .catch((err) => {
                console.error(err);
                });
            var Facultys = await Faculty.updateMany(
                {name:req.params.faculty},
                {$set: {name:"unassigned"}})
                .then((doc) => {
                    res.json("faculty deleted")
                })
                .catch((err) => {
                console.error(err);
                });
            
            }
            else res.json("please enter missing field")
        res.end
            });
router.post('/updateSalary', async (req, res) => {
                if(req.body.staffID&& req.body.newSalary){
                var id=parseInt(req.body.staffID.substring(3))
                var type=req.body.staffID.substring(0,2)
                var hr="no"
                if(type=="ac")
                var member= await AcademicStaff.findOne({"_id":id})
                 else{
                var member= await  HRStaff.findOne({"_id":id})
                 hr="yes"}
                 if(member){
                if(hr=="no"){
                    var academicstaffs= AcademicStaff.updateMany(
                        { _id:id},
                        {$set: {salary:req.body.newSalary}},)
                    .then((doc) => {
                        res.json("salary updated")
                    })
                    .catch((err) => {
                        res.json("salary cant be updated")
                    });
               
                }
                else if(hr=="yes"){
                    var hrPersons= HRStaff.updateMany(
                        { _id:id},
                        {$set: {salary:req.body.newSalary}},)
                    .then((doc) => {
                        res.json("salary updated")
                    })
                    .catch((err) => {
                        res.json("salary cant be updated")
                    });
            }  
            else
                res.json("no staff member found")
               }
                
                else
                res.json("No Staff Member found with this ID")
            }
                else
                    res.json("please enter missing field" )
            
           
         
            res.end });   
router.post('/deleteStaff', async (req, res) => {
                   
                        if(req.body.staffID){
                        var id=parseInt(req.body.staffID.substring(3))
                        var type=req.body.staffID.substring(0,2)
                        var hr="no"
                        if(type=="ac")
                        var member= await AcademicStaff.findOne({"_id":id})
                         else{
                        var member= await  HRStaff.findOne({"_id":id})
                         hr="yes"}
                         if(id==req.params.id && hr=="yes")
                         res.json("Sorry can't delete yourself")
                         else{
                        if(member){
                         if(hr=="no"){
                        var academicstaffs= AcademicStaff.findOneAndDelete(
                            { _id:id})
                        .then((doc) => {
                            res.json("staff deleted")
                        })
                        .catch((err) => {
                        console.error(err);
                        });
                    
                    }
                    else if(hr=="yes"){
                        var hrPersons= HRStaff.findOneAndDelete(
                            { _id:id})
                        .then((doc) => {
                            res.json("staff deleted")
                        })
                        .catch((err) => {
                        console.error(err);
                        });
                    }  
                }
                else 
                res.json("No member found to be deleted")}
                }
                else 
                res.json("please enter missing field")
               
                res.end
                    });
//delete department
router.post('/deleteDep', async (req, res) => {
    var facultyModel= Faculty.updateMany(
        { department:req.body.department},
        {$set: {department:"unassigned"}},
        
    )
        .then((doc) => {
            if(doc.nModified==0){
                res.json("No such department found to be deleted")
            }
            else{
            res.json("department deleted");
            var academicstaff= AcademicStaff.updateMany(
                { department:req.body.department},
                {$set: {department:"unassigned"}},      
        )
        .then((doc) => {
          
            })
            .catch((err) => {
            console.error(err);
            });
        var courseModel= course.updateMany(
            { department:req.body.department},
            {$set: {department:"unassigned"}},
            
        ) .then((doc) => {
       
        
        })
        .catch((err) => {
        console.error(err);
        });
           
    }    
    })
    .catch((err) => {
    console.error(err);
    });
    
    

 
    
   

    });  
router.post('/AddSignIn',async (req,res) =>{
    
    if(req.body.member_id ){
   var id=parseInt(req.body.member_id.substring(3))
   var type=req.body.member_id.substring(0,2)
   var hr="no"
   if(type=="ac")
     var member= await AcademicStaff.findOne({"_id":id})
   else{
    var member= await  HRStaff.findOne({"_id":id})
    hr="yes"}
   
    if(id==req.query.id && hr=="yes")
    res.json("Sorry can't add sign in for yourself")
    else{
    if(member){
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

        var today= new Date(year,month,day,hour,0,0,0); 
    let signin=new SignModel({
        member_id:req.body.member_id,
        Day:today.getDate(),
        Month:today.getMonth(),
        Year: today.getFullYear(),
        Hour:today.getHours(),
        Minutes:today.getMinutes()
        
    });
    signin.save()
        .then((doc) => {
            res.send("sign in added  successfully");
        })
        .catch((err) => { 
            res.send("Sorry Cant add sign in") 
        });
       
    }
    else
    res.send("no member found with this ID")
} 
    
   
}
else res.json("please enter missing field")
});
router.post('/AddSignOut',async (req,res) =>{
    if(req.body.member_id ){
   var id=parseInt(req.body.member_id.substring(3))
   var type=req.body.member_id.substring(0,2)
   var hr="no"
   if(type=="ac")
     var member= await AcademicStaff.findOne({"_id":id})
   else{
    var member= await  HRStaff.findOne({"_id":id})
    hr="yes"}
   
    if(id==req.query.id && hr=="yes")
    res.json("Sorry can't add sign out for yourself")
    else{
    if(member){
        var today= new(Date)
    let signout=new SignOutModel({
        member_id:req.body.member_id,
        Day:today.getDate(),
        Month:today.getMonth(),
        Year: today.getFullYear(),
        Hour:today.getHours(),
        Minutes:today.getMinutes()
    });
    signout.save()
        .then((doc) => {
            res.send("sign out added  successfully");
        })
        .catch((err) => { 
            res.send("Sorry Cant add sign out") 
        });
       
    }
    else
    res.send("no member found with this ID")
} 
    
   
}
else res.json("please enter missing field")
}); 
router.post('/UpdateStaff',async (req,res) =>{
    console.log(req.body.staffID )
    console.log(req.body.fieldtoUpdate)
    console.log( req.body.Update)
        if(req.body.staffID && req.body.fieldtoUpdate && req.body.Update){
        var id=parseInt(req.body.staffID.substring(3))
        var type=req.body.staffID.substring(0,2)
        var hr="no"
        var field= req.body.fieldtoUpdate
        // switch(field){
        //     case "Name":
        // }
        if(type=="ac")
        var member= await AcademicStaff.findOne({"_id":id})
        else{
        var member= await  HRStaff.findOne({"_id":id})
        hr="yes"}
        if(id==req.params.id && hr=="yes")
        res.json("Sorry can't update yourself")
        else{
        if(member){
            var academicstaffs;
          if(hr=="no"){
              switch(field){
                  case "Name":   academicstaffs= await AcademicStaff.updateOne(
                    { _id:id},{$set:{Name:req.body.Update}});break;
                    case "gender":   academicstaffs= await AcademicStaff.updateOne(
                        { _id:id},{gender:req.body.Update});break;
                        case "email":   academicstaffs= await AcademicStaff.updateOne(
                            { _id:id},{email:req.body.Update});break;
                            case "password":  academicstaffs= await AcademicStaff.updateOne(
                                { _id:id},{password:req.body.Update});break;
                                case "salary":  academicstaffs= await AcademicStaff.updateOne(
                                    { _id:id},{$set:{salary:req.body.Update}});break;
                                    case "day_off":  academicstaffs= await AcademicStaff.updateOne(
                                        { _id:id},{day_off:req.body.Update});break;
                                        case "OfficeLocation":  academicstaffs= await AcademicStaff.updateOne(
                                            { _id:id},{OfficeLocation:req.body.Update});break;
                                            case "HOD":  academicstaffs= await AcademicStaff.updateOne(
                                                { _id:id},{HOD:"true"});break;
              }
          
          
                            
                    
        
    }
    else if(hr=="yes"){
        switch(field){
            case "Name":   academicstaffs= await HRStaff.updateOne(
              { _id:id},{$set:{Name:req.body.Update}});break;
              case "gender":   academicstaffs= await HRStaff.updateOne(
                  { _id:id},{gender:req.body.Update});break;
                  case "email":  academicstaffs= await HRStaff.updateOne(
                      { _id:id},{email:req.body.Update});break;
                      case "password":   academicstaffs= await HRStaff.updateOne(
                          { _id:id},{password:req.body.Update});break;
                          case "salary":   academicstaffs= await HRStaff.updateOne(
                              { _id:id},{$set:{salary:req.body.Update}});break;
                                  case "OfficeLocation":  academicstaffs= await HRStaff.updateOne(
                                      { _id:id},{OfficeLocation:req.body.Update});break;
                                     
        }
       
    } 
    if(academicstaffs.nModified!=0){
        res.json("staff updated")
        console.log(academicstaffs)
       }
        else 
        res.json("Cant be updated")

    
}
else 
res.json("No member found to be updated")}
}
else 
res.json("please enter missing field")

res.end
});  
router.get('/ViewAttendance',async (req,res) =>{
    console.log("arrived")
   if(req.query.member_id){
       var today=new Date()
       
    const fin=await Attendance.find({member_id:req.query.member_id,"Days.month":today.getMonth(),"Days.day":{$gt :10}}) // attendance within same month
    if(fin.length!=0)
    res.json(fin)
    else 
    res.json("No attendance found")
   }
   else 
   res.json("please enter member id")
})              
router.get('/ViewByHours', async (req, res) => { 
    console.log(req.query.id)
    if(req.query.id){
    var today = new Date()
    var min = 0
    var fin=await AttendanceRecords.find({member_id:req.query.id,"Days.month":today.getMonth(),"Days.day":{$gt :10}})
    if(fin.length!=0){
    var extraMins =0 
    var missMins = 0
    if(today.getMonth()==11)
    var finM=await AttendanceRecords.find({member_id:req.query.id,"Days.month":0,"Days.day":{$lt:10}})
    else
    var finM=await AttendanceRecords.find({member_id:req.query.id,"Days.month":today.getMonth()+1,"Days.day":{$lt:10}})
        for(var i = 0; i < fin.length;i++ ){
            if(fin[i].Days[0].MinutesSpent< 720){
            min += fin[i].Days[0].MinutesSpent
            }
            else{
                min += 720
            }
        }
        for(var i = 0; i < finM.length;i++ ){
            if(finM[i].Days[0].MinutesSpent< 720){
                min += finM[i].Days[0].MinutesSpent
                }
                else{
                    min += 720
                }
        }
        
        if(min < 9901){
            missMins= 10080 - min
        }else{
            if(min > 10080)
            extraMins = min - 10080
        }
       
       
         var missHours = 0
         var missHoursMins = 0
        
         if(missMins > 0){
         missHours = Math.floor(missMins/60)
         missHoursMins = missMins % 60
    
       
         }
        
    
    
         res.json("miss hours: "+missHours+  ",miss mins: "+missHoursMins)
        }
        else{

            res.json("No Attendance Records found for this member this month")
        }
    }
        else {
            res.json("please enter missing field")
        }
    
    
    
        }); 

router.get('/ViewByDays', async (req, res) => {
    if(req.query.id){
            var today=new Date()
            var month=today.getMonth()
            var missingday=[]
            var id=parseInt(req.query.id.substring(3))
            var type=req.query.id.substring(0,2)
            var hr="no"
            if(type=="ac")
              var member= await AcademicStaff.find({"_id":id})
            else{
             var member= await  HRStaff.find({"_id":id})
             hr="yes"}
             var d=0
             if(member.length!=0){
             switch(member[0].day_off) {
                 case "sunday":d=0;break;
                 case "monday":d=1; break;
                 case "tuesday":d=2;break;
                 case "wednesday":d=3;break;
                 case "thursday":d=4;break;
                 case "friday":d=5;break;
                 case "saturday":d=6;break;
               }
        
            const fin=await Attendance.find({member_id:req.query.id,"Days.month":today.getMonth(),"Days.day":{$gt :10}}) // attendance within same month
            // days in same month 
            if(fin.length!=0){
             var s=10
             var len=fin.length-1
                 for(var l=0;l<fin.length;l++){
                    for( i=s; i<fin[l].Days[0].day;i++){
                       
                        missingday.push(i +"/"+fin[len].Days[0].month+"/"+fin[len].Days[0].year)}
                      s=fin[l].Days[0].day+1
                    }
            
                 if(fin[len].Days[0].day+1<31){
                    for(var j=fin[len].Days[0].day+1;j<31;j++){
                        missingday.push(j +"/"+fin[len].Days[0].month+"/"+fin[len].Days[0].year)
                    }
                 }
            // days in next month but within the same working month
            if(today.getMonth()==11)
            var finM=await Attendance.find({member_id:req.query.id,"Days.month":0,"Days.day":{$lt:10}})
            else
            var finM=await Attendance.find({member_id:req.query.id,"Days.month":today.getMonth()+1,"Days.day":{$lt:10}})
            var s=0
            if(finM.length!=0){
             var len=finM.length-1
                 for(var l=0;l<finM.length;l++){
                    for( i=s; i<finM[l].Days[0].day ;i++){
                        missingday.push(i +"/"+finM[l].Days[0].month+"/"+finM[l].Days[0].year) }
                      s=finM[l].Days[0].day+1
                    }
                 
                 if(finM[len].Days[0].day+1<10){
                    for(var j=finM[len].Days[0].day+1;j<31;j++){
                        missingday.push(j +"/"+finM[len].Days[0].month+"/"+finM[len].Days[0].year)
                    }
                 }
            }
            for(var j=1;j<10;j++){
                missingday.push(j +"/"+(fin[len].Days[0].month+1)+"/"+(fin[len].Days[0].year))
            }
            res.json(missingday)
        }
        else 
        res.json("NO attendance Records found for this member")    
        }
        else 
        res.json("No member found with this ID")
    }
    else 
    res.json("please enter missing field")
            });        
module.exports= router;