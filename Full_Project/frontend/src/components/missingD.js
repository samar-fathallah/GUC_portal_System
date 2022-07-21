import React, { Component } from 'react'

import axios from "axios";
import NavBar from "./NavBar";
export default class missingD extends Component {
    constructor(props){
        super(props)
        this.state={
            Schedule:[]
           
        }
    }
    componentDidMount () {
            axios.get('HR/ViewByDays', {
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
        return (
           <div className="table">
          <NavBar/>
        <h1>{this.state.Schedule}</h1>
 </div> 
        )
    }
}
