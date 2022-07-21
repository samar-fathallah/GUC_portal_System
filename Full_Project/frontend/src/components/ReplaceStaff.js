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
                <h1 style={{font:'100px'}}>Replacement Requests</h1>
                <p className="p">Submit/View</p>
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
    Request
  </Dropdown.Toggle>

  <Dropdown.Menu  >
    <Dropdown.Item href="/ViewReplaceStaff">View </Dropdown.Item>
    <Dropdown.Item href="/SubmitReplaceStaff">Submit</Dropdown.Item>
    
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