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
            v:false,
             name:"",
            
            
        }
        this.add=this.add.bind(this);
        this.changeFaculty=this.changeFaculty.bind(this);
        this.view=this.view.bind(this);
      
    }
      
      add(e){
       
            this.setState({
               l:true
            });
       
        }
        view(e){
       
          this.setState({
             v:true
          });
     
      }
      
      changeFaculty(e){
        this.setState({
            name:e.target.value
        })
    }
   
    render() {
        if(this.state.v){
            return <Redirect to={{
            pathname: '/missingH',
            state: { name: this.state.name}
        }}
        />
        }
        if(this.state.l){
          return <Redirect to={{
          pathname: '/missingD',
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
  <Button style={{backgroundColor:'#0b1b3f'}} className="move" variant="primary" type="submit" onClick={this.view}>
    View Missing Hours
  </Button>
  
  <Button  style={{backgroundColor:'#0b1b3f'}} variant="primary" type="submit" onClick={this.add}>
    View Missing Days
  </Button>
  
</Form>
</Container>
 
</div> 
        )
    }
}
