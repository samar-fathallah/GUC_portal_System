import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import {Button, Form,Card,CardGroup,CardImg, Container,Row} from "react-bootstrap";
import "./styles.css";

export default class CIManageStaffViewStaffPerCourse extends Component {
    constructor(props){
        super(props)
        this.state={
            course_name:"",
            s:false,
            message:null,
        }
        this.changecourse_name=this.changecourse_name.bind(this)
        this.changeS=this.changeS.bind(this)
    

    }

   
 
         changecourse_name(e){
         
                this.setState({
                  course_name:e.target.value
                })
            }
            changeS(e){
              e.preventDefault();
              if(this.state.course_name===""){
                this.setState({
                  message:"please enter missing field"
                })
              }
              else{
                this.setState({
                  s:true
                })
                
            }
          }
    render() {
      
      if(this.state.s){
        
        return <Redirect to={{
          pathname: '/CIManageStaffViewStaffPerCourseView',
          state: { course_name: this.state.course_name }
          
      }}
      />
    }
    
     
    return (
      <div>
     <NavBarStaff home="/CI" profile="/Staffprofile" attendance="/Myattendance" schedule="/MySchedule" request="/MyRequests"/>
   <CardGroup className="form">
<Card>

<Form.Label >course name</Form.Label>
<Form.Control  placeholder="Enter course name" onChange={this.changecourse_name}/>


<Button className = "b" variant="primary" type="submit" onClick = {this.changeS}>
view
</Button>


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
        