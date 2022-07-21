import React, { Component } from 'react';
import {Button,Nav,Navbar,NavDropdown,Col,Card,CardGroup} from "react-bootstrap";

 import {Redirect} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'
import image1 from './hod.png';
import faculty from './faculty.png';
import rooms from './rooms.png';
import dep from './dep.png';
import course from './course.png';
import staff from './staff.png';
import "./styles.css";
import NavBar from "./NavBar"
import "./styletrail.css";
export default class HR extends Component {
  constructor(props){
    super(props)
    this.state={
      refresh:false
    }
    
 
}

componentDidMount(){
  sessionStorage.setItem("home","/HRHome");
  sessionStorage.setItem("profile","/profile");
  sessionStorage.setItem("attendance","/Myattendance");
  sessionStorage.setItem("att2","/MissingDayHR");
  sessionStorage.setItem("att3","/MissingHourHR");
  sessionStorage.setItem("signin","/MySignInHR" );
  sessionStorage.setItem("reset","/passwordHR");
  sessionStorage.setItem("schedule","/MyScheduleHR");

  sessionStorage.setItem("signout","/MySignOutHR");

  this.setState({refresh:true})
}

 
    
    render() {
  
        return (
       
            <div >
 <NavBar  alert={(this.props.location.state)?(this.props.location.state.alert):false}
 />
          <div className="row">
 <Col xs={6} md={6}>
 <Carousel.Caption>
                <h1 className="txtalign"> HR Portal</h1>
                {/* <p className="txtalign">HR</p> */}
              </Carousel.Caption>
              <img
                 className="align"
                src={image1}
              alt=""
              />
         </Col> 
</div>  
<div className="row">
<Col>
<CardGroup style={{backgroundColor: 'rgb(175, 192, 214)'}}>
<Card style={{ width: '18rem' },{backgroundColor: 'rgb(175, 192, 214)'}}>
  <Card.Body>
  <img
        src={staff}
        className="center"
        alt=""
      />
    <Card.Title>Manage Staff</Card.Title>
    <Card.Text>
      Add/Manage staff member
    </Card.Text>
    <div>
    <Button className="login100-form-btn buttonalign"   variant="primary" href="/ManageStaff">Click Here</Button>
    </div>
  </Card.Body>
</Card>
     <Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={rooms}
        className="center"
        alt=""
      />
    <Card.Title>Locations</Card.Title>
    <Card.Text>
      Add/update/delete any location on campus
    </Card.Text>
    <Button   className="login100-form-btn buttonalign"  variant="primary" href="/Locations">Click Here</Button>
  </Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={faculty}
        className="center"
        alt=""
      />
    <Card.Title>Faculties</Card.Title>
    <Card.Text>
      Add/update/delete a Faculty in University
    </Card.Text>
    <Button  className="login100-form-btn buttonalign"  variant="primary" href="/Faculty">Click Here</Button>
  </Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={dep}
        className="center"
        alt=""
      />
    <Card.Title>Department</Card.Title>
    <Card.Text>
      Add/update/delete a department
    </Card.Text>
    <Button  className="login100-form-btn buttonalign" variant="primary" href="/Department">Click Here</Button>
  </Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={course}
        className="center"
        alt=""
      />
    <Card.Title>Courses</Card.Title>
    <Card.Text>
      Add/update/delete coure under department 
    </Card.Text>
    <Button  className="login100-form-btn buttonalign"  variant="primary" href="/Course">Click Here</Button>
  </Card.Body>
</Card>
</CardGroup>
</Col>
</div>

   
</div>

        )
        
    }
}
