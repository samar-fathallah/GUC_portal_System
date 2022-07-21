//styling
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"
import {Route,BrowserRouter} from "react-router-dom";
import axios from "axios";
//components
import Login from "./components/login";
import About from "./components/schedule";
import myattend from "./components/Myattendance";
import HR from "./components/HRHome";
import mysignout from "./components/MySignOutHR";
import profile from "./components/profile";
import locations from "./components/Locations";
import addlocation from "./components/addlocation";
import updatelocation from "./components/updatelocation";
import deletelocation from "./components/deletelocation";
import Faculty from "./components/Faculty";
import addFaculty from "./components/addfaculty";
import deleteFaculty from "./components/deletefaculty";
import updateFaculty from "./components/updatefaculty";
import Department from "./components/Department";
import addDep from "./components/adddepartment";
import updateDep from "./components/updatedepartment";
import deletedep from "./components/deletedepartment";
import Course from "./components/Courses";
import addcourse from "./components/addcourse";
import deletecourse from "./components/deletecourse";
import updatecourse from "./components/updatecourse";
import managestaff from "./components/ManageStaff";
import addmember from "./components/Addmember";
import viewattendance from "./components/viewattendanceHR";
import attendance from "./components/attendance";
import viewmissing from "./components/ViewMissing";
import missingH from "./components/missingH";
import missingD from "./components/missingD";
import salary from "./components/updatesalary";
import deletestaff from "./components/deletestaff";
import updatestaff from "./components/updatestaff";
import addsign from "./components/addsign";
import HOD from "./components/Head";
import CI from "./components/CIHome";
import NavBarStaff from "./components/NavBarStaff";
import TA from "./components/TA";
import NavBar from "./components/NavBar";
import pick from "./components/PickPortal";
import pick2 from "./components/Pick";
//StaffMembers
//SIGNS
import mysignin1 from "./components/MySignInStaff";

import mysignout1 from "./components/MySignOutStaff";

//PASSWORD
import password1 from "./components/passwordStaff";

import password5 from "./components/passwordHR";
//SCHEDULES
import schedule1 from "./components/MyScheduleStaff";

//ATTENDANCE
import att1 from "./components/MyAttendanceStaff";


import month1 from "./components/MyAttMonthStaff";

import month5 from "./components/MyAttMonthHR";
import md1 from "./components/MissDayStaff";

import md5 from "./components/MissingDayHR";
import mh1 from "./components/MissHourStaff";

import mh5 from "./components/MissingHourHR";
//Requests
import req1 from "./components/MyRequestsStaff";

import repl1 from "./components/ReplaceStaff";

import sub1 from "./components/SubmitStaff";

import acc1 from "./components/AccStaff";

import pen1 from "./components/PenStaff";

import rej1 from "./components/RejStaff";

import  send1 from  "./components/SickStaff";
import  send2 from  "./components/AnnualStaff";
import  send3 from  "./components/AccidentStaff";
import  send4 from  "./components/SlotLinkStaff";
import  send5 from  "./components/ChangeDayStaff";
import  send6 from  "./components/MaterStaff";
import  send7 from  "./components/ComStaff";
import view1 from "./components/ViewReplaceStaff";
import view2 from "./components/SubmitReplaceStaff";
//CC
import CCSlotLinking from "./components/CCSlotLinking";

import CCAddSlot from "./components/CCAddSlot";
import CCUpdateSlot from "./components/CCUpdateSlot";
import CCDeleteSlot from "./components/CCDeleteSlot";

 





//OSS
import HODmanageStaff from "./components/HODmanageStaff";
import viewStaff from "./components/viewStaff";
import viewStaffCourse from "./components/viewStaffCourse";
import dayOff from "./components/dayOff";
import dayOffOne from "./components/dayOffOne";
import manageCourse from "./components/manageCourse";
import manageRequests from "./components/manageRequests";

import singleChangeReplacementState from "./components/singleChangeReplacementState";
import manageRequestsReplacementAll from "./components/manageRequestsReplacementAll";
import manageRequestsReplacementSingle from "./components/manageRequestsReplacementSingle";

import manageRequestsLeaveAll from "./components/manageRequestsLeaveAll";
import manageRequestsChangeAll from "./components/manageRequestsChangeAll";
import manageRequestsLeaveSingle from "./components/manageRequestsLeaveSingle";
import manageRequestsChangeSingle from "./components/manageRequestsChangeSingle";
import singleLeaveRequestState from "./components/singleLeaveRequestState";
import singleChangeRequestState from "./components/singleChangeRequestState";
import manageCourseCoverage from "./components/manageCourseCoverage";
import manageCourseInstructor from "./components/manageCourseInstructor";
import HODSelectCourse from "./components/HODSelectCourse";
import HODassignments from "./components/HODassignments";

