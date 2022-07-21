import React, { Component } from 'react'
import NavBarStaff from './NavBarStaff.js'
import axios from "axios";
import './styles.css';
import './styleProfile.css';
import pro from './pro.jpg';
import image from "./member.png";
export default class about extends Component {
    constructor(props){
        super(props)
        this.state={
            Schedule:[]
           
        }
    }
   
    
    render(){
              
      return(
        <div className="omar">
        < div className="table"  >
        <NavBarStaff />
        
        < div class="container emp-profile"  >
    
                    <form method="post">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="profile-img">
                                    <img src={pro} alt=""/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="profile-head">
                                            <h5>
                                            {JSON.parse(sessionStorage.getItem("loggeduser")).Name}
                                            </h5>
                                            
                                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                
                            </div>
                            
                            <div class="col-md-8" >
                                <div class="tab-content profile-tab" id="myTabContent" >
                                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>User Id</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>{JSON.parse(sessionStorage.getItem("loggeduser"))._id}</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Email</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>{JSON.parse(sessionStorage.getItem("loggeduser")).email}</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>gender</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>{JSON.parse(sessionStorage.getItem("loggeduser")).gender}</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Faculty</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>{JSON.parse(sessionStorage.getItem("loggeduser")).faculty}</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Department</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>{JSON.parse(sessionStorage.getItem("loggeduser")).department}</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Day off</label>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <p>{JSON.parse(sessionStorage.getItem("loggeduser")).day_off}</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>salary</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>{JSON.parse(sessionStorage.getItem("loggeduser")).salary}</p>
                                                    </div>
                                                </div>


                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>annual leave balance</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>{JSON.parse(sessionStorage.getItem("loggeduser")).annualleavebalance}</p>
                                                    </div>
                                                </div>




                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>accidental leave balance</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>{JSON.parse(sessionStorage.getItem("loggeduser")).accidentalleavebalance}</p>
                                                    </div>
                                                </div>

                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <label>Office Location</label>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <p>{JSON.parse(sessionStorage.getItem("loggeduser")).OfficeLocation}</p>
                                                    </div>
                                                </div>

                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                    </form>           
                </div>
                </div>
                </div>
      )
  }

}

