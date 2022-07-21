import React, { Component } from 'react';
import {Button, Col,CardGroup,Card} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'


import image2 from './hod.jpg';
import NavBarStaff from "./NavBarStaff";
import staff from './staff.png';
import coverage from './coverage.png';
import slots from './slots.png';

import "./styles.css";

export default class manageCourse extends Component{
    constructor(props){
        super(props)
    
     
    }
  
    render() {
       
       
          return (
              <div>
<NavBarStaff/>
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
      <Card.Title>Manage course instructors</Card.Title>
      <Card.Text>
        Assign/Delete/Update a course instructor
      </Card.Text>
      <Button style={{backgroundColor:'#0b1b3f'}} variant="primary"href="/manageCourseInstructor">Click Here</Button>
    </Card.Body>
  </Card>
  <Card style={{ width: '18rem' }}>
    <Card.Body>
    <img
          src={slots}
          className="center"
        />
      <Card.Title>View teaching assignment</Card.Title>
     
      <Button style={{backgroundColor:'#0b1b3f'}}  variant="primary" href="/HODassignments" >Click Here</Button>
    </Card.Body>
  </Card>
  
  <Card style={{ width: '18rem' }}>
    <Card.Body>
    <img
          src={coverage}
          className="center"
        />
      <Card.Title> View course coverage</Card.Title>
      
      <Button style={{backgroundColor:'#0b1b3f'}}  variant="primary" href="/manageCourseCoverage">Click Here</Button>
    </Card.Body>
  </Card>
  </CardGroup>
  </Col>
  </div>
  </div>
          )
      }
}