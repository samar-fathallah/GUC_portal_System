const express= require('express');
const academic_staff = require('../models/AcademicStaff');
const router= express.Router();
const request = require("../models/Request");
const course = require("../models/Courses");


//assign CI
router.post('/assignCI', async (req, res) => {    
  const StaffMem=await academic_staff.find({ _id:req.query.id, HOD:"true" },{"department":true , "_id":false})
  

  if(StaffMem.length!=0){
    const dep = StaffMem[0].department
    if(req.body.id2 && req.body.courseName){
  const courseModel =await course.find({name:req.body.courseName})  
  const Staff=await academic_staff.find({_id:req.body.id2}) 
  const dep2 = courseModel[0].department
  if(Staff.length!=0 && (dep==dep2) && (Staff[0].department==dep)) { 
 var Staff2= academic_staff.updateOne(
    { _id:req.body.id2},
    {CI:"true"},
    
)
.then((doc) => {
console.log(doc);
})
.catch((err) => {
console.error(err);
});
var Staff3= academic_staff.updateOne(
    { _id:req.body.id2},
    {$push: {courses:[req.body.courseName]}},
    
)
.then((doc) => {
console.log(doc);
})
.catch((err) => {
console.error(err);
});

var courseModel2= course.updateMany(
{ name:req.body.courseName  },
{$push: {CIid:[req.body.id2]}},

)
.then((doc) => {
console.log(doc);
})
.catch((err) => {
console.error(err);
});
res.json("CI assigned")
}
  else
  res.json("this course/staff doesnt belong to this department  ")
 
   }
   res.json("please submit missing/correct fields")
   }
  res.json("cant access this page")
  });
 //delete CI
  router.post('/deleteCI', async (req, res) => {    
    const StaffMem=await academic_staff.find({ _id:req.query.id, HOD:"true" },{"department":true , "_id":false})
    
  
    if(StaffMem.length!=0){
      const dep = StaffMem[0].department
      if(req.body.id2 && req.body.courseName){
       
    const courseModel =await course.find({name:req.body.courseName})
       
    const Staff=await academic_staff.find({_id:req.body.id2}) 
    const dep2 = courseModel[0].department
    if(Staff.length!=0 && (dep==dep2) && (Staff[0].department==dep)&&((courseModel[0].CIid).length>1)) {
     const CIcount = await course.find({CIid:req.body.id2})
      if(CIcount.length<=1){
   var Staff2= academic_staff.updateOne(
      { _id:req.body.id2},
      {CI:"false"},
      
  )
  .then((doc) => {
  console.log(doc);
  })
  .catch((err) => {
  console.error(err);
  }); 
}
  academic_staff.updateOne({_id:req.body.id2}, { $pullAll: {courses: [req.body.courseName] } })
  .then((doc) => {
  console.log(doc);
  })
  .catch((err) => {
  console.error(err);
  });

  course.updateOne({name:req.body.courseName}, { $pullAll: {CIid: [req.body.id2] } })
  .then((doc) => {
  console.log(doc);
  })
  .catch((err) => {
  console.error(err);
  });
  res.json("CI deleted")
  }
    else
    res.json("(this course/staff doesnt belong to this department)/course reached min no of CI's  ")
   
     }
     //res.json("please submit missing fields")
     }
    res.json("incorrect field")
    });
