import React, { Component } from 'react';
import {Button,  Nav,Navbar,NavDropdown,Col,CardGroup,Card,} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'
import Dropdown from 'react-bootstrap/Dropdown'
import {Redirect} from "react-router-dom";
import NavBarStaff from "./NavBarStaff";
import image2 from './hod.jpg';
import request from './req.png';

import "./styles.css";

export default class manageRequests extends Component{
    constructor(props){
        super(props)
     
   
     
    }
   
    render(){
      
         
        return (
            <div>
<NavBarStaff/>             <div className="row">
 <Col xs={6} md={6}>
 <Carousel.Caption>
                <h1 className="txtalign">Portal</h1>
                <p className="txtalign">Head of Department</p>
              </Carousel.Caption>
              <img
                alt=""
                src={image2}
               
              />
            
            
         
         </Col>
           
         
   
</div>    
    
<div className="row">
<Col>
<CardGroup>
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={request}
        className="center"
      />
    <Card.Title>Leave requests</Card.Title>
    <Card.Text>
    View/Accept/Reject requests
    </Card.Text>
    <Dropdown>
  <Dropdown.Toggle style={{backgroundColor:'#0b1b3f'}} variant="success" id="dropdown-basic">
    click
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/manageRequestsLeaveAll">All Requests</Dropdown.Item>
    <Dropdown.Item href="/manageRequestsLeaveSingle">Requests for a specific member</Dropdown.Item>
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
    <Card.Title>Change day off requests</Card.Title>
    <Card.Text>
      View/Accept/Reject requests
    </Card.Text>
    <Dropdown>
  <Dropdown.Toggle style={{backgroundColor:'#0b1b3f'}} variant="success" id="dropdown-basic">
    click
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/manageRequestsChangeAll">All Requests</Dropdown.Item>
    <Dropdown.Item href="/manageRequestsChangeSingle">Requests for a specific member</Dropdown.Item>
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
    <Card.Title>Replacement requests</Card.Title>
    <Card.Text>
      View/Accept/Reject requests
    </Card.Text>
    <Dropdown>
  <Dropdown.Toggle style={{backgroundColor:'#0b1b3f'}} variant="success" id="dropdown-basic">
    click
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/manageRequestsReplacementAll">All Requests</Dropdown.Item>
    <Dropdown.Item href="/manageRequestsReplacementSingle">Requests for a specific member</Dropdown.Item>
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