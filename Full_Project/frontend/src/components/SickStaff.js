import React, { Component } from 'react';
import {Button, Form, Col,Row, Container} from "react-bootstrap";


 import axios from "axios";
import NavBarStaff from './NavBarStaff.js';
import "./styles.css";
export default class SickStaff extends Component {
    constructor(props){
        super(props)
        this.state={
            l:false,
             Date:null,
             Document:null,
            
        }
        this.add=this.add.bind(this);
        this.changeDate=this.changeDate.bind(this);
        this.changeDoc=this.changeDoc.bind(this);
     
      }

      add(e){
        e.preventDefault();
        this.setState({Message:null})
        console.log(this.state.Date)
        if(this.state.Date && this.state.Document){
        axios({
          method: 'post',
          url: '/SickLeaveRequest',
          data: {
              year:JSON.parse(JSON.stringify(this.state.Date).substring(1,5)),
              day:(this.state.Date).split("-")[2].split("T")[0],
              month:(this.state.Date).split("-")[1],
              year:(this.state.Date).split("-")[0],
              hour:(this.state.Date).split("-")[2].split("T")[1].split(":")[0],
              document:this.state.Document,
        
          },
          params:{
            id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
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
    else{
      this.setState({
        Message:"please enter missing field"
     });
    }}
      changeDoc(e){
        this.setState({
            Document:e.target.value
        })
    }
        changeDate(e){
            this.setState({
                Date:e.target.value
            })
        }
      
    render() {
        return (
            <div>
<NavBarStaff/>              <Container>
            <Form className="form">
  <Form.Group>
    <Form.Label>Document Link</Form.Label>
    <Form.Control  placeholder="Drive Link" onChange={this.changeDoc}/>
  </Form.Group>
  <Form.Group>
    <Form.Label>Specify Request Date</Form.Label>
    <Form.Control type="datetime-local" onChange={this.changeDate}/>
  </Form.Group>

  
  <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick={this.add}>
    Submit
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
