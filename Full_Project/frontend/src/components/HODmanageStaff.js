import React, { Component } from 'react';
import {Button,FormControl,Col,CardGroup,Card} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'

import {Redirect} from "react-router-dom";
import NavBarStaff from './NavBarStaff.js'

import image2 from './hod.jpg';

import guc_calendar from './guc_calendar.jpg'
import staff from './staff.png';
import "./styles.css";

import InputGroup from 'react-bootstrap/InputGroup'
export default class HODmanageStaff extends Component{

    constructor(props){
        super(props)
        this.state={
         
          sc:false,
          course:"",
         
      }
     
      this.viewStaffCourse=this.viewStaffCourse.bind(this)
   
      this.changeCourse=this.changeCourse.bind(this);
    }
  
  
       viewStaffCourse(e){
        this.setState({
            sc:true
        })
    }
    changeCourse(e){
        this.setState({
            course:e.target.value
        })
        console.log(this.state.course);
    }  
  

    render(){
      
          if(this.state.sc){
            return <Redirect to={{
                pathname: '/ViewStaffCourse',
                state: { course: this.state.course ,id: JSON.parse(sessionStorage.getItem("loggeduser"))._id}
          }}
          />
          }

        return (
            <div>
             <NavBarStaff />
            <div className="row">
            <Col xs={6} md={6}>
 <Carousel.Caption>
                <h1 class="txtalign">Head Of Department Portal</h1>
               
              </Carousel.Caption>
              <img   className="align"
                src={image2} 
                alt=""
              />
         </Col>
        
  
</div>    
   
<div className="row">
<Col>
<CardGroup>
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={staff}
        className="center"
      />
    <Card.Title>View Staff</Card.Title>
    <Card.Text>
      View all staff members in department
    </Card.Text>
    <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" href="/viewStaff">Click Here</Button>
  </Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={guc_calendar}
        className="center"
      />
    <Card.Title>View day off</Card.Title>
    <Card.Text>
      View day off of all staff/single staff
    </Card.Text>
    <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" href="/dayOff">Click Here</Button>
  </Card.Body>
</Card>

<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={staff}
        className="center"
      />
    <Card.Title>View staff per course</Card.Title>
    <Card.Text>
           show the the staff of a course you give
    </Card.Text>
    <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" href="/HODSelectCourse">Click Here</Button>
  </Card.Body>
</Card>


</CardGroup>
</Col>


</div>
</div>
        )
    
}
}