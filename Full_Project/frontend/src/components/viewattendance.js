import React, { Component } from 'react';
import {Button, Form, Container} from "react-bootstrap";

 import {Redirect} from "react-router-dom";
import NavBar from './NavBar.js';
import "./styles.css";

export default class addcourse extends Component {
    constructor(props){
        super(props)
        this.state={
            l:false,
             name:"",
             Message:""
            
            
        }
        this.add=this.add.bind(this);
        this.changeFaculty=this.changeFaculty.bind(this);
        this.validate=this.validate.bind(this);
    }
    validate =() =>{
      if(this.state.name=="")
        return false;
      else 
      return true;
      }
        
      add(e){
        e.preventDefault();
        if(this.state.name===""){
      
        this.setState({
          Message:"please enter missing field"
       });
       }
       else {
        this.setState({
          l:true
       });
       }
           
        }
   
      changeFaculty(e){
        this.setState({
            name:e.target.value
        })
    }

   
    render() {
        if(this.state.l){
            return <Redirect to={{
            pathname: '/attendance',
            state: { name: this.state.name}
        }}
        />
        }
      
        return (
            <div>
<NavBar/>              <Container>
            <Form className="form">
  <Form.Group >
    <Form.Label>Member ID</Form.Label>
    <Form.Control  placeholder="ac-2" onChange={this.changeFaculty}/>
  </Form.Group>

  
  <Button  style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick={this.add}>
    View
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
