import React, { Component } from 'react';
import {Button, Form, Container} from "react-bootstrap";
import axios from "axios";

import NavBar from './NavBar.js';
import "./styles.css";

export default class addmember extends Component {
    constructor(props){
        super(props)
        this.state={
            type:"",
             name:"",
             email:"",
             salary:null,
             office:"",
             extra:"",
             Message:null
            
        }
        this.add=this.add.bind(this);
        this.changeType=this.changeType.bind(this);
        this.changeName=this.changeName.bind(this);
        this.changeEmail=this.changeEmail.bind(this);
        this.changeSalary=this.changeSalary.bind(this);
        this.changeOffice=this.changeOffice.bind(this);
        this.changeExtra=this.changeExtra.bind(this);
        
    }
      
      add(e){
        e.preventDefault();
        console.log(this.state.type)
              axios({
                method: 'post',
                url: 'HR/addmember',
                data: {
                    type:this.state.type,
                    name: this.state.name ,
                    email:this.state.email,
                    salary:this.state.salary,
            office:this.state.office,
                    extra:this.state.extra
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
        changeType(e){
            this.setState({
                type:e.target.value
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
    changeSalary(e){
        this.setState({
            salary:e.target.value
        })
    }
    changeOffice(e){
        this.setState({
            office:e.target.value
        })
    }
    changeExtra(e){
        this.setState({
            extra:e.target.value
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
    <Form.Label>Member Type</Form.Label>
    <Form.Control  placeholder="hr/ac"onChange={this.changeType}/>
  </Form.Group>
  <Form.Group >
    <Form.Label>Name</Form.Label>
    <Form.Control  placeholder="full name"onChange={this.changeName}/>
  </Form.Group>
  <Form.Group >
    <Form.Label>Email</Form.Label>
    <Form.Control  placeholder="email@staff.com" onChange={this.changeEmail}/>
  </Form.Group>
  <Form.Group >
    <Form.Label>Salary</Form.Label>
    <Form.Control  placeholder="1200" onChange={this.changeSalary}/>
  </Form.Group>
  <Form.Group >
    <Form.Label>Office</Form.Label>
    <Form.Control  placeholder="C7.203" onChange={this.changeOffice}/>
  </Form.Group>
  <Form.Group >
    <Form.Label>Extra Info</Form.Label>
    <Form.Control  placeholder="Additional Information" onChange={this.changeExtra}/>
  </Form.Group>
  
  <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick={this.add}>
    Add
  </Button>
</Form>
<div ng-show="Message == null">
<Form.Text className="text-muted">
{this.state.Message}
    </Form.Text>
    </div>
</Container>
 
</div> 
        )
    }
}
}
