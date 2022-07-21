import React, { Component } from 'react'

import axios from "axios";

export default class schedule extends Component {
    constructor(props){
        super(props)
        this.state={
            Schedule:[]
           
        }
    }
    componentDidMount () {
            axios.get('/ViewSchedule/', {
              params: {
                id:"ac-"+this.props.location.state.id
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
        <h1>{JSON.stringify(this.state.Schedule)}</h1>
 </div> 
        )
    }
}
