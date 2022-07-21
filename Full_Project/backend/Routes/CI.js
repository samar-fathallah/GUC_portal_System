const express= require('express');
const academic_staff = require("../models/AcademicStaff");
const router= express.Router();
const course= require("../models/Courses");


//show the courses of the courses she/he assigned to
router.get('/courses', async (req, res) => {
        var courses=await academic_staff.find({ _id:req.query.id},{"courses":true ,"_id":false})
        if(courses.length!=0)
                res.json(courses)
        else
            res.json("Sorry No courses to access")
    
        });
//show the coverage of the courses she/he assigned to
router.get('/coverage', async (req, res) => {
        var courses=await course.find({ CIid:req.query.id},{"name":true ,"coverage":true})
        if(courses.length!=0)
                res.json(courses)
        else
            res.json("Sorry No courses to access")
    
        });
 
//show the slot of the courses she/he assigned to
router.get('/courseAssignment', async (req, res) => {
        console.log("hereeee")
        var CIcourses=await academic_staff.find({ _id:req.query.id,CI:true},{"_id":false,"courses":true})
        if(CIcourses.length!=0){
        CIcourses = CIcourses[0].courses
        //console.log(CIcourses)
        var final=[]
        for(var i = 0 ; i < CIcourses.length ; i++){
                console.log(CIcourses[i])
                var StaffMem = await academic_staff.find({ courses:CIcourses[i],CI:false})
                console.log(StaffMem)
                for(var k=0;k<StaffMem.length;k++){
                  var sch=StaffMem[k].schedule
                  for(var j=0;j<sch.length;j++){
                    if(sch[j].course==CIcourses[i]){
                      var id="ac-"+StaffMem[k]._id+ " , "+sch[j].day_slot+ " , "+CIcourses[i]
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

//view all staff in her department
router.get('/staffDepartment', async (req, res) => {
        var StaffMem=await academic_staff.find({ _id:req.query.id ,CI:true},{"department":true , "_id":false})
        if(StaffMem.length!=0){
        
        const Staff=await academic_staff.find({ department:StaffMem[0].department})
        console.log(Staff)
        if(Staff.length!=0){
                console.log(Staff[0].Name);
                res.json(Staff);
              
               }
       else{
               res.send("No Staff Found")
       }
        }
        else{
                res.json("Sorry Can't access this data")
            }
             });
router.post('/staffPerCourse', async (req, res) => {    
        if(req.body.courses){
        const StaffMem=await academic_staff.find({ _id:req.query.id, CI:"true" ,courses:req.body.courses},{"courses":true , "_id":false})
        if(StaffMem.length!=0){
         const Staff=await academic_staff.find({courses:req.body.courses},{"createdAt":false,"updatedAt":false})       
        if(Staff.length!=0){
                res.json(Staff)
        }   
              else{
                res.json("No staff found in this course")
              }
                
               }
               else{
                res.json("you do not give this course")
               }
               
        }
        else{
                res.json("enter all required fildes")
        }
              });


router.post('/AssignASlot', async (req, res) => { 
if(req.body.course&&req.body.slot&&req.body.assignedMember){
console.log(req.body.course)
console.log(req.body.slot)
console.log(req.body.assignedMember)
var checkMemberGivesCourse = await academic_staff.find({_id:req.body.assignedMember},{courses:true,_id:false})
checkMemberGivesCourse = checkMemberGivesCourse[0].courses
var check1 = false

for(var i = 0 ; i<checkMemberGivesCourse.length;i++){
        if(checkMemberGivesCourse[i] == req.body.course ){
                check1 = true
                break
        }
}
if(check1 == false){
        res.json("the member you gave the id does not give the course") 
}
else{
var checkSlotIsAssignedOrNot = await course.find({CIid:req.query.id,name:req.body.course}, 
        {slot:{ day_slot:req.body.slot,assigned:"false"},_id:false});

        if(checkSlotIsAssignedOrNot.length==0){
                res.json("the slot is already assigned") 
        }
        else{
                var assignedSlots =await course.updateOne(
                        {CIid:req.query.id,_id:req.body.course, slot:{ day_slot:req.body.slot,assigned:"false"}},
                         {slot:{ day_slot:req.body.slot,assigned:"true"}}
                       );
                       var assignedMember =await academic_staff.updateOne(
                               {_id:req.body.assignedMember},
                                { $push: {
                                       schedule: {day_slot:req.body.slot ,course: req.body.course}
                                   }  }
                              );
                              res.json("assigned")
        }
}
}
else{
        res.json("please enter all required fields");
}
 } );

router.post('/deleteAssignment', async (req, res) => { 
// var assignedMember
// var course
if(req.body.course&&req.body.assignedMember&&req.body.slot){
var check3 = false
var checkCIHaveCourse = await academic_staff.find({_id:req.query.id,CI:true},{courses:true,_id:false})
console.log(checkCIHaveCourse)
checkCIHaveCourse = checkCIHaveCourse[0].courses
for(var i = 0 ; i<checkCIHaveCourse.length;i++){
        if(checkCIHaveCourse[i] == req.body.course ){
                check3 = true
                break
        }
}
if(check3 == true){
        var checkMemberGivesCourse = await academic_staff.find({_id:req.body.assignedMember},{courses:true,_id:false})
        var check1 = false
        if(checkMemberGivesCourse.length != 0){
        checkMemberGivesCourse = checkMemberGivesCourse[0].courses
        for(var i = 0 ; i<checkMemberGivesCourse.length;i++){
                if(checkMemberGivesCourse[i] == req.body.course ){
                        check1 = true
                        break
                }
        }
        }
        if(check1 == true ){
        check4 = false
        var checkTheslot = await academic_staff.find({_id:req.body.assignedMember,schedule:{day_slot:req.body.slot,course:req.body.course}})
        if(checkTheslot.length!=0){
                academic_staff.updateOne({_id:req.body.assignedMember}, 
                { $pull: {schedule:{day_slot:req.body.slot,course:req.body.course}}})
                .then((doc) => {
                console.log(doc);
                })
                .catch((err) => {
                console.error(err);
                });

                var assignedSlots =await course.updateOne(
                        {CIid:req.params.id,_id:req.body.course, slot:{ day_slot:req.body.slot,assigned:"true"}},
                         {slot:{ day_slot:req.body.slot,assigned:"false"}})
                         .then((doc) => {
                                console.log(doc);
                                })
                                .catch((err) => {
                                console.error(err);
                                });
                                res.json("deleted slot");
        }
        else{
                res.json("academic member is not assigned to this slot");
        }
}
        else{
                res.json("academic member is not assigned to this course");
        }
}
else{
        res.json("you don't give this course");
}
}else{
        res.json("enter all required fileds");
}


        });
router.post('/updateAssignment', async (req, res) => { 
                // var assignedMember
                // var course
                if(req.body.course&&req.body.assignedMember&&req.body.slot&&req.body.newMember){
                var check3 = false
                var checkCIHaveCourse = await academic_staff.find({_id:req.query.id,CI:true},{courses:true,_id:false})
                console.log(checkCIHaveCourse)
                checkCIHaveCourse = checkCIHaveCourse[0].courses
                for(var i = 0 ; i<checkCIHaveCourse.length;i++){
                        if(checkCIHaveCourse[i] == req.body.course ){
                                check3 = true
                                break
                        }
                }
                if(check3 == true){
                        var checkMemberGivesCourse = await academic_staff.find({_id:req.body.assignedMember},{courses:true,_id:false})
                        var check1 = false
                        if(checkMemberGivesCourse.length != 0){
                        checkMemberGivesCourse = checkMemberGivesCourse[0].courses
                        for(var i = 0 ; i<checkMemberGivesCourse.length;i++){
                                if(checkMemberGivesCourse[i] == req.body.course ){
                                        check1 = true
                                        break
                                }
                        }
                        }
                        if(check1 == true ){
                        var checkTheslot = await academic_staff.find({_id:req.body.assignedMember,schedule:{day_slot:req.body.slot,course:req.body.course}})
 
                        if(checkTheslot.length!=0){

                                var checkNewGivesCourse = await academic_staff.find({_id:req.body.newMember},{courses:true,_id:false})
                                var check4 = false
                                if(checkNewGivesCourse.length != 0){
                                        checkNewGivesCourse = checkNewGivesCourse[0].courses
                                for(var i = 0 ; i<checkNewGivesCourse.length;i++){
                                        if(checkNewGivesCourse[i] == req.body.course ){
                                                check4 = true
                                                break
                                        }
                                }
                                }
                                if(check4 == true){
                                academic_staff.updateOne({_id:req.body.assignedMember}, { $pull: {schedule:{day_slot:req.body.slot,course:req.body.course}}})
                                .then((doc) => {
                                console.log(doc);
                                })
                                .catch((err) => {
                                console.error(err);
                                });
                
                                        var academic1 = await academic_staff.update(
                                                        { _id:req.body.newMember},
                                                       { $push: {
                                                          schedule: [{day_slot:req.body.slot,course:req.body.course}]
                                                        }  
                                                        }
                                                        )
                                                    .then((doc) => {
                                                    console.log(doc);
                                                    })
                                                    .catch((err) => {
                                                    console.error(err);
                                                    });
                        res.json("updated");
                        }
                        
                else{
                        res.json("the member you are trying to add this slot to is not assigned to this course");
                }
        }
                        else{
                                res.json("academic member is not assigned to this slot");
                        }
                }
                        else{
                                res.json("academic member is not assigned to this course");
                        }
                }
                else{
                        res.json("you don't give this course");
                }
                }else{
                        res.json("enter all required fileds");
                }
                
                
                        });

//assign academic member in each course to be course coordinator
router.post('/assignMem', async (req, res) =>{
        const staffMem=await academic_staff.find({ _id:req.query.id, CI:"true" })
        if(staffMem[0].length==0){
            res.json("sorry cant access this page")
        }
        else{
            if(req.body.memId && req.body.courseName)
            {
                const staffModel=await academic_staff.find({_id:req.body.memId, courses:req.body.courseName})
                if(staffModel.length==0){
                    res.json("no staff with this id found in this course")
                } 
                else{
                    var Staff2= academic_staff.updateOne(
                        { _id:req.body.memId},
                        {CC:"true"},
                        
                    )
                    .then((doc) => {
                    console.log(doc);
                    })
                    .catch((err) => {
                    console.error(err);
                    });
                    var courseModel2= course.updateMany(
                        { name:req.body.courseName},
                        {$set: {CCid:req.body.memId}},
                        
                    )
                    .then((doc) => {
                    console.log(doc);
                    })
                    .catch((err) => {
                    console.error(err);
                    });
                    res.json("course coordinator assigned")
                }
    
            }
    
            else
            res.json("please insert missing field")
        }
    
    })

module.exports= router;