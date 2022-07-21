import React, { Component } from 'react';
import {Button, Form, CardGroup,Card} from "react-bootstrap";

import axios from "axios";
import {Redirect} from "react-router-dom";
import NavBarStaff from './NavBarStaff.js'
import NavBar from './NavBar.js'

import Container from 'react-bootstrap/Container'

import Row from 'react-bootstrap/Row'
import "./styles.css";

export default class manageRequestsChangeAll extends Component{
    constructor(props){
        super(props)
        this.state={
            requests:[],
            message:null,
            reject_comment:null,
            requestID:null,
            message1:null,
            message2:null,
           
        }
        this.accept=this.accept.bind(this)
        this.reject=this.reject.bind(this)
        this.changereject_comment=this.changereject_comment.bind(this);
    }
    changereject_comment(e){
         
      this.setState({
        reject_comment:e.target.value
      })
      console.log(this.state.reject_comment)
  }
      reject(id) {            
        this.state.requestID= id
      axios({
        method: 'post',
        url: '/HOD/rejectRequest',
        params:{id: JSON.parse(sessionStorage.getItem("loggeduser"))._id},
        data: {
          reqId: this.state.requestID,
          comment:this.state.reject_comment
        }
      }).then(res=>{
          this.setState({
              
             message2:res.data
          });
            console.log(res.data);
      }).catch(err=>{
      })
    }  
    accept(id) {
               
      
        this.state.requestID= id
        console.log(this.state.requestID)
        axios({
          method: 'post',
          url: '/HOD/accepetRequest',
          params:{id:this.state.requestID},
        }).then(res=>{
            this.setState({
               message2:res.data
            });
              console.log(res.data);
        }).catch(err=>{
        })
      }  
      componentDidMount () {
        axios.get('/HOD/viewrequests/allstaffdayoff', {
          params: {
            id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
          }
      
          }).then(res=>{
            if(res.data ==="no staff found" || res.data ==="not found" || res.data ==="cant access this page" ){
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
                  <NavBarStaff home="/Head" profile="/Staffprofile" attendance="/Myattendance" schedule="/MySchedule" request="/MyRequests"/>
                 
  
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
                   <th>state</th>
                   <th>Accept</th>
                   <th>Reject</th>
                   <th>comment for rejection</th>
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
                 <td>{values.state}</td>  
                 <td className='opration'>
                        <button onClick={() => this.accept(values._id)}>accept</button></td>
                        
                       
                        <td className='opration'>
                        <button onClick={() => this.reject(values._id)}>reject</button></td>
                        <td>
                        <Form>

   
                        <Form.Control size="sm"   placeholder="Enter comment" onChange={this.changereject_comment}/>
</Form>                         
                          </td>
                        
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
                  <NavBarStaff home="/Head" profile="/Staffprofile" attendance="/Myattendance" schedule="/MySchedule" request="/MyRequests"/>
               <div className="table">
               <h1 >{JSON.stringify(this.state.message)}</h1>
                 
                  </div> 
                  
                  </div>
            
               
           )
          }
        
    }

}