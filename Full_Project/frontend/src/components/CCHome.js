import React, { Component} from 'react';
import {Button, Col,Card,CardGroup} from "react-bootstrap";

 import NavBarStaff from './NavBarStaff.js'
 import {Redirect} from "react-router-dom";
 import Dropdown from 'react-bootstrap/Dropdown'
import Carousel from 'react-bootstrap/Carousel'
import guc from  './hod.png';
import course from './course.png';
import request from './req.png';
import "./styles.css";
export default class CCHome extends Component {
  constructor(props){
    super(props)
    this.state={
      refresh:false
     
  }
}
componentDidMount(){
  sessionStorage.setItem("home","/CCHome");
  sessionStorage.setItem("profile","/ProfileStaff");
    sessionStorage.setItem("attendance","/MyattendanceStaff");
    sessionStorage.setItem("att2","/MissDayStaff");
    sessionStorage.setItem("att3","/MissHourStaff");
    sessionStorage.setItem("signin","/MySignInStaff" );
    sessionStorage.setItem("reset","/passwordStaff");
    sessionStorage.setItem("schedule","/MyScheduleStaff");
    sessionStorage.setItem("request","/MyRequestsStaff");
    sessionStorage.setItem("req1","/SubmitStaff");
    sessionStorage.setItem("req2","/ReplaceStaff");

    sessionStorage.setItem("signout","/MySignOutStaff");
  this.setState({refresh:true})
}

 
    render() {
     
        return (
     
    <div>
           <NavBarStaff alert={(this.props.location.state)?(this.props.location.state.alert):false}/>


 <div className="row">
 <Col xs={6} md={6}>
 <Carousel.Caption>
                <h1 className="txtalign">Portal</h1>
              
                <p className="txtalign">Course Coordinator</p>
              </Carousel.Caption>
              <img
                className="align"
                src={guc}
                alt=""
              />
            
            
         
         </Col>
           
         
   
</div>  
<CardGroup>
  <Card>
    <img src={course}  className="center" />
    <Card.Body>
    <Card.Title> Manage Courses slots</Card.Title>
    <Card.Text>
      add/update/delete course slot
    </Card.Text>
    <Dropdown>
  <Dropdown.Toggle style={{backgroundColor:'#0b1b3f'}} variant="success" id="dropdown-basic">
    click
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/CCAddSlot">Add a slot</Dropdown.Item>
    <Dropdown.Item href="/CCUpdateSlot">Update a slot</Dropdown.Item>
    <Dropdown.Item href="/CCDeleteSlot">Delete a slot</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
    
    </Card.Body>
   
  </Card>
  <Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={request}
        className="center"
      />
    <Card.Title>Manage slot linking requests</Card.Title>
    <Card.Text>
      View/Accept/Reject requests
    </Card.Text>
    <Button style={{backgroundColor:'#0b1b3f'}}className="primary" variant="primary" href="/CCSlotLinking">click here</Button>
  </Card.Body>
</Card>
</CardGroup>

</div>
        )
    }
}