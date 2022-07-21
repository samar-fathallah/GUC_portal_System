import React, { Component } from 'react';
import {Button, Form, Col,CardGroup,Card} from "react-bootstrap";

import axios from "axios";
import NavBarStaff from './NavBarStaff.js'

import Container from 'react-bootstrap/Container'

import Row from 'react-bootstrap/Row'

import "./styles.css";

export default class singleChangeRequestState extends Component{
    constructor(props){
        super(props)
        this.state={
          requests:null,
          a: false,
          r: false,
          id2:null,
          reqId:null,
          res:null,
          message1:null,
          message2:null,
         
      }
      this.accept=this.accept.bind(this)
      this.reject=this.reject.bind(this)
      this.changeId2=this.changeId2.bind(this);
      this.changeR=this.changeR.bind(this);
  }
  async  accept(e) {
      e.preventDefault();
      this.setState({a:true})
      this.setState({message1:"request accepted"})
    }
  async  reject(e) {
      e.preventDefault();
      axios({
        method: 'post',
        url: '/HOD/rejectRequest',
        params:{id:  JSON.parse(sessionStorage.getItem("loggeduser"))._id},
        data: {
          reqId: this.state.reqId,
          comment:this.state.res
        }
      }).then(res=>{
          this.setState({
              
             message2:res.data
          });
            console.log(res.data);
      }).catch(err=>{
        this.setState({
              
            message2:err.response.data.msg
         });
          console.log(err.response.data.msg)
      })
    }  
    changeId2(e){
        this.setState({
            reqId:e.target.value
        })
        console.log(this.state.reqId);
    }  
    changeR(e){
      this.setState({
        res:e.target.value
    })
    }
    
    
    componentDidMount(){
    
              axios({
                method: 'post',
                url: '/HOD/viewrequests/singleStaffLeave',
                params:{id:  JSON.parse(sessionStorage.getItem("loggeduser"))._id},
                data: {
                  id2: this.props.location.state.id2
                }
              }).then(res=>{
                  this.setState({
                      
                     requests:res.data
                  });
                    console.log(res.data);
              }).catch(err=>{
                this.setState({
                      
                    requests:err.response.data.msg
                 });
                  console.log(err.response.data.msg)
              })
        
        
        
    }

    render(){
        return(
          <div>            <NavBarStaff home="/Head" profile="/Staffprofile" attendance="/Myattendance" schedule="/MySchedule" request="/MyRequests"/>
         
            <Container fluid>
            
            <Row>  
            <Col>
                <h1 className="table">{JSON.stringify(this.state.requests)}</h1>
            </Col>    
            </Row>
            <CardGroup className="form">
  <Card className="table2">
    <Card.Body>
    <Card.Title>Accept a request</Card.Title>
    <Form>
   
    <Form.Group >
    
    <Form.Control  placeholder="enter request id" onChange={this.changeId2}/>
  </Form.Group>
  
  <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick = {this.accept}>
    Accept
  </Button>
  
            
             
</Form>
    
    </Card.Body>
    <div ng-show="message1 == null">
<Form.Text className="text-muted" >
{this.state.message1}
    </Form.Text>
    </div>
   
   
  </Card>
  <Card className="table2">
    <Card.Body>
    <Card.Title>Reject a request</Card.Title>
    <Form>
   
    <Form.Group >
    
    <Form.Control  placeholder="enter request id" onChange={this.changeId2}/>
    <Form.Control  placeholder="enter a reason(optional)" onChange={this.changeR}/>
  </Form.Group>
  
  
  
  <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick = {this.reject}>
    Reject
  </Button> 
            
             
</Form>
    
    </Card.Body>
    
    <div ng-show="message2 == null">
<Form.Text className="text-muted" >
{this.state.message2}
    </Form.Text>
    </div>
   
  </Card>
</CardGroup>
            </Container>
            </div>
        )
    }

}