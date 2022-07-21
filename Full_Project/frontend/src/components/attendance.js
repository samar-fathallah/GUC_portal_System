import React, { Component } from 'react'
//element . validity . valueMissing
import axios from "axios";
import {Table} from "react-bootstrap";
import NavBar from "./NavBar"
import "./styles.css";
export default class about extends Component {
    constructor(props){
        super(props)
        this.state={
            Schedule:[],
            Message:null
           
        }
    }
    componentDidMount () {
            axios.get('HR/ViewAttendance', {
              params: {
                member_id:this.props.location.state.name
              },
              headers:{
                "auth-token":sessionStorage.getItem("token")
            }
          
              }).then(res=>{
                if(res.data=="No attendance found"){
                  this.setState({
                    Message:res.data
                });
                }
                else{
                this.setState({
                  Schedule:res.data
              });}
                
              }).catch(err=>{
                  console.log(err)
              })
          }
    
    render() {
      if(this.state.Message){
  return (
  <div>
<NavBar/>        <h1 className="form">{this.state.Message}</h1>
      </div>)}
      else{
        return(
      <div>
<NavBar/>        <div className="table">
          <div class="table-wrapper">
              <table class="fl-table">
                  <thead>
                  <tr>
                  <th>Hours Spent</th>
          <th>Day</th>
          <th>Month</th>
          <th>Year</th>
                  </tr>
                  </thead>
                  <tbody>
                  
        {this.state.Schedule.map(entry=>(
        <tr id={entry._id}>
        <td>{Math.floor((entry.Days[0].MinutesSpent)/60)}</td>  
        <td>{entry.Days[0].day}</td>  
        <td>{entry.Days[0].month}</td>  
        <td>{entry.Days[0].year}</td>  
        </tr>
      ))}
                  </tbody>
              </table>
          </div>
          </div>
        </div> 
        )}
    }
}

