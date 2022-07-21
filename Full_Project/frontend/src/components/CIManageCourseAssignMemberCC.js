import React, { Component } from 'react'

import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import {Button, Form, Card,CardGroup} from "react-bootstrap";
import "./styles.css";

export default class CIManageCourseAssignToSlot extends Component {
    constructor(props){
        super(props)
        this.state={
            memId:"",
            courseName:"",
            message:null
        }
        this.AssignMemberCC=this.AssignMemberCC.bind(this);
        this.changememId =this.changememId.bind(this);
        this.changecourseName = this.changecourseName.bind(this);
    }

    async AssignMemberCC(e){
      e.preventDefault();
              axios({
                method: 'post',
                url: '/CI/assignMem',
                params: {
                  id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
                },
                data: {
                    memId: this.state.memId,
                    courseName: this.state.courseName,
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
            changememId(e){
                this.setState({
                    memId:e.target.value
                })
               
                
            }
            changecourseName(e){
                this.setState({
                    courseName:e.target.value
                })
            
            }
        
   
    
    render() {
        
        return (
           <div>
                 <NavBarStaff home="/CI" profile="/Staffprofile" attendance="/Myattendance" schedule="/MySchedule" request="/MyRequests"/>

        <CardGroup className="form">
  <Card>
    <Card.Body>
    <Card.Title>Assign an academic member to be a course coordinator</Card.Title>
    <Form>
    
    <Form.Label >course name</Form.Label>
    <Form.Control placeholder="Enter course name" onChange={this.changecourseName}/>
 
  

    <Form.Label>member id</Form.Label>
    <Form.Control  placeholder="enter member id" onChange={this.changememId}/>
  
  <Button className = "b" style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick = {this.AssignMemberCC}>
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

