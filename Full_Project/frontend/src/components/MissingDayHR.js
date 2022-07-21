import React, { Component } from 'react'

import axios from "axios";
import NavBar from "./NavBar";
import "./styles.css";
export default class missingh extends Component {
    constructor(props){
        super(props)
        this.state={
            Schedule:[]
           
        }
    }
    componentDidMount () {
            axios.get('/ViewMissingDays'
, {
              params: {
                id:"hr-"+ JSON.parse(sessionStorage.getItem("loggeduser"))._id
              },
              headers:{
                "auth-token":sessionStorage.getItem("token")
            }
          
              }).then(res=>{
                this.setState({
                  Schedule:JSON.stringify(res.data).split(',')
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
 <th>Missing Days</th>


 </tr>
       
      </thead>
      <tbody>
     
      {this.state.Schedule.map(entry=>(
        <tr style={{fontSize:'25px'}} >{entry}</tr>  
     
      ))}
     
      </tbody>
  </table>
</div> 
</div>
       
       
 </div> 
        )
    }
}
