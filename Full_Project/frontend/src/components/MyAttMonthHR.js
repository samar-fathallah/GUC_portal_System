import React, { Component } from 'react';
import {Col} from "react-bootstrap";

// import Image from 'react-bootstrap/Image';
import axios from "axios";
import {Table} from "react-bootstrap";
import NavBar from './NavBar.js'

import Container from 'react-bootstrap/Container'

import Row from 'react-bootstrap/Row'

import "./styles.css";

export default class viewSpecific extends Component {
    constructor(props){
        super(props)
        this.state={
            Staff:[],
            Message:null
           
        }
    }
    componentDidMount () {
        console.log(this.props.location.month)
            axios.get('ViewAttendance/SpecificMonth', {
              params: {
                id:"hr-"+JSON.parse(sessionStorage.getItem("loggeduser"))._id,
                month:this.props.location.state.month
              },
              headers:{
                "auth-token":sessionStorage.getItem("token")
            }
          
              }).then(res=>{
                  if(res.data=="No attendance found for this month"){
                      this.setState({Message:"No attendance found for this month"})
                  }
                  else{
                this.setState({
                  Staff:res.data
              });}
                  
                   
              }).catch(err=>{
                  console.log(err)
              })
          }
          render(){
            if(this.state.Message){
                return (
                <div>
<NavBar/>  
      <h1 className="form">{this.state.Message}</h1>
      </div>)}
      else{
            return(
                <div>
<NavBar/>  
                <div className="table">
<div class="table-wrapper">
  <table class="fl-table">
      <thead>
        <tr>
          <th>Minutes Spent</th>
          <th>Day</th>
          <th>Month</th>
          <th>Year</th>
          <th>Signed In Status </th>
          <th>Signed Out Status </th>

        </tr>
      </thead>
      <tbody>
      {this.state.Staff.map(entry=>(
        <tr id={entry._id}>
        <td>{entry.Days[0].MinutesSpent}</td>  
        <td>{entry.Days[0].day}</td>  
        <td>{entry.Days[0].month}</td>  
        <td>{entry.Days[0].month}</td>  
        <td>{entry.Days[0].Signin}</td>  
        <td>{entry.Days[0].Signout}</td>  
        </tr> 
      ))}
        
      </tbody>
    </table>
    </div>
    </div>
    </div>
               
            )
        }
    }
}

