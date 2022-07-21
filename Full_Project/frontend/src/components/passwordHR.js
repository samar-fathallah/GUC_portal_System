import React, { Component } from 'react';
import {Button, Form, Container} from "react-bootstrap";
import axios from "axios";


import NavBar from './NavBar.js';
import "./styles.css";
export default class updatecourse extends Component {
    constructor(props){
        super(props)
        this.state={
            l:false,
             oldname:null,
             newname:null,
             newname2:null,
             Message:null
             
        }
        this.add=this.add.bind(this);
        this.changeRoom=this.changeRoom.bind(this);
        this.changeCap=this.changeCap.bind(this);
        this.changeCap2=this.changeCap2.bind(this);
     
      }
      
      add(e){
        e.preventDefault();
        if(this.state.newname===this.state.newname2){
        axios({
          method: 'post',
          url: '/ResetPassword',
          data: {
            oldpassword:this.state.oldname,
              newpassword:this.state.newname, 
          },
          params:{
            id:"hr-"+JSON.parse(sessionStorage.getItem("loggeduser"))._id
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
          this.setState({
            Message:err.response.data.msg
         });
          
        })
      }
      else{
        this.setState({
          Message:"New password recheck doesn't match"
       });
      }
    }
      changeRoom(e){
        this.setState({
            oldname:e.target.value
        })
    }
        changeCap(e){
            this.setState({
                newname:e.target.value
            })
        }
        changeCap2(e){
          this.setState({
              newname2:e.target.value
          })
      }

  
    render() {
        return (
            <div>
<NavBar/>              <Container>
            <Form className="form">
  <Form.Group>
    <Form.Label>Please Enter Your Old Password</Form.Label>
    <Form.Control type="password"  placeholder="************" onChange={this.changeRoom}/>
  </Form.Group>
  
  
  <Form.Group>
    <Form.Label>New Password</Form.Label>
    <Form.Control type="password"  placeholder="newpassword"  onChange={this.changeCap}/>
  </Form.Group>
  <Form.Group>
    <Form.Label>Check Password</Form.Label>
    <Form.Control type="password"  placeholder="newpassword"  onChange={this.changeCap2}/>
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
