import React, { Component } from 'react';
import {Button, Col,Card,CardGroup} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'
import NavBar from './NavBar.js';
import image1 from './facultyp.png';

import loc from './facultyy.png';
import "./styles.css";
export default class Locations extends Component {
    constructor(props){
        super(props)
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
                <h1 className="h1">Faculties</h1>
                <p className="p">Add/update/delete any Faculty in University</p>
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
  <img
        src={loc}
        className="center"
        alt=""
      />
    <Card.Title>Add Faculty</Card.Title>
   
    <Button className="login100-form-btn buttonalign" style={{marginLeft:'120px'}} variant="primary" href="/addfaculty" >Click Here</Button>
  </Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={loc}
        className="center"
        alt=""
      />
    <Card.Title>Update Faculty</Card.Title>
   
    <Button className="login100-form-btn buttonalign" style={{marginLeft:'120px'}} variant="primary" href="/updatefaculty">Click Here</Button>
  </Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={loc}
        className="center"
        alt=""
      />
    <Card.Title>Delete Faculty</Card.Title>
   
    <Button className="login100-form-btn buttonalign" style={{marginLeft:'120px'}} variant="primary" href="/deletefaculty">Click Here</Button>
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