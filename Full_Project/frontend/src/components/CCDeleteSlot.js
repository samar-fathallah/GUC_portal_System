import React, { Component } from 'react'

import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import {Button, Form, Card,CardGroup} from "react-bootstrap";
import "./styles.css";

export default class CCDeleteSlot extends Component {
    constructor(props){
        super(props)
        this.state={
            course:"",
            oldSlot:"",
            message:null
        }
        this.updateSlot=this.updateSlot.bind(this);
        this.changeoldSlot =this.changeoldSlot.bind(this);
        this.changecourse = this.changecourse.bind(this);
    }

    async updateSlot(e){
        console.log( this.state.oldSlot)
      e.preventDefault();
              axios({
                method: 'post',
                url: '/CC/deleteSlot',
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
    <Card.Title>Delete slot</Card.Title>
    <Form>
    
    <Form.Label >course name</Form.Label>
    <Form.Control placeholder="Enter course name" onChange={this.changecourse}/>
 
  

    <Form.Label>Old slot</Form.Label>
    <Form.Control  placeholder="enter the slot you want to update" onChange={this.changeoldSlot}/>

  
  <Button className = "b" style={{backgroundColor:'#0b1b3f'}}variant="primary" type="submit" onClick = {this.updateSlot}>
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

