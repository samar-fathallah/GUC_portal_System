import React, { Component } from 'react';
import {Col} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'

import NavBarStaff from './NavBarStaff';

import image2 from './hod.png';
export default class TA extends Component {
  constructor(props){
    super(props)
    this.state={
      refresh:false
    }
  }

  componentDidMount(){
    sessionStorage.setItem("home","/TA");
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
     <NavBarStaff/>
     <Col xs={6} md={6}>
 <Carousel.Caption>
                <h1 class="txtalign">Teaching Assistant Portal</h1>
               
              </Carousel.Caption>
              <img   className="align"
                src={image2} 
                alt=""
              />
         </Col>
     
</div>
        )
    }
}
