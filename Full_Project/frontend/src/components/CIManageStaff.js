import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import {Button, Form, Card,CardGroup} from "react-bootstrap";
import "./styles.css";
import loc from './member.png';
export default class CIManageStaff extends Component {
    constructor(props){
        super(props)
        this.state={
            staff:[],
            message:null,
           
        }
      }
    componentDidMount () {
            axios.get('CI/courseAssignment', {
              params: {
                id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
              },headers:{
                "auth-token":sessionStorage.getItem("token")
            }
          
              }).then(res=>{
              if(res.data === "no courses found/you may not have access to this page" || res.data === "no slots found"){
                this.setState({
                  message:res.data
              }); 
              }else{
                this.setState({
                  staff:res.data
              }); 
              }
;               
              
              console.log(JSON.stringify(this.state.staff));
                    console.log(res.data);
                   
              }).catch(err=>{
                  console.log(err)
              })
          }
     
    
    render() {
      if(this.state.message ===null){
        return (
          
          <div>
         <NavBarStaff home="/CI" profile="/Staffprofile" attendance="/Myattendance" schedule="/MySchedule" request="/MyRequests"/>
       <div className = "table">
       <div class="table-wrapper">
              <table class="fl-table">
              <thead>
                    <tr>
                  <th>ID</th>
                <th>Slot</th>
                <th>Course</th>
                </tr>
              
                  </thead>
              </table>
          
        
       <div>
              <table class="fl-table">
              <thead>
                    <tr>
                  
                </tr>
              
                  </thead>
                  <tbody>
                  
        {this.state.staff.map(members=>(

        <tr >
        <td style={{fontSize:'20px'}}>{members.split(",")[0]}</td>
        <td style={{fontSize:'20px'}}>{members.split(",")[1]}</td>
        <td style={{fontSize:'20px'}}>{members.split(",")[2]}</td>
        </tr>  
       
      
      ))}
                  </tbody>
              </table>
          </div>
       </div>
       </div>
       <CardGroup>
<Card className = "cardPos" >
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>Delete assignment for a staff member</Card.Title>
     <Form>
       <Button className="b" variant="primary" href="/CIManageStaffDeleteAssignment">
                delete assignment
       </Button>
     </Form>
 </Card.Body>
</Card>
<Card className = "cardPos">
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>update assignment for a staff member</Card.Title>
     <Form>
       <Button className="b" variant="primary"  href="/CIManageStaffUpdateAssignment">
                update assignment
       </Button>
     </Form>
 </Card.Body>
</Card>
<Card className = "cardPos">
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>View staff in your department</Card.Title>
     <Form>
     <Button className="b" variant="primary"  href="/CIManageStaffViewStaff">view</Button>
     </Form>
 </Card.Body>
</Card>
<Card className = "cardPos">
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>View staff per Course</Card.Title>
     <Form>
     <Button className="b" variant="primary"  href="/CIManageStaffViewStaffPerCourse">view</Button>
     </Form>
 </Card.Body>
</Card>
</CardGroup>
        </div> 
       )
      }else{
        return (
          
          <div>
         <NavBarStaff home="/CI" profile="/Staffprofile" attendance="/Myattendance" schedule="/MySchedule" request="/MyRequests"/>
       <div className = "table">
      
       <h1 >{JSON.stringify(this.state.message)}</h1>
       </div>
       <CardGroup>
<Card className = "cardPos" >
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>Delete assignment for a staff member</Card.Title>
     <Form>
       <Button className="b" variant="primary" href="/CIManageStaffDeleteAssignment">
                delete assignment
       </Button>
     </Form>
 </Card.Body>
</Card>
<Card className = "cardPos">
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>update assignment for a staff member</Card.Title>
     <Form>
       <Button className="b" variant="primary"  href="/CIManageStaffUpdateAssignment">
                update assignment
       </Button>
     </Form>
 </Card.Body>
</Card>
<Card className = "cardPos">
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>View staff in your department</Card.Title>
     <Form>
     <Button className="b" variant="primary"  href="/CIManageStaffViewStaff">view</Button>
     </Form>
 </Card.Body>
</Card>
<Card className = "cardPos">
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>View staff per Course</Card.Title>
     <Form>
     <Button className="b" variant="primary"  href="/CIManageStaffViewStaffPerCourse">view</Button>
     </Form>
 </Card.Body>
</Card>
</CardGroup>
        </div> 
       )
      }
       
        
      }
    }