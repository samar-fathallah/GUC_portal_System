import React, { Component } from 'react'

import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import {Button, Form, Card,CardGroup} from "react-bootstrap";
import "./styles.css";

export default class CCAddSlot extends Component {
    constructor(props){
        super(props)
        this.state={
            course:"",
            slot:"",
            message:null
        }
        this.addSlot=this.addSlot.bind(this);
        this.changeslot =this.changeslot.bind(this);
        this.changecourse = this.changecourse.bind(this);
    }

    async addSlot(e){
      e.preventDefault();
              axios({
                method: 'post',
                url: '/CC/addSlot',
                params: {
                  id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
                },
                data: {
                    course: this.state.course,
                    slot: this.state.slot,
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
            changeslot(e){
                this.setState({
                    slot:e.target.value
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
    <Card.Title>Add slot</Card.Title>
    <Form>
    
    <Form.Label >course name</Form.Label>
    <Form.Control placeholder="Enter course name" onChange={this.changecourse}/>
 
  

    <Form.Label>slot</Form.Label>
    <Form.Control  placeholder="example: sunday5th" onChange={this.changeslot}/>
 
  
  <Button style={{backgroundColor:'#0b1b3f'}} className = "b" variant="primary" type="submit" onClick = {this.addSlot}>
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

