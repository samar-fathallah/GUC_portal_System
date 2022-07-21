import React, { Component } from 'react';
import {Button, Form, Container} from "react-bootstrap";
import axios from "axios";

import NavBar from './NavBar.js';
import "./styles.css";

export default class updatesalary extends Component {
    constructor(props){
        super(props)
        this.state={
          
             name:"",
             email:"",
            
             Message:null
            
        }
        this.add=this.add.bind(this);
      
        this.changeName=this.changeName.bind(this);
        this.changeEmail=this.changeEmail.bind(this);
     
    }
      //req.body.staffID&& req.body.newSalary
      add(e){
        e.preventDefault();
        console.log(this.state.type)
              axios({
                method: 'post',
                url: 'HR/updateSalary',
                data: {
                    
                    staffID: this.state.name ,
                    newSalary:this.state.email,
               
                },
                headers:{
                  "auth-token":sessionStorage.getItem("token")
              }
              }).then(res=>{
                  this.setState({
                      Message:res.data
                  });
                    console.log(res.data);
                    
              }).catch(err=>{
                this.setState({
                    Message:err.response.data.msg
                });
              })
        
       
        }
      
      changeName(e){
        this.setState({
            name:e.target.value
        })
    }
    changeEmail(e){
        this.setState({
            email:e.target.value
        })
    }
  
    render() {
      
        return (
            <div>
<NavBar/>              <Container>
            <Form className="form">
          
  <Form.Group >
    <Form.Label>Staff Member ID</Form.Label>
    <Form.Control  placeholder="ac-12"onChange={this.changeName}/>
  </Form.Group>
  <Form.Group >
    <Form.Label>New Salary</Form.Label>
    <Form.Control  placeholder="1500" onChange={this.changeEmail}/>
  </Form.Group>
 
  <Button style={{backgroundColor:'#0b1b3f'}}  variant="primary" type="submit" onClick={this.add}>
    Update
  </Button>
</Form>
<div ng-show="Message == null">
<Form.Text className="text-muted" >
{this.state.Message}
    </Form.Text>
    </div>
</Container>
 
</div> 
        )
    }
}
