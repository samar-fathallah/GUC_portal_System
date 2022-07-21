import React, { Component } from 'react'

import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import {Button, Form, Card,CardGroup} from "react-bootstrap";
import "./styles.css";

export default class CCUpdateSlot extends Component {
    constructor(props){
        super(props)
        this.state={
            course:"",
            oldSlot:"",
            newSlot:"",
            assigned:"",

            message:null
        }
        this.updateSlot=this.updateSlot.bind(this);
        this.changeoldSlot =this.changeoldSlot.bind(this);
        this.changenewSlot =this.changenewSlot.bind(this);
        this.changeassigned =this.changeassigned.bind(this);
        this.changecourse = this.changecourse.bind(this);
    }

    async updateSlot(e){
        console.log( this.state.oldSlot)
      e.preventDefault();
              axios({
                method: 'post',
                url: '/CC/updateSlot',
                params: {
                  id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
                },
                data: {
                    course: this.state.course,
                    oldSlot: this.state.oldSlot,
                    newSlot: this.state.newSlot,
                    assigned: this.state.assigned,
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
            changeoldSlot(e){
                this.setState({
                    oldSlot:e.target.value
                })
               
                
            }
            changenewSlot(e){
                this.setState({
                    newSlot:e.target.value
                })
               
                
            }
            changeassigned(e){
                this.setState({
                    assigned:e.target.value
                })
               
                
            }
            changecourse(e){
                this.setState({
                    course:e.target.value
                })
            
            }
        
   
    
    render() {
        
        return (
           <div>
                 <NavBarStaff/>

        <CardGroup className="form">
  <Card>
    <Card.Body>
    <Card.Title>Update slot</Card.Title>
    <Form>
    
    <Form.Label >course name</Form.Label>
    <Form.Control placeholder="Enter course name" onChange={this.changecourse}/>
 
  

    <Form.Label>Old slot</Form.Label>
    <Form.Control  placeholder="enter the slot you want to update" onChange={this.changeoldSlot}/>

    <Form.Label>New slot</Form.Label>
    <Form.Control  placeholder="example: sunday5th" onChange={this.changenewSlot}/>

    <Form.Label>Assign</Form.Label>
    <Form.Control  placeholder="example: true" onChange={this.changeassigned}/>
 
  
  <Button style={{backgroundColor:'#0b1b3f'}}className = "b" variant="primary" type="submit" onClick = {this.updateSlot}>
    update
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

