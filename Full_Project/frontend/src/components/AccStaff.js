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
            axios.get('/AcceptedRequestStatus', {
              params: {
                id:"ac-"+JSON.parse(sessionStorage.getItem("loggeduser"))._id
              },headers:{
                "auth-token":sessionStorage.getItem("token")
            }
          
              }).then(res=>{
              if(res.data === "No Accepted requests Found"){
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
  
        </div> 
       )
      }else{
        return (
          
          <div>
        <NavBarStaff home="/Head" profile="/profileHOD" attendance="/MyattendanceHOD" att2="/MissDayHOD" att3="/MissHourHOD"  req1="/ReplaceHOF" req2="/SubmitHOD" signin="/MySignInHOD" signout="/MySignOutHOD" reset="/passwordHOD" schedule="/MyScheduleHOD" request="/MyRequestsHOD"/>
       <div className = "table">
      
       <h1 >{this.state.message}</h1>
       </div>

        </div> 
       )
      }
       
        
      }
    }