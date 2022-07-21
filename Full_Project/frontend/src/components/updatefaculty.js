import React, { Component } from 'react';
import {Button, Form, Container} from "react-bootstrap";
import axios from "axios";


import NavBar from './NavBar.js';
import "./styles.css";
export default class updatefaculty extends Component {
    constructor(props){
        super(props)
        this.state={
            l:false,
             oldname:null,
             newname:null,
             Message:null
        }
        this.add=this.add.bind(this);
        this.changeRoom=this.changeRoom.bind(this);
        this.changeCap=this.changeCap.bind(this);
     
      }
      
      add(e){
        e.preventDefault();
        axios({
          method: 'post',
          url: 'HR/updatefaculty',
          data: {
              course:this.state.oldname,
              newcourse:this.state.newname,
              
            
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
  
    render() {
      
        return (
            <div>
<NavBar/>              <Container>
            <Form className="form">
  <Form.Group>
    <Form.Label>Faculty Name</Form.Label>
    <Form.Control  placeholder="Engineering" onChange={this.changeRoom}/>
  </Form.Group>
  
  
  <Form.Group>
    <Form.Label>New Name</Form.Label>
    <Form.Control  placeholder="Pharmacy"  onChange={this.changeCap}/>
  </Form.Group>
  <Button style={{backgroundColor:'#0b1b3f'}}  variant="primary" type="submit" onClick={this.add}>
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
