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
             Date2:null,
             reason:null
            
        }
        this.add=this.add.bind(this);
        this.changeDate=this.changeDate.bind(this);
        this.changeDate2=this.changeDate2.bind(this);
        this.changereason=this.changereason.bind(this);
     
      }

      add(e){
        e.preventDefault();
        this.setState({Message:null})
      
        if(this.state.Date && this.state.Date2 && this.state.reason){
        axios({
          method: 'post',
          url: '/Compensation',
          data: {
              year1:(this.state.Date).split("-")[0],
              day1:(this.state.Date).split("-")[2].split("T")[0],
              month1:(this.state.Date).split("-")[1],
              hour1:(this.state.Date).split("-")[2].split("T")[1].split(":")[0],
              year2:(this.state.Date2).split("-")[0],
              day2:(this.state.Date2).split("-")[2].split("T")[0],
              month2:(this.state.Date2).split("-")[1],
              hour2:(this.state.Date2).split("-")[2].split("T")[1].split(":")[0],
              reason:this.state.reason,
           
        
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
      changeDate2(e){
        this.setState({
            Date2:e.target.value
        })
    }
        changeDate(e){
            this.setState({
                Date:e.target.value
            })
        }
        changereason(e){
            this.setState({
                reason:e.target.value
            })
        }
      
    render() {
        return (
            <div>
<NavBarStaff/>              <Container>
            <Form className="form">
  <Form.Group>
    <Form.Label>Absent Day</Form.Label>
    <Form.Control  type="datetime-local" onChange={this.changeDate}/>
  </Form.Group>
  <Form.Group>
    <Form.Label>Compensation Day</Form.Label>
    <Form.Control type="datetime-local" onChange={this.changeDate2}/>
  </Form.Group>
  <Form.Group>
    <Form.Label>Reason</Form.Label>
    <Form.Control placeholder="Reason" onChange={this.changereason}/>
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



