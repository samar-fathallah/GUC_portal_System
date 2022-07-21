import React, { Component } from 'react'

import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import {Button, Form,Card,CardGroup} from "react-bootstrap";
import staff from './course.png';
import "./styles.css";
export default class CIManageCourse extends Component {
  constructor(props){
      super(props)
      this.state={
          courses:[],
          message:null
          
      }
    
  }
  componentDidMount () {
          axios.get('CI/courses', {
            params: {
              id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
            },
            headers:{
              "auth-token":sessionStorage.getItem("token")
          }
        
            }).then(res=>{
              if(res.data===null){
                this.setState({
                  message:"you do not have any courses"
            }); 
              }else{
                this.setState({
                  courses:res.data
            }); 
              }
              
                  console.log(res.data);
                 
            }).catch(err=>{
                console.log(err)
            })
        }
  
    
    render() {
      if(this.state.message!="you do not have any courses") {
        return (
           <div>
                  <NavBarStaff home="/CI" profile="/Staffprofile" attendance="/Myattendance" schedule="/MySchedule" request="/MyRequests"/>

<div className="table">
<div class="table-wrapper">
  <table class="fl-table">
      <thead>
      <tr>
 <th>Courses</th>
 </tr>
      </thead>
      <tbody>
      
{this.state.courses.map(values=>(
values.courses.map(c =>(
 <tr style={{fontSize:'25px'}}>{c}</tr>  
))

))} 
      </tbody>
  </table>
</div> 
</div>
        <CardGroup>
<Card className = "cardPos">
<img
        src={staff}
        className="center"
      />
  <Card.Body>
    <Card.Title>Assign a member to be a course coordinator</Card.Title>
      <Form>
      <Button className="login100-form-btn buttonalign" style={{marginLeft:'120px'}} variant="primary"  href="/CIManageCourseAssignMemberCC">Assign</Button>
      </Form>
  </Card.Body>
</Card>

<Card className = "cardPos">
<img
        src={staff}
        className="center"
      />
  <Card.Body>
    <Card.Title>View the coverage of the courses you assigned to</Card.Title>
      <Form>
        <Button className="login100-form-btn buttonalign" style={{marginLeft:'120px'}} variant="primary"  href="/CIManageCourseCoverage">
                 view
        </Button>
      </Form>
  </Card.Body>
</Card>
<Card className = "cardPos">
<img
        src={staff}
        className="center"
      />
  <Card.Body>
    <Card.Title>Assign an acdamic member to unassigned slot</Card.Title>
      <Form>
      <Button className="login100-form-btn buttonalign" style={{marginLeft:'120px'}} variant="primary"  href="/CIManageCourseAssignToSlot">Assign</Button>
      </Form>
  </Card.Body>
</Card>
</CardGroup>
</div>
)
}

else{
  return (
          
          <div>
                 <NavBarStaff home="/CI" profile="/Staffprofile" attendance="/Myattendance" schedule="/MySchedule" request="/MyRequests"/>

                 <h1 >{JSON.stringify(this.state.message)}</h1>
       
       <CardGroup>
<Card className = "cardPos">
 <Card.Body>
   <Card.Title>Assign an acdamic member to be a course coordinator</Card.Title>
     <Form>
     <Button variant="primary"  href="/CIManageCourseAssignMemberCC">Assign</Button>
     </Form>
 </Card.Body>
</Card>

<Card className = "cardPos">
 <Card.Body>
   <Card.Title>View the coverage of the courses you assigned to</Card.Title>
     <Form>
       <Button variant="primary"  href="/CIManageCourseCoverage">
                view
       </Button>
     </Form>
 </Card.Body>
</Card>
<Card className = "cardPos">
 <Card.Body>
   <Card.Title>Assign an acdamic member to unassigned slot</Card.Title>
     <Form>
     <Button className="login100-form-btn buttonalign" style={{marginLeft:'120px'}} variant="primary"  href="/CIManageCourseAssignToSlot">Assign</Button>
     </Form>
 </Card.Body>
</Card>
</CardGroup>
        </div> 

      
        )}
    }
}
