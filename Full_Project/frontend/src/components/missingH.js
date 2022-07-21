import React, { Component } from 'react'

import axios from "axios";
import NavBar from "./NavBar";
export default class missingh extends Component {
    constructor(props){
        super(props)
        this.state={
            Schedule:"",
          
           
        }
    }
    componentDidMount () {
   
            axios.get('HR/ViewByHours', {
              params: {
                id:this.props.location.state.name
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
      if(JSON.parse(sessionStorage.getItem("loggeduser")).HOD===true ||
      JSON.parse(sessionStorage.getItem("loggeduser")).CC===true || JSON.parse(sessionStorage.getItem("loggeduser")).CI===true ||JSON.parse(sessionStorage.getItem("loggeduser")).TA===true  ){
        this.setState({verified:true});
       return(
       <h1>Sorry Can't Access this Page</h1>)
     }
     else{
        return (
           <div className="table">
<NavBar/>            <div className="table">
<div class="table-wrapper">
  <table class="fl-table">
      <thead>
      <tr>
 <th>Missing Hours</th>


 </tr>
       
      </thead>
      <tbody>
        <tr >
        <td>{(this.state.Schedule).split(",")[0].split(":")[1]}</td>
        </tr>
     
      </tbody>
  </table>
</div> 
</div>
       
       
 </div> 
        )
    }
  }
}
