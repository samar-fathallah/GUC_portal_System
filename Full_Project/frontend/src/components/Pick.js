import React, { Component } from 'react';
import {Button, Col,Card,CardGroup} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import "./styletrail.css";
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
           
        }
     
    }
  
  

           
    render() {
     
        return (
          <div className="container-login100 guc" >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
                  <span className="login100-form-title p-b-37">
                      Please Pick Your Portal
                  </span>
  
                  <div className="container-login100-form-btn">
                      <Button className="login100-form-btn" href="/CI">
                        Course Instructor
                      </Button>
                  </div>
  
                  <div className="container-login100-form-btn" style={{marginTop:'10px'}}>
                      <Button className="login100-form-btn"  href="/Head">
                        Head of Department
                      </Button>
                  </div>
                  

  
    </div>
         
  
              
       
      
      </div>
       












        )
    }
}