import mysignin from "./components/MySignInHR";
import staffprofile from "./components/ProfileStaff";
// OMAR
import cchome from "./components/CCHome";
import CIManageStaff from "./components/CIManageStaff";
import CIManageStaffDeleteAssignment from "./components/CIManageStaffDeleteAssignment";
import CIManageStaffUpdateAssignment from "./components/CIManageStaffUpdateAssignment";
import CIManageCourseAssignMemberCC from "./components/CIManageCourseAssignMemberCC";
import CIManageStaffViewStaff from "./components/CIManageStaffViewStaff";
import CIManageCourse from "./components/CIManageCourse";
import CIManageCourseCoverage from "./components/CIManageCourseCoverage";
import CIManageCourseAssignToSlot from "./components/CIManageCourseAssignToSlot";
import CIManageStaffViewStaffPerCourse from "./components/CIManageStaffViewStaffPerCourse";
import CIManageStaffViewStaffPerCourseView from "./components/CIManageStaffViewStaffPerCourseView";

function App(props) {
  if(sessionStorage.getItem("loggeduser")&&sessionStorage.getItem("token")){
    axios.defaults.headers.common["auth-token"]=sessionStorage.getItem("token");
    console.log(axios.defaults.headers.common["auth-token"]);
  }
  else{
    delete axios.defaults.headers.common["auth-token"];
  }
  return (
    <BrowserRouter>
    <div className="App">
  
    <Route path = "/" exact component = {Login} />
    <Route path = "/about" component = {About} />
         <Route path="/profile" component={profile}/>
         {/* SIGN INS */}
         <Route path = "/MySignInHR" component = {mysignin} />
         <Route path = "/MySignInStaff" component = {mysignin1} />
       
         {/* SIGN OUTS */}
         <Route path = "/MySignOutHR" component = {mysignout} />
         <Route path = "/MySignOutStaff" component = {mysignout1} />
       
        {/* PASSWORD RESET */}
         <Route path= "/passwordHR" component ={password5}/>
         <Route path= "/passwordStaff" component ={password1}/>
      
         {/* SCHEDULE */}
         <Route path= "/MyScheduleStaff" component ={schedule1}/>
    
         {/* ATTENDANCE */}
         <Route path="/MyAttendanceStaff" component={att1}/>
        
         <Route path="/MyAttMonthStaff" component={month1}/>
      
         <Route path="/MyAttMonthHR" component={month5}/>

        <Route path="/MissHourStaff" component={mh1}/>
      
        <Route path="/MissingHourHR" component={mh5}/>
        <Route path="/MissDayStaff" component={md1}/>
      
        <Route path="/MissingDayHR" component={md5}/>
    {/* REQUESTS */}
    <Route path="/MyRequestsStaff" component={req1}/>
  
    <Route path="/SubmitStaff" component={sub1}/>

    <Route path="/ReplaceStaff" component={repl1}/>
    
    <Route path="/AccStaff" component={acc1}/>
  
    <Route path="/RejStaff" component={rej1}/>
   
    <Route path="/PenStaff" component={pen1}/>

    <Route path="/SickStaff" component={send1}/>
    <Route path="/AnnualStaff" component={send2}/>
    <Route path="/AccidentStaff" component={send3}/>
    <Route path="/SlotLinkStaff" component={send4}/>
    <Route path="/ChangeDayStaff" component={send5}/>
    <Route path="/MaterStaff" component={send6}/>
    <Route path="/ComStaff" component={send7}/>
    <Route path="/ViewReplaceStaff" component={view1}/>
    <Route path="/SubmitReplaceStaff" component={view2}/>
  
{/* CC */}
  <Route path = "/CCAddSlot" component = {CCAddSlot} />
         <Route path = "/CCUpdateSlot" component = {CCUpdateSlot} />
         <Route path = "/CCDeleteSlot" component = {CCDeleteSlot} />
 <Route path = "/CCSlotLinking" component = {CCSlotLinking} />
 




         <Route path = "/HRHome" component = {HR} />
         <Route path="/PickPortal" component={pick}/>
         <Route path="/Pick" component={pick2}/>
         <Route path = "/Locations" component = {locations} />
         <Route path = "/addlocation" component = {addlocation} />
         <Route path = "/updatelocation" component = {updatelocation} />
         <Route path = "/deletelocation" component = {deletelocation} />
         <Route path = "/Faculty" component = {Faculty} />
         <Route path = "/addfaculty" component = {addFaculty} />
         <Route path = "/deletefaculty" component = {deleteFaculty} />
         <Route path = "/updatefaculty" component = {updateFaculty} />
         <Route path = "/Department" component = {Department} />
         <Route path = "/adddepartment" component = {addDep} />
         <Route path = "/deletedepartment" component = {deletedep} />
         <Route path = "/updatedepartment" component = {updateDep} />
         <Route path = "/Course" component = {Course} />
         <Route path = "/addcourse" component = {addcourse} />
         <Route path = "/deletecourse" component = {deletecourse} />
         <Route path = "/updatecourse" component = {updatecourse} />
         <Route path = "/ManageStaff" component = {managestaff} />
         <Route path = "/Addmember" component = {addmember} />
         <Route path = "/viewattendanceHR" component ={viewattendance}/>
         <Route path = "/attendance" component ={attendance}/>
         <Route path = "/ViewMissing" component ={viewmissing}/>
         <Route path = "/missingH" component ={missingH}/>
         <Route path = "/missingD" component ={missingD}/>
         <Route path = "/deletestaff" component ={deletestaff}/>
         <Route path = "/updatestaff" component ={updatestaff}/>
         <Route path = "/CIHome" component = {CI} />
         <Route path = "/CCHome" component = {cchome} />
         <Route path = "/profile" component ={profile}/>
         <Route path = "/updatesalary" component ={salary}/>
         <Route path = "/addsign" component ={addsign}/>
         <Route path = "/TA" component = {TA} />
         <Route path ="/NavBar" component = {NavBar}/>
         <Route path ="/Myattendance"component={myattend}/>
       
         {/* Staff */}
         {/* <Route path ="/MySchedule" component = {myschedule}/>
         <Route path ="/MyRequests" component = {myrequests}/> */}
         <Route path ="/ProfileStaff" component = {staffprofile}/>
         <Route path ="/NavBarStaff" component = {NavBarStaff}/>
         {/* OSS */}
         <Route path = "/Head" component = {HOD} />
        <Route path = "/HODmanageStaff" exact component = {HODmanageStaff} />
         <Route path = "/viewStaff" component = {viewStaff} />
         <Route path = "/dayOff" component = {dayOff} />
         <Route path = "/dayOffOne" component = {dayOffOne} />
         <Route path = "/manageCourse" component = {manageCourse} />
         <Route path = "/manageRequests" component = {manageRequests} />
         <Route path = "/manageRequestsLeaveAll" component = {manageRequestsLeaveAll} />
         <Route path = "/manageRequestsChangeAll" component = {manageRequestsChangeAll} />
         <Route path = "/manageRequestsLeaveSingle" component = {manageRequestsLeaveSingle} />
         <Route path = "/manageRequestsChangeSingle" component = {manageRequestsChangeSingle} />
         <Route path = "/singleLeaveRequestState" component = {singleLeaveRequestState} />
         <Route path = "/singleChangeRequestState" component = {singleChangeRequestState} />
         <Route path = "/manageCourseCoverage" component = {manageCourseCoverage} />
         <Route path = "/manageCourseInstructor" component = {manageCourseInstructor} />
         <Route path = "/viewStaffCourse" component = {viewStaffCourse} />
         <Route path = "/HODSelectCourse" component = {HODSelectCourse} />
         
         <Route path = "/singleChangeReplacementState" component = {singleChangeReplacementState} />
         <Route path = "/manageRequestsReplacementAll" component = {manageRequestsReplacementAll} />
         <Route path = "/manageRequestsReplacementSingle" component = {manageRequestsReplacementSingle} />
         <Route path = "/HODassignments" component = {HODassignments} />
         {/* OMAR */}
         <Route path = "/CIManageStaff" component = {CIManageStaff} />
         <Route path = "/CIManageStaffDeleteAssignment" component = {CIManageStaffDeleteAssignment} />
         <Route path = "/CIManageStaffUpdateAssignment" component = {CIManageStaffUpdateAssignment} />
         <Route path = "/CIManageCourseAssignMemberCC" component = {CIManageCourseAssignMemberCC} />
         <Route path = "/CIManageStaffViewStaff" component = {CIManageStaffViewStaff} /> 
         <Route path = "/CIManageCourse" component = {CIManageCourse} />        
         <Route path = "/CIManageCourseCoverage" component = {CIManageCourseCoverage} />   
         <Route path = "/CIManageCourseAssignToSlot" component = {CIManageCourseAssignToSlot} /> 
         <Route path = "/CIManageStaffViewStaffPerCourseView" component = {CIManageStaffViewStaffPerCourseView} />
         <Route path = "/CIManageStaffViewStaffPerCourse" component = {CIManageStaffViewStaffPerCourse} />
         


        
    </div>
    </BrowserRouter>
  );
}

export default App;
