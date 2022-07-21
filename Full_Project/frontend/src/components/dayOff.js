import React, { Component } from 'react';
import {Button, Form,CardGroup,Card} from "react-bootstrap";

import axios from "axios";
import {Redirect} from "react-router-dom";

import NavBarStaff from './NavBarStaff.js'

import Container from 'react-bootstrap/Container'

import Row from 'react-bootstrap/Row'



import "./styles.css";

export default class dayOff extends Component{
    constructor(props){
        super(props)
        this.state={
            staff:[],
            d: false,
            id2:null,
            message:null
           
        }
        this.viewDayOff=this.viewDayOff.bind(this)
        this.changeId2=this.changeId2.bind(this);
    }
      viewDayOff(e) {
        this.setState({
          d:true
        })
      }
    changeId2(e){
        this.setState({
            id2:e.target.value
        })
        console.log(this.state.id2);
    }  
    componentDidMount () {
            axios.get('/HOD/dayOff/', {
              params: {
                id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
              },headers:{
                "auth-token":sessionStorage.getItem("token")
              }
          
              }).then(res=>{
                if(res.data === "No staff found in this department" || res.data === "cant access this page"){
                  this.setState({
                    message:res.data
                });
                }else{
                  this.setState({
                    staff:res.data
                });
                }
               
                    console.log(res.data);
                   
              }).catch(err=>{
                  console.log(err)
              })
          }
    render(){
      if(this.state.message === null){
        if(this.state.d){
          return <Redirect to={{
              pathname: '/dayOffOne',
              state: { id2: this.state.id2 ,id:JSON.parse(sessionStorage.getItem("loggeduser"))._id}
        }}
        />
        }
      return(
          
          <Container fluid>
          <Row>
          <div>
<NavBarStaff/>             
 </div>
          </Row>
          <Row>
          <div className="table">
          <div class="table-wrapper">
              <table class="fl-table">
                  <thead>
                  <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>day_off</th>
                  </tr>
                  </thead>
                  <tbody>
                  
        {this.state.staff.map(values=>(
        <tr>
        <td>{values._id}</td>  
        <td>{values.Name}</td>
        <td>{values.day_off}</td>
        </tr>
      ))} 
                  </tbody>
              </table>

         </div> 
</div>
          </Row>
          <CardGroup className="form">
<Card>
  <Card.Body>
  <Card.Title>View specific staff's day off</Card.Title>
  <Form>
 
  <Form.Group controlId="formBasicEmail">
  <Form.Label>member id</Form.Label>
  <Form.Control type="email" placeholder="enter member id" onChange={this.changeId2}/>
</Form.Group>

<Button style={{backgroundColor:'#0b1b3f'}}  variant="primary" type="submit" onClick = {this.viewDayOff}>
  view
</Button> 
          
           
</Form>
  
  </Card.Body>
 
</Card>
</CardGroup>
          
          </Container>
          
      )
      }else{
        return(
          
          <Container fluid>
          <Row>
          <div>
          <NavBarStaff />
              </div>
          </Row>
          <Row>
          <div className="table">
          <h1>{JSON.stringify(this.state.message)}</h1>
</div>
          </Row>
          <CardGroup className="form">
<Card className="table2">
  <Card.Body>
  <Card.Title>View specific staff's day off</Card.Title>
  <Form>
 
  <Form.Group controlId="formBasicEmail">
  <Form.Label>member id</Form.Label>
  <Form.Control type="email" placeholder="enter member id" onChange={this.changeId2}/>
</Form.Group>

<Button style={{backgroundColor:'#0b1b3f'}}  variant="primary" type="submit" onClick = {this.viewDayOff}>
  view
</Button> 
          
           
</Form>
  
  </Card.Body>
 
</Card>
</CardGroup>
          
          </Container>
          
      )

      }
       
    }

}

