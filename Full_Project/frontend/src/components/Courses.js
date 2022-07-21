import React, { Component } from 'react';
import {Button,Col,Card,CardGroup} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'

import NavBar from './NavBar.js';
import image1 from './facultyp.png';
import add from './course.png';

import "./styles.css";
export default class Courses extends Component {
    constructor(props){
        super(props)
        this.state={
            a:false,
            u:false,
            d:false,
           
           
        }
        // this.add=this.add.bind(this);
        // this.update=this.update.bind(this);
        // this.delete=this.delete.bind(this);
    }
    // add(e){
    //     e.preventDefault();
    //     this.setState({l:true})
    //   }
    //   update(e){
    //     this.setState({
    //         Room:e.target.value
    //     })
    // }
    //     delete(e){
    //         this.setState({
    //             Cap:e.target.value
    //         })
    //     }
    render() {
        return (
            <div>
<NavBar/>              <div className="row">
 <Col xs={6} md={6}>
 <Carousel.Caption>
                <h1 className="h1">Course</h1>
                <p className="p">Add/update/delete any Course under department in University</p>
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
        src={add}
        className="center"
        alt=""
      />
    <Card.Title>Add Course</Card.Title>
   
    <Button className="login100-form-btn buttonalign" style={{marginLeft:'120px'}} variant="primary" href="/addcourse" >Click Here</Button>
  </Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={add}
        className="center"
        alt=""
      />
    <Card.Title>Update Course</Card.Title>
   
    <Button className="login100-form-btn buttonalign" style={{marginLeft:'120px'}} variant="primary" href="/updatecourse">Click Here</Button>
  </Card.Body>
</Card>
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <img
        src={add}
        className="center"
        alt=""
      />
    <Card.Title>Delete Course</Card.Title>
   
    <Button className="login100-form-btn buttonalign" style={{marginLeft:'120px'}} variant="primary" href="/deletecourse">Click Here</Button>
  </Card.Body>
</Card>
</CardGroup>
</Col>
</div>    
</div>
        )
    }
}