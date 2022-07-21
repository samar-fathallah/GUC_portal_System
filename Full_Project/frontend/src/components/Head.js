import React, { Component } from 'react';
import {Button, Col,Card,CardGroup} from "react-bootstrap";


import Carousel from 'react-bootstrap/Carousel'

import request from './req.png';
import image2 from './hod.png';
import course from './course.png';
import staff from './staff.png';
import NavBarStaff from "./NavBarStaff";
import "./styles.css";
export default class Head extends Component {
  constructor(props){
    super(props)
    this.state={
      refresh:false
    }
  }
    
  componentDidMount(){
    sessionStorage.setItem("home","/Head");
    sessionStorage.setItem("profile","/profileStaff");
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
          <html>
          <body>
            <div>
            <NavBarStaff home="/Head" profile="/profileHOD" attendance="/MyattendanceHOD" signin="/MySignInHOD" signout="/MySignOutHOD" reset="/passwordHOD" schedule="/MyScheduleHOD" request="/MyRequestsHOD" alert={(this.props.location.state)?(this.props.location.state.alert):false}/>
 <Col xs={6} md={6}>
 <Carousel.Caption>
                <h1 class="txtalign">Head Of Department Portal</h1>
               
              </Carousel.Caption>
              <img   className="align"
                src={image2} 
                alt=""
              />
         </Col>
     
<CardGroup>
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={staff}
        className="center"
      />
    <Card.Title>Manage Staff</Card.Title>
    <Card.Text>
      View staff members/manage staff members
    </Card.Text>
    <Button className="login100-form-btn " variant="primary" href="/HODmanageStaff">Click Here</Button>
  </Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={request}
        className="center"
      />
    <Card.Title>Manage Requests</Card.Title>
    <Card.Text>
      View/Accept/Reject requests
    </Card.Text>
    <Button className="login100-form-btn  " variant="primary" href="/manageRequests">Click Here</Button>
  </Card.Body>
</Card>
  
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={course}
        className="center"
      />
    <Card.Title> Manage Courses</Card.Title>
    <Card.Text>
      Assign instructor,View Coverage/Assignments
    </Card.Text>
    <Button className="login100-form-btn  " variant="primary" href="/manageCourse">Click Here</Button>
  </Card.Body>
</Card>
</CardGroup>

</div>
</body>
</html>
        )
    }
}
