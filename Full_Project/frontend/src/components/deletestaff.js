import React, { Component } from 'react';
import {Button, Form, Container} from "react-bootstrap";
import axios from "axios";

import NavBar from './NavBar.js';
import "./styles.css";

export default class deletestaff extends Component {
    constructor(props){
        super(props)
        this.state={
          
             name:"",
         
            
             Message:null
            
        }
        this.add=this.add.bind(this);
      
        this.changeName=this.changeName.bind(this);
     
     
    }
      //req.body.staffID&& req.body.newSalary
      add(e){
        e.preventDefault();
        console.log(this.state.type)
              axios({
                method: 'post',
                url: 'HR/deleteStaff',
                data: {
                    
                    staffID: this.state.name ,
                   
               
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
  
    render() {
      if(JSON.parse(sessionStorage.getItem("loggeduser")).HOD===true ||
      JSON.parse(sessionStorage.getItem("loggeduser")).CC===true || JSON.parse(sessionStorage.getItem("loggeduser")).CI===true ||JSON.parse(sessionStorage.getItem("loggeduser")).TA===true  ){
       return(
       <h1>Sorry Can't Access this Page</h1>)
     }
     else{
        return (
            <div>
<NavBar/>              <Container>
            <Form className="form">
          
  <Form.Group >
    <Form.Label>Staff Member ID</Form.Label>
    <Form.Control  placeholder="ac-12"onChange={this.changeName}/>
  </Form.Group>
  
 
  <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick={this.add}>
    Delete
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
}
