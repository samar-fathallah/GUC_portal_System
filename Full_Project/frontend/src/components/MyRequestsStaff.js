import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import {Button, Form, Card,CardGroup} from "react-bootstrap";
import "./styles.css";
import loc from './req.png';
export default class CIManageStaff extends Component {
    constructor(props){
        super(props)
        this.state={
            staff:[],
            message:null,
           
        }
      }
    componentDidMount () {
            axios.get('/AllRequestStatus', {
              params: {
                id:"ac-"+JSON.parse(sessionStorage.getItem("loggeduser"))._id
              },headers:{
                "auth-token":sessionStorage.getItem("token")
            }
          
              }).then(res=>{
              if(res.data === "No Requests Submitted"){
                this.setState({
                  message:res.data
              }); 
              }else{
                this.setState({
                  staff:res.data
              }); 
              }
                   
              }).catch(err=>{
                  console.log(err)
              })
          }
     
    
    render() {
      if(this.state.message ===null){
        return (
          <div>
        <NavBarStaff home="/Head" profile="/profileHOD" attendance="/MyattendanceHOD" att2="/MissDayHOD" att3="/MissHourHOD"  req1="/ReplaceHOF" req2="/SubmitHOD" signin="/MySignInHOD" signout="/MySignOutHOD" reset="/passwordHOD" schedule="/MyScheduleHOD" request="/MyRequestsHOD"/>
       <div className = "table">
       <div class="table-wrapper">
              <table class="fl-table">
              <thead>
                    <tr>
                  
                <th>Request ID </th>
                <th>request Type</th>
                <th>request Status</th>
                </tr>
              
                  </thead>
              </table>
          
        
       <div>
              <table class="fl-table">
              <thead>
                    <tr>
                  
                </tr>
              
                  </thead>
                  <tbody>
        {this.state.staff.map(members=>(

        <tr key="">
        <td style={{fontSize:'20px'}}>{members._id}</td>
        <td style={{fontSize:'20px'}}>{members.type}</td>
        <td style={{fontSize:'20px'}}>{members.state}</td>
       
        </tr>   
       
      
      ))} 
                  </tbody>
              </table>
          </div>
       </div>
       </div>
       <CardGroup>
<Card className = "cardPos" >
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>View Accepted Only</Card.Title>
     <Form>
       <Button className="b" variant="primary" href="/AccStaff">
                View
       </Button>
     </Form>
 </Card.Body>
</Card>
<Card className = "cardPos">
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>View Pending Only</Card.Title>
     <Form>
       <Button className="b" variant="primary"  href="/PenStaff">
               View
       </Button>
     </Form>
 </Card.Body>
</Card>
<Card className = "cardPos">
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>View Rejected Only</Card.Title>
     <Form>
     <Button className="b" variant="primary"  href="/RejStaff">view</Button>
     </Form>
 </Card.Body>
</Card>

</CardGroup>
        </div> 
       )
      }else{
        return (
          
          <div>
        <NavBarStaff home="/Head" profile="/profileHOD" attendance="/MyattendanceHOD" att2="/MissDayHOD" att3="/MissHourHOD"  req1="/ReplaceHOF" req2="/SubmitHOD" signin="/MySignInHOD" signout="/MySignOutHOD" reset="/passwordHOD" schedule="/MyScheduleHOD" request="/MyRequestsHOD"/>
       <div className = "table">
      
       <h1 >{this.state.message}</h1>
       </div>
       <CardGroup>
<Card className = "cardPos" >
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>View Accepted Only</Card.Title>
     <Form>
       <Button className="b" variant="primary" href="/AccStaff">
                View
       </Button>
     </Form>
 </Card.Body>
</Card>
<Card className = "cardPos">
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>View Pending Only</Card.Title>
     <Form>
       <Button className="b" variant="primary" href="/PenStaff">
               View
       </Button>
     </Form>
 </Card.Body>
</Card>
<Card className = "cardPos">
 <Card.Body>
 <img
        src={loc}
        className="center"
        alt=""
      />
   <Card.Title>View Rejected Only</Card.Title>
     <Form>
     <Button className="b" variant="primary"  href="/RejStaff">view</Button>
     </Form>
 </Card.Body>
</Card>

</CardGroup>
        </div> 
       )
      }
       
        
      }
    }