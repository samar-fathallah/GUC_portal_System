import React, { Component } from 'react';
import {Button, Form, Container} from "react-bootstrap";
import axios from "axios";
import NavBar from './NavBar.js';
import "./styles.css";

export default class addcourse extends Component {
    constructor(props){
        super(props)
        this.state={
            l:false,
             name:"",
           Message:null
            
        }
        this.add=this.add.bind(this);
        this.changeFaculty=this.changeFaculty.bind(this);
    
    }
      
      add(e){
          e.preventDefault();
        axios({
            method: 'post',
            url: 'HR/deleteCourse',
            data: {
                course:this.state.name,
                
              
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
              console.log(err.response.data.msg)
          })
          
       
        }
      
      changeFaculty(e){
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
    <Form.Label>Course Name</Form.Label>
    <Form.Control  placeholder="CSEN203" onChange={this.changeFaculty}/>
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
