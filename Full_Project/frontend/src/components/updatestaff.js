import React, { Component } from 'react';
import {Button, Form, Col,Row, Container} from "react-bootstrap";

import axios from "axios";
import NavBar from './NavBar.js';
import "./styles.css";
export default class updatestaff extends Component {
    constructor(props){
        super(props)
        this.state={
             field:"",
             id:"",
             change:"",
             Message:null
        }
        this.add=this.add.bind(this);
        this.changeID=this.changeID.bind(this);
        this.changeName=this.changeName.bind(this);
        this.changeGender=this.changeGender.bind(this);
        this.changeEmail=this.changeEmail.bind(this);
        this.changePassword=this.changePassword.bind(this);
        this.changeSalary=this.changeSalary.bind(this);
        this.changeday=this.changeday.bind(this);
        this.changeOffice=this.changeOffice.bind(this);
        this.AssignHead=this.AssignHead.bind(this);
        this.changeUpdate=this.changeUpdate.bind(this);
      }
      
      changeID(e){
        this.setState({
        id:e.target.value
        })
    }
        changeName(e){
            this.setState({
                field:"Name"
            })
        }
        changeGender(e){
            this.setState({
                field:"gender"
            })
        }
        changeEmail(e){
            this.setState({
                field:"email"
            })
        }
        changePassword(e){
            this.setState({
                field:"password"
            })
        }
        changeSalary(e){
            this.setState({
                field:"salary"
            })
        }
        changeday(e){
            this.setState({
                field:"day_off"
            })
        }
        changeOffice(e){
            this.setState({
                field:"OfficeLocation"
            })
        }
        changeUpdate(e){
            this.setState({
                change:e.target.value
            })
        }
        AssignHead(e){
            this.setState({
                field:"HOD",change:"true"
            })
        }
        add(e){
          e.preventDefault();
      
      
        axios({
          method: 'post',
                  url: 'HR/UpdateStaff',
                  data: {
                  staffID:this.state.id,
                  fieldtoUpdate:this.state.field,
                  Update:this.state.change
                  },
                  headers:{
                    "auth-token":sessionStorage.getItem("token")
                }
        }).then(res=>{
            this.setState({
               Message:res.data
            });
              console.log(this.state.Message);
        }).catch(err=>{
            console.log(err.response.data.msg)
        })
        
        
        }
    render() {
       
        return (
            <div>
<NavBar/>              <Container>
            <Form className="form">
  <Form.Group >
    <Form.Label>Staff Member ID</Form.Label>
    <Form.Control  placeholder="ac-12" onChange={this.changeID}/>
  </Form.Group>
  <fieldset>
    <Form.Group as={Row}>
      <Form.Label as="legend" >
        Field to Update (Select One)
      </Form.Label>
      <Col sm={10}>
        <Form.Check  inline
          type="radio"
          label="Name"
          onChange={this.changeName}
         
        />
        <Form.Check  inline
          type="radio"
          label="gender"
          onChange={this.changeGender}
        />
        <Form.Check  inline
          type="radio"
          label="email"
          onChange={this.changeEmail}
        />
        <Form.Check  inline
          type="radio"
          label="password"
          onChange={this.changePassword}
        />
         <Form.Check  inline
          type="radio"
          label="salary"
          onChange={this.changeSalary}
        />
          <Form.Check  inline
          type="radio"
          label="Day off"
          onChange={this.changeday}
        />
          <Form.Check  inline
          type="radio"
          label="Office Location"
          onChange={this.changeOffice}
        />
         <Form.Check  inline
          type="radio"
          label="Assign HOD"
          onChange={this.AssignHead}
        />
      </Col>
    </Form.Group>
  </fieldset>
  <Form.Group >
    <Form.Label>Update</Form.Label>
    <Form.Control  placeholder="new value"  onChange={this.changeUpdate}/>
  </Form.Group>
  <Button style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick={this.add}>
    Update
  </Button>
</Form>
<div ng-show="Message == null">
<Form.Text className="text-muted" >
{this.state.Message}
    </Form.Text>
    </div>
</Container>
</div> 
        )
    }
}