//update CI 
router.post('/updateCI', async (req, res) => {    
  const StaffMem=await academic_staff.find({ _id:req.query.id, HOD:"true" },{"department":true , "_id":false})
  

  if(StaffMem.length!=0){
    const dep = StaffMem[0].department
    if(req.body.id2 && req.body.course1 && req.body.course2){
     
  const courseModel1 =await course.find({name:req.body.course1})
  const courseModel2 =await course.find({name:req.body.course2})   
  const Staff=await academic_staff.find({_id:req.body.id2}) 
  const dep2 = courseModel1[0].department
  const dep3 = courseModel2[0].department
  const check = await course.find({name:req.body.course1, CIid:req.body.id2})
  if(check.length==0){
    res.json("given id is not CI of the given course")
  }
  else if(Staff.length!=0 && (dep==dep2) && (Staff[0].department==dep)&&((courseModel1[0].CIid).length>1) && (dep==dep3)) {
   
 
academic_staff.updateOne({_id:req.body.id2}, { $pullAll: {courses: [req.body.course1] } })
.then((doc) => {
console.log(doc);
})
.catch((err) => {
console.error(err);
});

course.updateOne({name:req.body.course1}, { $pullAll: {CIid: [req.body.id2] } })
.then((doc) => {
console.log(doc);
})
.catch((err) => {
console.error(err);
});
var Staff3= academic_staff.updateMany(
  { _id:req.body.id2},
  {$push: {courses:[req.body.course2]}},
  
)
.then((doc) => {
console.log(doc);
})
.catch((err) => {
console.error(err);
});
var Staff4= academic_staff.updateMany(
  { courses:Staff[0].courses},
  {$push: {courses:[req.body.course2]}},
  
)
.then((doc) => {
console.log(doc);
})
.catch((err) => {
console.error(err);
});
var courseModel3= course.updateMany(
  { name:courseModel2[0].name},
  {$push: {CIid:[req.body.id2]}},
  
  )
  .then((doc) => {
  console.log(doc);
  })
  .catch((err) => {
  console.error(err);
  });
res.json("CI updated")
}
  else
  res.json("(this course/staff doesnt belong to this department)/course reached min no of CI's  ")
 
   }
   //res.json("please submit missing fields")
   }
  res.json("cant access this page/ enter missing fields")
  });
//reject request  
router.post('/rejectRequest', async (req, res) => {    
  var StaffMem=await academic_staff.find({ _id:req.query.id, HOD:"true" },{"department":true , "_id":false})
 
  if(StaffMem){
    var dep = StaffMem[0].department
    
    if(req.body.reqId){
  var requestModel =await request.find({_id:req.body.reqId}) 
  var staffId=requestModel[0].member_id
  console.log(staffId)
  var staffModel=await academic_staff.find({_id:staffId})
  console.log(staffModel) 
  var dep2=staffModel[0].department
  if(dep!=dep2){
    res.json("cant reject a request for a staff not in your department")
  }
  else if(staffModel.length==0){
    res.json("staff member doesnt have any request")
  }
  else{
  var requestType=await request.find({_id:req.body.reqId,type:"slotLinking"})
  if(requestType.length!=0){
    res.json("can not access slot linking request")
  } 
  
 else if(staffModel.length!=0) {  
    if(req.body.comment)
    var comm=req.body.comment
  else 
  var comm="none"
    var req2= request.updateMany(
    {_id:req.body.reqId},
    {$set: {state:"rejected",comment:comm}},
)
.then((doc) => {
console.log(doc);
})
.catch((err) => {
console.error(err);
});

res.json("request rejected")
}
  
}
   }
   res.json("please submit missing fields")
   }
  res.json("cant access this page")
  });  
