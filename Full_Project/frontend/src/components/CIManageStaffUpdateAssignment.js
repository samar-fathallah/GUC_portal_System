import React, { Component } from 'react'

import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import {Button, Form, Card,CardGroup} from "react-bootstrap";
import "./styles.css";

export default class CIManageStaffUpdateAssignment extends Component {
    constructor(props){
        super(props)
        this.state={
            course_name:"",
            Assigned_member:"",
            slot:"",
            newMember:"",
            message:null
        }
        this.updateAssignment=this.updateAssignment.bind(this);
        this.changecourse_name =this.changecourse_name.bind(this);
        this.changeAssigned_member = this.changeAssigned_member.bind(this);
        this.changeslot = this.changeslot.bind(this);
        this.changenewMember = this.changenewMember.bind(this);
    }

    async updateAssignment(e){
      e.preventDefault();
              axios({
                method: 'post',
                url: '/CI/updateAssignment',
                params: {
                  id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
                },
                data: {
                  course: this.state.course_name,
                  assignedMember: this.state.Assigned_member,
                  slot:this.state.slot,
                  newMember:this.state.newMember
                },
                headers:{
                  "auth-token":sessionStorage.getItem("token")
              }}).then(res=>{
                  this.setState({
                    message:res.data
                  });
                    console.log(res.data);
              }).catch(err=>{
                  console.log(err.response.data.msg)
              })
            }
              changecourse_name(e){
                this.setState({
                  course_name:e.target.value
                })
                console.log(this.state.email);
                
            }
            changeAssigned_member(e){
                this.setState({
                  Assigned_member:e.target.value
                })
              
            }
            changeslot(e){
              this.setState({
                slot:e.target.value
              })
          
          }
          changenewMember(e){
            this.setState({
                newMember:e.target.value
            })
         
        }
        
   
    
    render() {
        
        return (
           <div>
                  <NavBarStaff home="/CI" profile="/Staffprofile" attendance="/Myattendance" schedule="/MySchedule" request="/MyRequests"/>

        <CardGroup className="form">
  <Card>
    <Card.Body>
    <Card.Title>update assignment for a staff member</Card.Title>
    <Form>
    
  
    <Form.Label >course name</Form.Label>
    <Form.Control  placeholder="Enter course name" onChange={this.changecourse_name}/>

  
  
    <Form.Label>Assigned member</Form.Label>
    <Form.Control placeholder="enter the assigned member id" onChange={this.changeAssigned_member}/>


    <Form.Label>slot</Form.Label>
    <Form.Control placeholder="enter the slot he/she is assigned to" onChange={this.changeslot}/>
  

  
    <Form.Label>new member</Form.Label>
    <Form.Control  placeholder="enter the id of the new member that you want to add this slot to" onChange={this.changenewMember}/>
  
  <Button className = "b" variant="primary" type="submit" onClick = {this.updateAssignment}>
    update assignment
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
