
import React, { Component } from 'react';
import {Button, Form, Container} from "react-bootstrap";


import NavBar from './NavBar.js';
import "./styles.css";
import axios from "axios";
export default class addcourse extends Component {
    constructor(props){
        super(props)
        this.state={
            l:false,
             name:"",
             Dep:"",
             Message:null
            
        }
        this.add=this.add.bind(this);
        this.changeFaculty=this.changeFaculty.bind(this);
        this.changeDep=this.changeDep.bind(this);
    }
      
      add(e){
        e.preventDefault();
        axios({
          method: 'post',
          url: 'HR/addCourse',
          data: {
              course:this.state.name,
              department:this.state.Dep
            
          },
          headers:{
              "auth-token":sessionStorage.getItem("token")
          }
        }).then(res=>{
            this.setState({
               Message:res.data
            });
              console.log(this.state.Message);
        }).catch(err=>{
          this.setState({
            Message:err.response.data.msg
         });
            
        })
        
        }
      
      changeFaculty(e){
        this.setState({
            name:e.target.value
        })
    }
    changeDep(e){
        this.setState({
            Dep:e.target.value
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
    <Form.Label>Course Name</Form.Label>
    <Form.Control  placeholder="CSEN203" onChange={this.changeFaculty}/>
  </Form.Group>
  <Form.Group >
    <Form.Label>Department Name</Form.Label>
    <Form.Control  placeholder="MET" onChange={this.changeDep}/>
  </Form.Group>
  
  <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick={this.add}>
    Add
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
