import React, { Component } from 'react';
import {Button,Col,Card,CardGroup,Dropdown} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'

import NavBarStaff from './NavBarStaff.js';
import image1 from './requests.jpg';
import add from './add-location.png';
import update from './location-update.png';
import loc from './req.png';
import "./styles.css";
export default class Locations extends Component {
    constructor(props){
        super(props)
   
    }
    // sick(){
    //     sessionStorage.setItem("reqtype",)
    // }
    render() {
        return (
            <div>
          <NavBarStaff/>
            <div className="row">
 <Col xs={6} md={6}>

 <Carousel.Caption>
                <h1 className="h1 txtalign" style={{font:'100px'}}>Requests</h1>
                <p className="p">Submit Any Type of Request</p>
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
  <Card.Body>
 
    
    <Dropdown>
  <Dropdown.Toggle  className="login100-form-btn buttonalign" style={{marginLeft:'400px'}}  variant="success" id="dropdown-basic">
    Submit
  </Dropdown.Toggle>

  <Dropdown.Menu  >
    <Dropdown.Item href="/SickStaff">Sick leave </Dropdown.Item>
    <Dropdown.Item href="/MaterSTaff">Maternity leave </Dropdown.Item>
    <Dropdown.Item href="/ComStaff">Compensation leave</Dropdown.Item>
    <Dropdown.Item href="/AccidentStaff">Accidental leave </Dropdown.Item>
    <Dropdown.Item href="/AnnualStaff">Annual leave</Dropdown.Item>
    <Dropdown.Item href="/ChangeDayStaff">Change Day Off</Dropdown.Item>
    <Dropdown.Item href="/SlotLinkStaff">Slot Linking</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
  </Card.Body>
</Card>


</CardGroup>
</Col>
</div>    
</div>
        )
    }
}