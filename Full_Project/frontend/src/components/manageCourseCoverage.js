import React, { Component } from 'react'
import axios from "axios";
import NavBarStaff from "./NavBarStaff.js"
import "./styles.css";
import { Navbar } from 'react-bootstrap';

export default class manageCourseCoverage extends Component {
    constructor(props){
        super(props)
        this.state={
            coverage:[],
            message:null
        }
    }
    componentDidMount () {
        axios.get('/HOD/viewCoverage/', {
          params: {
            id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
        },headers:{
            "auth-token":sessionStorage.getItem("token")
        }
      
          }).then(res=>{
              if(res.data === "Sorry No courses to access"){
                this.setState({
                    message:res.data
              }); 
              }
              else{
                this.setState({
                    coverage:res.data
              }); 
              }
           
                console.log(res.data);
               
          }).catch(err=>{
              console.log(err)
          })
      }
    render() {
        if(this.state.message ===null){
            return (
                <div>
<NavBarStaff/>                <div className="table">
                <div class="table-wrapper">
                    <table class="fl-table">
                        <thead>
                        <tr>
                        
                <th>name</th>
                <th>coverage</th>
      
              
                        </tr>
                        </thead>
                        <tbody>
                        
              {this.state.coverage.map(values=>(
              <tr> 
              <td>{values.name}</td>
              <td>{values.coverage}</td>
              
              </tr>
            
            ))} 
                        </tbody>
                    </table>
               </div> 
               </div> 
               </div>
             )

        }
        else{
            return (
                <div>
<NavBarStaff/>     
             <div className = "table">
             <h1 >{JSON.stringify(this.state.message)}</h1>
              </div> 
              </div> 
             )
        }

      
    }
}
