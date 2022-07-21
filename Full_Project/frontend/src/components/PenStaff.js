import React, { Component} from 'react'
import {Button, Form, CardGroup,Card} from "react-bootstrap";

import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import "./styles.css";

export default class AccCC extends Component {
    constructor(props){
        super(props)
        this.state={
            staff:[],
            message:null,
            message2:null,
            requestID:null
        }
        this.accept=this.accept.bind(this);
    }

    accept(id) {
               
      
      this.setState({requestID:id})
      axios({
        method: 'post',
        url: '/CancelRequest',
        data:{
          reqid: this.state.requestID
        },
        params:{id:JSON.parse(sessionStorage.getItem("loggeduser"))._id},
      }).then(res=>{
          this.setState({
             message2:res.data
          });
            console.log(res.data);
      }).catch(err=>{
      })
    } 
    componentDidMount () {
            axios({
                method: 'get',
                url: '/PendingRequestStatus',
                params: {
                  id:"ac-"+JSON.parse(sessionStorage.getItem("loggeduser"))._id
                },
              headers:{
                  "auth-token":sessionStorage.getItem("token")
              }}).then(res=>{
                if(res.data === "No Pending requests Found"){
                  this.setState({
                    message:res.data
                  });
                }else{
                  this.setState({
                    staff:res.data
                  });
                }

              }).catch(err=>{
                 
              })
            }

        
    render() {
          if(this.state.message ==null){
              
            return (
              <div>
        <NavBarStaff home="/Head" profile="/profileHOD" attendance="/MyattendanceHOD" att2="/MissDayHOD" att3="/MissHourHOD"  req1="/ReplaceHOF" req2="/SubmitHOD" signin="/MySignInHOD" signout="/MySignOutHOD" reset="/passwordHOD" schedule="/MyScheduleHOD" request="/MyRequestsHOD"/>
      <div className = "table">
      <div ng-show="message == null">
   <Form.Text className="text-muted" className="color">
   {this.state.message2}
       </Form.Text>
       </div>
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
        <td className='opration'>
                        <button onClick={() => this.accept(members._id)}>Cancel</button></td>
       
        </tr>   
       
      
      ))} 
                  </tbody>
              </table>
          </div>
       </div>
       </div>
       </div>    
            )
          }
          else{
            return (
              <div>
        <NavBarStaff home="/Head" profile="/profileHOD" attendance="/MyattendanceHOD" att2="/MissDayHOD" att3="/MissHourHOD"  req1="/ReplaceHOF" req2="/SubmitHOD" signin="/MySignInHOD" signout="/MySignOutHOD" reset="/passwordHOD" schedule="/MyScheduleHOD" request="/MyRequestsHOD"/>
           <div className = "table">
           <h1> No requests Found</h1>
            </div> 
            </div> 
           )
          }
        
    }
}