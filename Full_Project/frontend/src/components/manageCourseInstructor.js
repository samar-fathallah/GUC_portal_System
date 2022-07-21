import React, { Component } from 'react';
import {Button, Form, CardGroup,Card} from "react-bootstrap";

import axios from "axios";

import NavBarStaff from './NavBarStaff.js'

import "./styles.css";

export default class manageCourseInstructor extends Component{
    constructor(props){
        super(props)
        this.state={
            Staff:[],
            member_id:null,
            coursename:null,
            courseupdate:null,
           
            a:false,
            d:false,
            u:false,
            message1:null,
            message2:null,
            message3:null,
           
        }
        this.changeId=this.changeId.bind(this);
        this.changeCourse=this.changeCourse.bind(this);
        
        this.assignCI=this.assignCI.bind(this)
        this.deleteCI=this.deleteCI.bind(this)
        this.updateCI=this.updateCI.bind(this)

        

    }
    async  assignCI(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/HOD/assignCI',
            params:{id:JSON.parse(sessionStorage.getItem("loggeduser"))._id},
            data: {
              id2: this.state.member_id,
              courseName: this.state.coursename
            }
          }).then(res=>{
              this.setState({
                  
                 message1:res.data
              });
                console.log(res.data);
          }).catch(err=>{
            this.setState({
                  
                message1:err.response.data.msg
             });
              console.log(err.response.data.msg)
          })
      }
    async  deleteCI(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/HOD/deleteCI',
            params:{id:JSON.parse(sessionStorage.getItem("loggeduser"))._id},
            data: {
              id2: this.state.member_id,
              courseName: this.state.coursename
            }
          }).then(res=>{
              this.setState({
                  
                 message2:res.data
              });
               
          }).catch(err=>{
            this.setState({
                  
                message2:err.response.data.msg
             });
            
          })
      }
       
    async  updateCI(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/HOD/updateCI',
            params:{id:JSON.parse(sessionStorage.getItem("loggeduser"))._id},
            data: {
              id2: this.state.member_id,
              course1: this.coursename,
              course2: this.courseupdate,
            }
          }).then(res=>{
              this.setState({
                  
                 message3:res.data
              });
               
          }).catch(err=>{
            this.setState({
                  
                message3:err.response.data.msg
             });
       
          })
      }
    changeId(e){
        this.setState({
            member_id:e.target.value
        })
      
    }
    
    changeCourse(e){
        this.setState({
            coursename:e.target.value
        })
  
    }
    changeCourseU(e){
      this.setState({
        courseupdate:e.target.value
    })

    }
   
          render(){
              
            return(
              <div>
<NavBarStaff/>
              <div className="table">
              <div>
              <CardGroup className="form">
  <Card className="table2">
    <Card.Body>
    <Card.Title>Assign CI</Card.Title>
    <Form>
   
    <Form.Group >
   
    <Form.Control  placeholder="enter member id" onChange={this.changeId}/>
    <Form.Control  placeholder="enter course name" onChange={this.changeCourse}/>
  </Form.Group>
  
  <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick = {this.assignCI}>
    assign
  </Button> 
            
             
</Form>
    
    </Card.Body>
    <div ng-show="message1 == null">
<Form.Text className="text-muted" className="color">
{this.state.message1}
    </Form.Text>
    </div>
  </Card>
  <Card className="table2">
    <Card.Body>
    <Card.Title>Delete CI</Card.Title>
    <Form>
   
    <Form.Group >
    
    <Form.Control  placeholder="enter member id" onChange={this.changeId}/>
    <Form.Control  placeholder="enter course name" onChange={this.changeCourse}/>
  </Form.Group>
  
  
  <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick = {this.deleteCI}>
    delete
  </Button> 
            
             
</Form>
   
    </Card.Body>
    <div ng-show="message2 == null">
<Form.Text className="text-muted" className="color">
{this.state.message2}
    </Form.Text>
    </div>
  </Card>
  <Card className="table2">
    <Card.Body>
    <Card.Title>Update CI</Card.Title>
    <Form>
   
    <Form.Group >
   
    <Form.Control placeholder="enter member id" onChange={this.changeId}/>
    <Form.Control placeholder="course to be removed from" onChange={this.changeCourse}/>
    <Form.Control placeholder="course to be added to" onChange={this.changeCourseU}/>
  </Form.Group>
  
  <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick = {this.updateCI}>
    update
  </Button> 
            
             
</Form>
    
    </Card.Body>
    <div ng-show="message3 == null">
<Form.Text className="text-muted" className="color">
{this.state.message3}
    </Form.Text>
    </div>
  </Card>
</CardGroup>
              </div>
       </div> 
       </div>
       
       
            )
        }
}