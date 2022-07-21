import React, { Component } from 'react'

import axios from "axios";
import NavBar from "./NavBar";
export default class missingh extends Component {
    constructor(props){
        super(props)
        this.state={
            Schedule:""
           
        }
    }
    componentDidMount () {
            axios.get('/missingHours', {
              params: {
                id:"hr-"+ JSON.parse(sessionStorage.getItem("loggeduser"))._id
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
           <div className="table">
<NavBar/>  
          <div className="table">
<div class="table-wrapper">
  <table class="fl-table">
      <thead>
      <tr>
 <th>Missing Hours</th>
 <th>Extra Hours</th>

 </tr>
       
      </thead>
      <tbody>
        <tr >
        <td>{this.state.Schedule[0]}</td>
        <td>{this.state.Schedule[1]}</td>
        </tr>
     
      </tbody>
  </table>
</div> 
</div>
       
       
 </div> 
        )
    }
}
