import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import {Button, Form, Card,CardGroup} from "react-bootstrap";
import "./styles.css";

export default class HODassignments extends Component {
    constructor(props){
        super(props)
        this.state={
            staff:[],
            message:null,  
        }
      }
    componentDidMount () {
            axios.get('HOD/courseAssignment', {
              params: {
                id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
              },headers:{
                "auth-token":sessionStorage.getItem("token")
            }
          
              }).then(res=>{
              if(res.data === "no courses found/you may not have access to this page" || res.data === "no slots found"){
                this.setState({
                  message:res.data
              }); 
              }else{
                this.setState({
                  staff:res.data
              }); 
              }
;               
              
              console.log(JSON.stringify(this.state.staff));
                    console.log(res.data);
                   
              }).catch(err=>{
                  console.log(err)
              })
          }
     
    
    render() {
      if(this.state.message ===null){
        return (
          
          <div>
<NavBarStaff/>
       <div className = "table">
       <div class="table-wrapper">
              <table class="fl-table">
              <thead>
                    <tr>
                  <th>ID</th>
                <th>Slot</th>
                <th>Course</th>
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

        <tr >
        <td style={{fontSize:'20px'}}>{members.split(",")[0]}</td>
        <td style={{fontSize:'20px'}}>{members.split(",")[1]}</td>
        <td style={{fontSize:'20px'}}>{members.split(",")[2]}</td>
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
<NavBarStaff/>       <div className = "table">
      
       <h1 >{JSON.stringify(this.state.message)}</h1>
       </div>
    
        </div> 
       )
      }
       
        
      }
    }