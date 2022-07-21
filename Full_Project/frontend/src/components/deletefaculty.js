import React, { Component } from 'react';
import {Button, Form, Container} from "react-bootstrap";

 import {Redirect} from "react-router-dom";

import NavBar from './NavBar.js';
import "./styles.css";
import axios from "axios";
export default class deletefaculty extends Component {
    constructor(props){
        super(props)
        this.state={
            l:false,
             Room:"",
             Message:null
            
        }
        this.add=this.add.bind(this);
        this.changeRoom=this.changeRoom.bind(this);
    }
      
      add(e){
        e.preventDefault();
        axios({
          method: 'post',
          url: 'HR/deleteFaculty',
          data: {
              faculty:this.state.Room
            
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
      
      changeRoom(e){
        this.setState({
            Room:e.target.value
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
    <Form.Label>Faculty Name</Form.Label>
    <Form.Control  placeholder="MET" onChange={this.changeRoom}/>
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
