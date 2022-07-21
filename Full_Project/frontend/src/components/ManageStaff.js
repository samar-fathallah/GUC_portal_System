import React, { Component } from 'react';
import {Button, Col,Card,CardGroup} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'
import NavBar from './NavBar.js';
import image1 from './facultyp.png';

import loc from './member.png';
import add from './addmember2.png';
import "./styles.css";
import "./styletrail.css";
export default class ManageStaff extends Component {
    constructor(props){
        super(props)
        this.state={
            s:false,
            
           
           
        }
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
<NavBar/>              <div className="row">
<Col xs={6} md={6}>
<Carousel.Caption>
            <h1 className="h1">Manage Staff</h1>
            <p className="p">Add/Manage Staff Members</p>
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
<CardGroup>
 <Card style={{ width: '18rem' }}>
<Card.Body className="pos">
<img
    src={loc}
    className="center"
    alt=""
  />
<Card.Title>Update Staff Member</Card.Title>

<Button className="login100-form-btn place" style={{marginTop:'10px'}} variant="primary" href="/updatestaff" >Click Here</Button>
</Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
<Card.Body>
<img
    src={loc}
    className="center"
    alt=""
  />
<Card.Title>Delete Staff Member </Card.Title>

<Button className="login100-form-btn place"  style={{marginRight:"200px"}} variant="primary" href="/deletestaff">Click Here</Button>

</Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
<Card.Body>
<img
    src={loc}
    className="center"
    alt=""
  />
<Card.Title>View Attendance Records</Card.Title>

<Button className="login100-form-btn place" variant="primary" href="/viewattendanceHR">Click Here</Button>
</Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
<Card.Body>
<img
    src={loc}
    className="center"
    alt=""
  />
<Card.Title>View Missing Hours/days</Card.Title>

<Button className="login100-form-btn place" variant="primary" href="/ViewMissing">Click Here</Button>
</Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
<Card.Body>
<img
    src={loc}
    className="center"
    alt=""
  />
<Card.Title>Add Sign in/Sign out </Card.Title>

<Button className="login100-form-btn place" variant="primary"  href="/addsign">Click Here</Button>

</Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
<Card.Body>
<img
    src={loc}
    className="center"
    alt=""
  />
<Card.Title>Update Member Salary </Card.Title>

<Button  className="login100-form-btn place"  variant="primary" href="/updatesalary">Click Here</Button>

</Card.Body>
</Card>

<Card style={{ width: '18rem' }}>
<Card.Body>
<img
    src={add}
    className="center"
    alt=""
  />
<Card.Title>Add Staff Member</Card.Title>

<Button className="login100-form-btn " variant="primary" href="/Addmember">Click Here</Button>
</Card.Body>
</Card>
</CardGroup>
</Col>
</div>    
</div>
    )
  
    }
     
  }
    }
