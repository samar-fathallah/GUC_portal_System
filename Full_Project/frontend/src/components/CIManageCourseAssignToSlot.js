import React, { Component } from 'react'

import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import {Button, Form,Card,CardGroup} from "react-bootstrap";
import "./styles.css";

export default class CIManageCourseAssignMemberCC extends Component {
    constructor(props){
        super(props)
        this.state={
            course1:"",
            slot1:"",
            assignedMember1:"",
            message:null
        }
        this.AssignMember=this.AssignMember.bind(this);
        this.changecourse =this.changecourse.bind(this);
        this.changeslot = this.changeslot.bind(this);
        this.changeassignedMember = this.changeassignedMember.bind(this);
    }

    async AssignMember(e){
      e.preventDefault();
              axios({
                method: 'post',
                url: '/CI/AssignASlot',
                params: {
                  id:JSON.parse(sessionStorage.getItem("loggeduser"))._id

                },
                data: {
                    course: this.state.course1,
                    slot: this.state.slot1,
                    assignedMember: this.state.assignedMember1
                },headers:{
                  "auth-token":sessionStorage.getItem("token")
              }}).then(res=>{
                  this.setState({
                    message:res.data
                  });
                    console.log(res.data);
              }).catch(err=>{
                 
              })
            }
            changecourse(e){
                this.setState({
                  course1:e.target.value
                })
             
                
            }
            changeslot(e){
                this.setState({
                  slot1:e.target.value
                })
               
            } changeassignedMember(e){
              this.setState({
                assignedMember1:e.target.value
              })
             
          }
        
   
    
    render() {
        
        return (
           <div>
                        <NavBarStaff home="/CI" profile="/Staffprofile" attendance="/Myattendance" schedule="/MySchedule" request="/MyRequests"/>

        <CardGroup className="form">
  <Card>
    <Card.Body>
    <Card.Title>Assign an academic member to unassigned slot</Card.Title>
    <Form>
 
    <Form.Label >course name</Form.Label>
    <Form.Control placeholder="Enter course name" onChange={this.changecourse}/>

  
    <Form.Label>member id that you want to assign to</Form.Label>
    <Form.Control  placeholder="enter member id" onChange={this.changeassignedMember}/>
 

 
    <Form.Label>the slot that you want to assign to</Form.Label>
    <Form.Control placeholder="enter the slot" onChange={this.changeslot}/>
 

  
  <Button className="b"  style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick = {this.AssignMember}>
    assign
  </Button>
</Form>
    
    </Card.Body>
   
  </Card>
</CardGroup>
<div ng-show="message == null">
<Form.Text className="text-muted" className="color">
{this.state.message}
    </Form.Text>
    </div>
         </div> 
        )
    }
}
