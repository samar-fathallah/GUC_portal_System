import React, { Component } from 'react';
import {Button, Form,CardGroup,Card} from "react-bootstrap";

import {Redirect} from "react-router-dom";

import NavBarStaff from './NavBarStaff.js'

import Container from 'react-bootstrap/Container'

import Row from 'react-bootstrap/Row'

import "./styles.css";

export default class manageRequestsChangeSingle extends Component{
    constructor(props){
        super(props)
        this.state={
            d: false,
            id2:null,
           
        }
        this.viewRequests=this.viewRequests.bind(this)
        this.changeId2=this.changeId2.bind(this);
    }
    async  viewRequests(e) {
        e.preventDefault();
        this.setState({d:true})
      }
    changeId2(e){
        this.setState({
            id2:e.target.value
        })
        console.log(this.state.id2);
    }  
    
    render(){
        if(this.state.d){
            return <Redirect to={{
                pathname: '/singleChangeRequestState',
                state: { id2: this.state.id2 }
          }}
          />
          }
        return(
            
            <Container fluid>
            <Row>
            <div>
                <NavBarStaff/>
                </div>
            </Row>
            <Row>
           
            </Row>
            <CardGroup className="form">
  <Card className="table2">
    <Card.Body>
    <Card.Title>View specific staff's request(s)</Card.Title>
    <Form>
   
    <Form.Group >
   
    <Form.Control  placeholder="enter member id" onChange={this.changeId2}/>
  </Form.Group>
  
  <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick = {this.viewRequests}>
    view
  </Button> 
            
             
</Form>
    
    </Card.Body>
   
  </Card>
</CardGroup>
            
            </Container>
            
        )
    }
}