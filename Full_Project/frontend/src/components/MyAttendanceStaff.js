import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import {Button,Form} from "react-bootstrap";
import axios from "axios";
import NavBarStaff from './NavBarStaff.js';
import {Table} from "react-bootstrap";
import "./styletrail.css";
import "./styles.css";
export default class Myattendance extends Component {
    constructor(props){
        super(props)
        this.state={
            Profile:[],
             v:false,
             month:null,
             Message:null,
             Error:null
           
           
        }
    this.change=this.change.bind(this);
    this.go=this.go.bind(this);
    }
  
    change(e){
      this.setState({
        month:e.target.value
    })
    }
    componentDidMount () {
        console.log("here")
            axios.get('/ViewAttendance', {
              params: {
                id:"ac-"+ JSON.parse(sessionStorage.getItem("loggeduser"))._id
              },
              headers:{
                "auth-token":sessionStorage.getItem("token")
            }
          
              }).then(res=>{
                  if(res.data==="No attendance found"){
                    this.setState({
                        Error:res.data
                    }); 
                  }
                  else{
                this.setState({
                  Profile:res.data
              });}
                   
                   
              }).catch(err=>{
                  console.log(err)
              })
          }
    go(){
            if(this.state.month){
                this.setState({v:true});
           
          }
          else{
            this.setState({Message:"please enter missing field"});
          }
          }
    
    
    render() {
     if(this.state.v){
        return <Redirect to={{
            pathname: '/MyAttMonthCC',
            state: { month:this.state.month}
        }}
        />
     }
      if(this.state.Error){
       return ( <div>

<NavBarStaff home="/Head" profile="/profileHOD" attendance="/MyattendanceHOD" att2="/MissDayHOD" att3="/MissHourHOD"  req1="/ReplaceHOF" req2="/SubmitHOD" signin="/MySignInHOD" signout="/MySignOutHOD" reset="/passwordHOD" schedule="/MyScheduleHOD" request="/MyRequestsHOD"/>      <h2 style={{marginTop:'100px'}}>{this.state.Error}</h2>
      <div >
    <Form.Group>
    <Form.Label>View Specific Month </Form.Label>
    <Form.Control className="login100-form validate-form" placeholder="3"  onChange={this.change}/>
  </Form.Group  >
    <div className="container-login100-form-btn" style={{marginTop:'10px'}}>
                      <Button className="login100-form-btn"  onClick={this.go}>
                        View 
                      </Button>
                      </div>
                      
                      </div>
                      <div ng-show="Message == null">
<Form.Text className="text-muted" >
{this.state.Message}
    </Form.Text>
    </div>
      
      
      
      
      
      </div>)
      }
     else{
        return (
           <div>

<NavBarStaff home="/Head" profile="/profileHOD" attendance="/MyattendanceHOD" att2="/MissDayHOD" att3="/MissHourHOD"  req1="/ReplaceHOF" req2="/SubmitHOD" signin="/MySignInHOD" signout="/MySignOutHOD" reset="/passwordHOD" schedule="/MyScheduleHOD" request="/MyRequestsHOD"/>      <div className="table">
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
      {this.state.Profile.map(entry=>(
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
    <div >
    <Form.Group>
    <Form.Label>View Specific Month </Form.Label>
    <Form.Control className="login100-form validate-form" placeholder="10"  onChange={this.change}/>
  </Form.Group  >
    <div className="container-login100-form-btn" style={{marginTop:'10px'}}>
                      <Button className="login100-form-btn"  onClick={this.go}>
                        View 
                      </Button>
                      </div>
                      
                      </div>
                      <div ng-show="Message == null">
<Form.Text className="text-muted" >
{this.state.Message}
    </Form.Text>
    </div>
                      </div>
 
        )
    }
}
}

