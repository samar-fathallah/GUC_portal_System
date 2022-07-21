import React, { Component } from 'react';
import {Button, Form, CardGroup,Card} from "react-bootstrap";

import axios from "axios";
import {Redirect} from "react-router-dom";
import NavBarStaff from './NavBarStaff.js'
import NavBar from './NavBar.js'

import Container from 'react-bootstrap/Container'

import Row from 'react-bootstrap/Row'
import "./styles.css";

export default class CCSlotLinking extends Component{
    constructor(props){
        super(props)
        this.state={
            requests:[],
            message:null,
            requestID:null,
            message1:null,
            message2:null,
            reqid:null,
            course:null
           
        }
        this.accept=this.accept.bind(this)
        this.reject=this.reject.bind(this)
    }
      reject(id,course) {            
        this.state.requestID= id
        this.state.course = course
        console.log(course)
      axios({
        method: 'post',
        url: '/CC/RejectLikingRequest',
        params:{id: JSON.parse(sessionStorage.getItem("loggeduser"))._id},
        data: {
            reqid: this.state.requestID,
          course:this.state.course
        }
      }).then(res=>{
          this.setState({  
             message2:res.data
          });
            console.log(res.data);
      }).catch(err=>{
      })
    }  
    accept(id,course) {
        this.state.requestID= id
        this.state.course = course
        axios({
          method: 'post',
          url: '/CC/AcceptLinkingRequest',
          params:{id:JSON.parse(sessionStorage.getItem("loggeduser"))._id},
          data:{
            reqid:this.state.requestID,
            course:this.state.course
          }
        }).then(res=>{
            this.setState({
               message2:res.data
            });
              console.log(res.data);
        }).catch(err=>{
        })
      }  


        componentDidMount () {
            axios.get('/CC/SlotlinkingRequests', {
              params: {
                id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
              }
          
              }).then(res=>{
                  console.log(res.data)
                if(res.data ==="No Slot Linking requests Found" || res.data ==="Sorry Can't access requests"){
                  this.setState({
                      
                    message:res.data
                 });
                }else{
                  this.setState({
                    requests:res.data
                 });
                }
              
                
                   
              }).catch(err=>{
                  console.log(err)
              })
          }
    

          formatDate(string){
            var options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(string).toLocaleDateString([],options);
        }
    render(){
          if(this.state.message ===null){
            return(
             <div>
                  <NavBarStaff/>
                 
  
               <div className="table">
               <div ng-show="message2 == null">
   <Form.Text className="text-muted" className="color">
   {this.state.message2}
       </Form.Text>
       </div>
                   <div class="table-wrapper">
                       <table class="fl-table">
                           <thead>
                           <tr>
                   <th>request id</th>
                   <th>member ID</th>
                   <th>reciever ID</th>
                   <th>compensation day</th>
                   <th>course</th>
                   <th>department</th>
                   <th>request day</th>
                   <th>reason</th>
                   <th>slot</th>
                   <th>state</th>
                   <th>Accept</th>
                   <th>Reject</th>
                           </tr>
                           </thead>
                           <tbody>
                           
                           {this.state.requests.map(values=>(
                 <tr>
                 <td>{values._id}</td>  
                 <td>{values.member_id}</td>
                 <td>{values.reciever_id}</td>
                 <td>{this.formatDate(values.compensation_day)}</td>
                 <td>{values.course_name}</td>
                 <td>{values.department}</td>  
                 <td>{this.formatDate(values.request_day)}</td>
                 <td>{values.reason}</td>
                 <td>{values.slot}</td>
                 <td>{values.state}</td>  
                 <td className='opration'>
                        <button onClick={() => this.accept(values._id,values.course_name)}>accept</button></td>
                        
                       
                        <td className='opration'>
                        <button onClick={() => this.reject(values._id,values.course_name)}>reject</button></td>
                        
                        
                 </tr>
               
               ))} 
                           </tbody>
                       </table>
                  </div> 
                  </div> 
                  
                  </div>
              
           )
          }else{
            return(
           <div>
                  <NavBarStaff/>
               <div className="table">
               <h1 >{JSON.stringify(this.state.message)}</h1>
                 
                  </div> 
                  
                  </div>
            
               
           )
          }
        
    }

}