import React, { Component } from 'react';
import {Col} from "react-bootstrap";

import axios from "axios";
import NavBarStaff from './NavBarStaff.js'

import Container from 'react-bootstrap/Container'

import Row from 'react-bootstrap/Row'

import "./styles.css";
import NavBar from './NavBar.js';

export default class dayOffOne extends Component{
    constructor(props){
        super(props)
        this.state={
          staff:[],
          message:null,
          error:null
         
      }
    }
    componentDidMount(){
    
              axios({
                method: 'post',
                url: '/HOD/dayOffOne',
                params:{id:  JSON.parse(sessionStorage.getItem("loggeduser"))._id},
                data: {
                  id2: this.props.location.state.id2
                },headers:{
                  "auth-token":sessionStorage.getItem("token")
                }
              }).then(res=>{
                if(res.data === "this staff is not in your department"|| res.data === "cant access this page"){
                  this.setState({
                    message:res.data
                 });
                }else{
                  this.setState({
                    staff:res.data
                 });
                }
                  
                    console.log(res.data);
              }).catch(err=>{
                
              })

        
        
        
    }

    render(){
      if(this.state.message === null){
      return(
          
          <Container fluid>
          <Row>
          <div>
<NavBarStaff/>

            </div>
          </Row>
          <Row>
          <div className="table">
          <div class="table-wrapper">
              <table class="fl-table">
                  <thead>
                  <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>day_off</th>
                  </tr>
                  </thead>
                  <tbody>
                  
        {this.state.staff.map(values=>(
        <tr>
        <td>{values._id}</td>  
        <td>{values.Name}</td>
        <td>{values.day_off}</td>
        </tr>
      ))} 
                  </tbody>
              </table>

         </div> 
</div>
          </Row>
          
          </Container>
          
      )
      }else{
        return(
          
          <Container fluid>
          <Row>
          <div>
<NavBar/>              </div>
          </Row>
          <Row>
          <div className="table">
          <h1>{JSON.stringify(this.state.message)}</h1>
</div>
          </Row>
          
          </Container>
          
      )

      }
       
    }

}

