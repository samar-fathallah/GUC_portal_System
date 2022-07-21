import React, { Component } from 'react';
import {Button, Form, Col,Row, Container} from "react-bootstrap";


 import axios from "axios";
import NavBar from './NavBar.js';
import "./styles.css";
export default class updatelocation extends Component {
    constructor(props){
        super(props)
        this.state={
            l:false,
             Room:null,
             Cap:null,
             Type:null,
             Message:null
        }
        this.add=this.add.bind(this);
        this.changeRoom=this.changeRoom.bind(this);
        this.changeCap=this.changeCap.bind(this);
        this.TypeRoom=this.TypeRoom.bind(this);
        this.TypeHall=this.TypeHall.bind(this);
        this.TypeLab=this.TypeLab.bind(this);
        this.TypeOffice=this.TypeOffice.bind(this);
      }
      
      add(e){
        e.preventDefault();
        
        axios({
          method: 'post',
          url: 'HR/updatelocation',
          data: {
              room:this.state.Room,
              type:this.state.Type,
          capacity:this.state.Cap
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
      changeRoom(e){
        this.setState({
            Room:e.target.value
        })
    }
        changeCap(e){
            this.setState({
                Cap:e.target.value
            })
        }
        TypeRoom(e){
            this.setState({
                Type:"tut_room"
            })
        }
        TypeOffice(e){
            this.setState({
                Type:"office"
            })
        }
        TypeHall(e){
            this.setState({
                Type:"hall"
            })
        }
        TypeLab(e){
            this.setState({
                Type:"lab"
            })
        }
    render() {
        return (
            <div>
<NavBar/>              <Container>
            <Form className="form">
  <Form.Group>
    <Form.Label>Room Number</Form.Label>
    <Form.Control  placeholder="C7.203" onChange={this.changeRoom}/>
  </Form.Group>
  <fieldset>
    <Form.Group as={Row}>
      <Form.Label as="legend" >
        Room Type
      </Form.Label>
      <Col sm={10}>
        <Form.Check  inline
          type="radio"
          label="lab"
          onChange={this.TypeLab}
         
        />
        <Form.Check  inline
          type="radio"
          label="hall"
          onChange={this.TypeHall}
        />
        <Form.Check  inline
          type="radio"
          label="office"
          onChange={this.TypeOffice}
        />
        <Form.Check  inline
          type="radio"
          label="tut_room"
          onChange={this.TypeRoom}
        />
      </Col>
    </Form.Group>
  </fieldset>
  <Form.Group>
    <Form.Label>Maximum Capacity</Form.Label>
    <Form.Control  placeholder="30"  onChange={this.changeCap}/>
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