//view all staff in department
router.get('/viewstaffdep', async (req, res) => {   
  const StaffMem=await academic_staff.find({ _id:req.query.id, HOD:"true" },{"department":true , "_id":false})
  if(StaffMem.length!=0){
  const staff=await academic_staff.find({ department:StaffMem[0].department})
 
  if(staff.length!=0)
  res.json(staff)
else
  res.json("No staff found")
   
   
 }
 res.json("cant access this page")
}); 
//view all CI in department 
router.get('/viewCI', async (req, res) => {   
  const StaffMem=await academic_staff.find({ _id:req.query.id, HOD:"true" },{"department":true , "_id":false})
  if(StaffMem.length!=0){
  const staff=await academic_staff.find({ department:StaffMem[0].department, CI:"true" })
 
  if(staff.length!=0)
  res.json(staff)
else
  res.json("No staff found")
   
   
 }
 res.json("cant access this page")
}); 
//view daysoff for all staff
router.get('/dayOff', async (req, res) => {   
  
    const StaffMem=await academic_staff.find({ _id:req.query.id, HOD:"true" },{"department":true , "_id":false,"day_off":true})
    if(StaffMem.length!=0){
    const Staff=await academic_staff.find({ department:StaffMem[0].department},{"Name":true,"_id":true,"day_off":true})
    if(Staff.length!=0)
    res.json(Staff)
else
    res.json("No staff found in this department")
     
}  else
res.json("cant access this page")
});
//view the coverage of each course in his department
router.get('/viewCoverage', async (req, res) => {  
      const StaffMem=await academic_staff.find({ _id:req.query.id,HOD:"true"})
      if(StaffMem.length!=0){
      console.log(StaffMem[0].department)
      const result=await course.find({ department:StaffMem[0].department},{"coverage":true,"name":true,"_id":false})
      if(result.length!=0){
    res.json(result)
    console.log(result)
  }
else
    res.json("No courses found")
     
      res.json(result);
}
res.json("cant access this page")
}); 
//view all staff in department in a certain course
router.post('/staffPerCourse', async (req, res) => {        
  const StaffMem=await academic_staff.find({ _id:req.query.id, HOD:"true" },{"department":true , "_id":false})
  if(StaffMem.length!=0){
  const Staff=await academic_staff.find({department:StaffMem[0].department, courses:req.body.course},{"createdAt":false,"updatedAt":false})
  console.log(StaffMem[0].department)
  console.log(req.body.course)
 
  if(Staff.length!=0)
  res.json(Staff)
else
  res.json("No staff found in this course")
 }
 res.json("cant access this page")
}); 
//view day off per staff member
router.post('/dayOffOne', async (req, res) => {    
      const StaffMem=await academic_staff.find({ _id:req.query.id, HOD:"true" },{"department":true , "_id":false})
      if(StaffMem.length!=0){
     
      const Staff=await academic_staff.find({ department:StaffMem[0].department,_id:req.body.id2},{ "_id":true,"Name":true,"day_off":true})
      if(Staff.length!=0)  
      res.json(Staff);
      else
      res.json("this staff is not in your department")
     
      }
      res.json("cant access this page")
      });

router.get('/:id/:course/viewAssignment', async (req,res) => {
  const StaffMem=await academic_staff.find({ _id:req.params.id, HOD:"true" })
  if(StaffMem.length !=0){
    const Staff=await academic_staff.find({ department:StaffMem[0].department, schedule:{course:req.params.course}},{ "_id":true,"Name":true,"schedule":true})
    console.log(Staff)
    if (Staff.length != 0){
      var result1 = []
      for(var i=0;i<Staff.length;i++){
       // if(Staff[i].schedule.)
      }

    }
    else{
      res.json("no staff is teaching this course")
    }

  }
  else{
    res.json("cant access this page")
  }
})

                  

                
                    
//view all staf leave requests
router.get('/viewrequests/allstaffleave', async (req, res) => {
  var StaffMem=await academic_staff.find({ _id:req.query.id ,HOD:"true"})
  if(StaffMem.length!=0){
  var StaffDep= await  academic_staff.find({ department:StaffMem[0].department})
  if(StaffDep.length==0) {
  res.send("no staff found")}
  else{
    var result=await request.find( {department:StaffMem[0].department,$or:[{ type:"maternity-leave"}, {type:"sick-leave"},{type:"accidental-leave"},{type:"annual-leave"}, {type:"compensation-leave"}]})
  if(result.length!=0)
  res.send(result);
  else
  res.json("not found")
 }
}
 else
 console.log("cant access this page");
});                      
//show the requests (change dayoff) of all staff in department
router.get('/viewrequests/allstaffdayoff', async (req, res) => {
  console.log(req.query.id)
  var StaffMem=await academic_staff.find({ _id:req.query.id ,HOD:"true"})
  if(StaffMem.length!=0){
  var StaffDep=await request.find({ type:"Change-dayOff",department:StaffMem[0].department})
  if(StaffDep.length!=0)
  res.send(StaffDep);
  else
  res.json("not found")
 }
else
 res.json("cant access this page")
});

