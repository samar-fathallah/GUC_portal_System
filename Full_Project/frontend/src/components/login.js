import React, { Component } from 'react';
import {Button,Form} from "react-bootstrap";
import axios from "axios";
import {Redirect} from "react-router-dom";
import "./styletrail.css";
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
            email:null,
            password:null,
            user:null,
            token:"",
            logged:false,
            alert:false,
            Message:null,
            Error:null
        }
        this.changeEmail=this.changeEmail.bind(this);
        this.changePass=this.changePass.bind(this);
        this.login=this.login.bind(this);
    }
    
    changeEmail(e){
        this.setState({
            email:e.target.value
        })
        console.log(this.state.email);
    }
    changePass(e){
        this.setState({
            password:e.target.value
        })
        console.log(this.state.password);
    }

    async login(e){
            e.preventDefault();
   if(this.state.email && this.state.password){
     this.setState({Error:null})
              axios({
                method: 'post',
                url: '/login',
                data: {
                  email: this.state.email,
                  password: this.state.password
                }
              }).then(res=>{
                if(res.data==="User is not registered"){
                 
                  this.setState({Error:res.data})
                }
                else if(res.data==="Invalid credentials"){
                  this.setState({Error:"Invalid credentials"})
                  console.log("kelm")
                }
                else{
                  sessionStorage.setItem("loggeduser",JSON.stringify(res.data.existingUser))
                  sessionStorage.setItem("token",res.data.token)
                  this.setState({
                      token:res.data.token,
                      user:res.data.existingUser,
                      logged:true,
                      Error:null,
                      alert:(this.state.password==="123456"?true:false)
                  });
                }
              }).catch(err=>{
                  console.log(err.response.data.msg)
              })
            }
            else 
            this.setState({Message:"Please Enter Email and Password"}); 
    }

    

    render() {
      if(!this.state.Error){
        if(this.state.logged&&sessionStorage.getItem("loggeduser")){
          
          if(this.state.user.TA){
            if(this.state.user.CC){
              return <Redirect to={{
                pathname: '/pickportal',
                state: { name: this.state.user.Name ,id:this.state.user._id}
            }}
            />
            }
            else 
            return <Redirect to={{
            pathname: '/TA',
            state: { name: this.state.user.Name ,id:this.state.user._id}
        }}
        />
        }
        else if(this.state.user.CI){
          if(this.state.user.HOD){
            return <Redirect to={{
              pathname: '/Pick',
              state: { name: this.state.user.Name ,id:this.state.user._id}
          }}
          />
          }
          else{
          return <Redirect to={{
          pathname: '/CIHome',
          state: { name: this.state.user.Name ,id:this.state.user._id}
      }}
      />}
      }
      else if(this.state.user.CC){
        return <Redirect to={{
        pathname: '/CCHome',
        state: { name: this.state.user.Name ,id:this.state.user._id}
    }}
    />
    }
    else if(this.state.user.HOD){
      if(this.state.user.CI){
        return <Redirect to={{
          pathname: '/Pick',
          state: { name: this.state.user.Name ,id:this.state.user._id}
      }}
      />
      }
      else{
      return <Redirect to={{
      pathname: '/Head',
      state: { name: this.state.user.Name ,id:this.state.user._id}
  }}
  />}
  }
  else {
    return <Redirect to={{
      pathname: '/HRHome',
      state: { name: this.state.user.Name ,id:this.state.user._id,alert:this.state.alert}
  }}
  />
  }

        }
        else{
          console.log("not yet");
        }
      }
        return (
          <div className="container-login100 guc" >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
              <form className="login100-form validate-form">
                  <span className="login100-form-title p-b-37">
                      Login
                  </span>
  
                  <div className="wrap-input100 validate-input m-b-20" data-validate="Enter email">
                      <input className="input100" type="email" placeholder="email"  onChange={this.changeEmail}/>
                      <span className="focus-input100"></span>
                  </div>
                  <div className="wrap-input100 validate-input m-b-25" data-validate = "Enter password">
                      <input className="input100" type="password"  onChange={this.changePass} placeholder="password"/>
                      <span className="focus-input100"></span>
                  </div>
  
                  <div className="container-login100-form-btn">
                      <button className="login100-form-btn"  onClick={this.login}>
                          Login
                      </button>
                  </div>
                  <div ng-show="Message == null">
<Form.Text className="text-muted" >
{this.state.Message}
    </Form.Text>
    </div>
    <div ng-show="Message == null">
<Form.Text className="text-muted" >
{this.state.Error}
    </Form.Text>
    </div>
  
                  
              </form>
  
              
          </div>
         
      </div>
       












        )
    }
}
