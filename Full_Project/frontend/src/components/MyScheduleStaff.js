import React, { Component } from 'react'

import axios from "axios";
import NavBarStaff from './NavBarStaff.js';
export default class scheduleHOD extends Component {
    constructor(props){
        super(props)
        this.state={
            Schedule:[]
           
        }
    }
    componentDidMount () {
            axios.get('/ViewSchedule/', {
              params: {
                id:"ac-"+JSON.parse(sessionStorage.getItem("loggeduser"))._id
              },
              headers:{
                "auth-token":sessionStorage.getItem("token")
            }
          
              }).then(res=>{
                this.setState({
                  Schedule:res.data
              });
                    console.log(res.data);
                   
              }).catch(err=>{
                  console.log(err)
              })
          }
    
    render() {
        return (
           <div>
        <NavBarStaff home="/Head" profile="/profileHOD" attendance="/MyattendanceHOD" att2="/MissDayHOD" att3="/MissHourHOD"  req1="/ReplaceHOF" req2="/SubmitHOD" signin="/MySignInHOD" signout="/MySignOutHOD" reset="/passwordHOD" schedule="/MyScheduleHOD" request="/MyRequestsHOD"/>
        <div className="table">
<div class="table-wrapper">
  <table class="fl-table">
      <thead>
      <tr>
 <th>Day</th>
 <th>Slot</th>
 <th>Course</th>
 </tr>
       
      </thead>
      <tbody>
      
      {this.state.Schedule.map(entry=>(
        <tr id={entry._id}>
        <td>{entry.day_slot.split("y")[0]+"y"}</td>
        <td>{entry.day_slot.split("y")[1]}</td>  
        <td>{entry.course}</td>  
       
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