//show the requests (replacement) of all staff in department
router.get('/viewrequests/allstaffreplacement', async (req, res) => {
  console.log(req.query.id)
  var StaffMem=await academic_staff.find({ _id:req.query.id ,HOD:"true"})
  if(StaffMem.length!=0){
  var StaffDep=await request.find({ type:"replacement",department:StaffMem[0].department})
  if(StaffDep.length!=0)
  res.send(StaffDep);
  else
  res.json("not found")
 }
else
 res.json("cant access this page")
});
//view request (replacement) of a single staff
router.post('/viewrequests/singlereplacement', async (req, res) => {  
  console.log(req.query.id)
  var StaffMem=await academic_staff.find({ _id:req.query.id ,HOD:"true"})
  if(StaffMem.length!=0){
  var StaffDep=await request.find({  member_id:req.body.id2,type:"replacement",department:StaffMem[0].department})
  if(StaffDep.length!=0)
  res.send(StaffDep);
  else
  res.json("not found")
 }
else
 res.json("cant access this page")
}); 
//view request (change dayoff/leave) of a single staff
router.post('/viewrequests/singledayoff', async (req, res) => {  
  console.log(req.query.id)
  var StaffMem=await academic_staff.find({ _id:req.query.id ,HOD:"true"})
  if(StaffMem.length!=0){
  var StaffDep=await request.find({  member_id:req.body.id2,type:"Change-dayOff",department:StaffMem[0].department})
  if(StaffDep.length!=0)
  res.send(StaffDep);
  else
  res.json("not found")
 }
else
 res.json("cant access this page")
}); 
//view requests (leave) of a single staff
router.post('/viewrequests/singleStaffLeave', async (req, res) => {   
  var StaffMem=await academic_staff.find({ _id:req.query.id ,HOD:"true"})
  if(StaffMem.length!=0){
  var StaffDep= await  academic_staff.find({ department:StaffMem[0].department})
  if(StaffDep.length==0) {
  res.send("no staff found")}
  else{
    var result=await request.find( {member_id:req.body.id2,department:StaffMem[0].department,$or:[{ type:"maternity-leave"}, {type:"sick-leave"},{type:"accidental-leave"},{type:"annual-leave"}, {type:"compensation-leave"}]})
  if(result.length!=0)
  res.send(result);
  else
  res.json("not found")
 }
}
 else
 console.log("cant access this page");
}); 
router.post('/accepetRequest', async (req, res) => {   
  var req1 = request.find({_id:req.query.id})
var req2= request.updateOne(
  { _id:req.query.id},
  {$set: {state:"accepted"}},
).then((doc) => {
  console.log(doc);
  })
  .catch((err) => {
  console.error(err);
  });
res.json("Request accepted")
console.log(req1)
});

//show the slot of the courses she/he assigned to
router.get('/courseAssignment', async (req, res) => {
        console.log("hereeee")
        var dep=await academic_staff.find({ _id:req.query.id,HOD:true},{"_id":false,"department":true})

        dep = dep[0].department
        console.log(dep)
        var CIcourses=await course.find({ department:dep},{"_id":false,"name":true})
        if(CIcourses.length!=0){
        CIcourses = CIcourses
        console.log(CIcourses)
        var final=[]
        for(var i = 0 ; i < CIcourses.length ; i++){
                console.log(CIcourses[i])
                var StaffMem = await academic_staff.find({ courses:CIcourses[i].name,CI:false})
                console.log(StaffMem)
                for(var k=0;k<StaffMem.length;k++){
                  var sch=StaffMem[k].schedule
                  for(var j=0;j<sch.length;j++){
                    if(sch[j].course==CIcourses[i].name){
                      var id="ac-"+StaffMem[k]._id+ " , "+sch[j].day_slot+ " , "+CIcourses[i].name
                      console.log(id);
                      final.push(id)
                    }
                  }
                }
        }
        if(final.length!=0){
        res.send(final)
        console.log(final);
        }
        else
        {
                res.send("no slots found")
        }
}
        else{
                res.send("no courses found/you may not have access to this page")
        }
        });
module.exports= router;