import React, { Component } from 'react';
import {Nav,Navbar,NavDropdown,Alert} from "react-bootstrap";

import {Redirect} from "react-router-dom";
import Logo from './guc.png';
import profile from './profile.jpg';
export default class NavBar extends Component {
    constructor(props){
        super(props)
       this.state={
         alert:this.props.alert||false,
         member:(sessionStorage.getItem("loggeduser"))?JSON.parse(sessionStorage.getItem("loggeduser")):null
       }
    }
    
    render() {
      console.log(this.state.alert);
      if(!sessionStorage.getItem("loggeduser"))
      return(<Redirect to={{pathname:"/"}}/>);
        return (
            <div>
     <Navbar bg="light" expand="lg" fixed="top" >
     <Navbar.Brand href="#home">
      <img
        alt=""
        src={Logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />{' '}
     
    </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href={sessionStorage.getItem("home")?sessionStorage.getItem("home"):"#NOne"}>Home</Nav.Link>
      <Nav.Link href={sessionStorage.getItem("profile")}>My Profile</Nav.Link>
    
      <NavDropdown title= "My Attendance" id="collasible-nav-dropdown">
        <NavDropdown.Item href={sessionStorage.getItem("attendance")}>View Attendance</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href={sessionStorage.getItem("att2")}>View Missing Days </NavDropdown.Item>
        <NavDropdown.Item href={sessionStorage.getItem("att3")}>View Missing Hours</NavDropdown.Item>
      </NavDropdown>
    
    </Nav>
    {this.state.alert?(<Alert style={{marginRight:20,marginTop:0,marginBottom:0}}variant="danger" onClose={() => this.setState({alert:false})} dismissible >
        Please Change Your Password
      </Alert>):(<div/>)}
    <Navbar.Text>
      Signed in as: <a>{this.state.member?this.state.member.Name:"not logged in"}</a>
    
    </Navbar.Text>
    <img
        src={profile}
        width="45"
        height="45"
        align="left"
        className="d-inline-block align-top"
        alt="Your Profile"
      />
      
    <NavDropdown title="" id="basic-nav-dropdown" drop="left">
    <img
        src={profile}
        width="50"
        height="50"
        align="right"
        className="d-inline-block align-top"
        alt="Your Profile"
      />
        <NavDropdown.Item href={this.props.signin}>Sign In</NavDropdown.Item>
        <NavDropdown.Item href={this.props.signout}>Sign Out</NavDropdown.Item>
        <NavDropdown.Item href={this.props.reset}>Reset My Password</NavDropdown.Item>
        <NavDropdown.Item href="/hr" onClick={()=>{sessionStorage.removeItem("loggeduser");
          sessionStorage.removeItem("token");}}>Log Out</NavDropdown.Item>
      </NavDropdown>
   
   
  </Navbar.Collapse>
</Navbar>
</div>
        )
    }
}
