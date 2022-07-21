import axios from "axios";
import {Redirect} from "react-router-dom";
import React, { Component } from 'react';
import {Button,Col,Card,CardGroup,} from "react-bootstrap";
import NavBarStaff from "./NavBarStaff";

import Carousel from 'react-bootstrap/Carousel'

import image2 from './hod2.png';
import course from './course.png';
import staff from './staff.png';

import "./styles.css";
export default class CI extends Component {
  constructor(props){
    super(props)
    this.state={
      refresh:false
    }
  }

  componentDidMount(){
    sessionStorage.setItem("home","/CIHome");
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
<NavBarStaff
         alert={(this.props.location.state)?(this.props.location.state.alert):false}/>
          
            
 <Col xs={6} >
 <Carousel.Caption>
                <h1 className="txtalign "> Course Instructor Portal</h1>
            
              </Carousel.Caption>
              <img className="align"
                src={image2} 
              alt=""
              />
         </Col>
   
<CardGroup>
  <Card style={{backgroundColor:'afc0d6'}}>
    <img src={course} width="20px" height="20px" className="center" />
    <Card.Body>
    <Card.Title> Manage Courses</Card.Title>
    <Card.Text>
      Assign Coordinator,View Coverage/Assignments
    </Card.Text>
    <Button className="login100-form-btn cibutton "  variant="primary" href="/CIManageCourse">Click Here</Button>
    
    </Card.Body>
   
  </Card>
  <Card>
  <img src={staff}  className="center" />
    <Card.Body>
    <Card.Title>Manage Staff</Card.Title>
    <Card.Text>
      View staff members/manage staff member assignment
    </Card.Text>
    <Button className="login100-form-btn cibutton"   variant="primary" href="/CIManageStaff" >Click Here</Button>
  
    </Card.Body>
   
  </Card>
</CardGroup>




</div>
        )
    }
}
