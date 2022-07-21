import React, { Component } from 'react';
import {Button, Form, Container} from "react-bootstrap";
 import axios from "axios";
import NavBar from './NavBar.js';
import "./styles.css";
export default class addsign extends Component {
    constructor(props){
        super(props)
        this.state={
             member_id:null,
             Message:null,
             Date:null
             
        }
        
        this.changeCap=this.changeCap.bind(this);
        this.changedate=this.changedate.bind(this);
        this.add=this.add.bind(this);
        this.addout=this.addout.bind(this);
     
      }
   
      addout(e){
        e.preventDefault();
        if(this.state.Date){
        
        axios({
            method: 'post',
            url: 'HR/AddSignOut',
            data: {
              member_id:this.state.member_id,
              year:JSON.parse(JSON.stringify(this.state.Date).substring(1,5)),
              day:(this.state.Date).split("-")[2].split("T")[0],
              month:(this.state.Date).split("-")[1],
              year:(this.state.Date).split("-")[0],
              hour:(this.state.Date).split("-")[2].split("T")[1].split(":")[0]
            },
            params:{
                id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
            },
            headers:{
              "auth-token":sessionStorage.getItem("token")
          }
          }).then(res=>{
              this.setState({
                  Message:res.data
              });
                console.log(res.data);
                
          }).catch(err=>{
            this.setState({
                Message:err.response.data.msg
            });
          })
        }
        else {
          this.setState({
            Message:"Please specify Date"
        });
        }
   
      }
      add(e){
        e.preventDefault();
          if(this.state.Date){
       
        //axios.defaults.headers.common["auth-token"]=sessionStorage.getItem("token");
        axios({
            method: 'post',
            url: 'HR/AddSignIn',
            data: {
                member_id:this.state.member_id,
                  year:JSON.parse(JSON.stringify(this.state.Date).substring(1,5)),
                  day:(this.state.Date).split("-")[2].split("T")[0],
                  month:(this.state.Date).split("-")[1],
                  year:(this.state.Date).split("-")[0],
                  hour:(this.state.Date).split("-")[2].split("T")[1].split(":")[0]
            
            },
            params:{
                id:JSON.parse(sessionStorage.getItem("loggeduser"))._id
            },
            headers:{
                "auth-token":sessionStorage.getItem("token")
            }
          }).then(res=>{
              this.setState({
                  Message:res.data
              });
                console.log(res.data);
                
          }).catch(err=>{
            this.setState({
                Message:err.response.data.msg
            });
          })
        }
        else{
          this.setState({
            Message:"please specify date"
        });
        }
   
      }
    
        changeCap(e){
            this.setState({
                member_id:e.target.value
            })
        }
        changedate(e){
        
          this.setState({
              Date:e.target.value
          })
      }
  
    render() {
      if(JSON.parse(sessionStorage.getItem("loggeduser")).HOD===true ||
      JSON.parse(sessionStorage.getItem("loggeduser")).CC===true || JSON.parse(sessionStorage.getItem("loggeduser")).CI===true ||JSON.parse(sessionStorage.getItem("loggeduser")).TA===true  ){
       return(
       <h1>Sorry Can't Access this Page</h1>)
     }
     else{
        return (
            <div>
<NavBar/>              <Container>
            <Form className="form">
  <Form.Group>
    <Form.Label>Staff Member ID </Form.Label>
    <Form.Control  placeholder="ac-4" onChange={this.changeCap}/>
  </Form.Group>
  <Form.Group>
    <Form.Label>Specify Date</Form.Label>
    <Form.Control type="datetime-local" placeholder="ac-4" onChange={this.changedate}/>
  </Form.Group>
  <Button  style={{backgroundColor:'#0b1b3f'}} className="move" variant="primary" type="submit" onClick={this.add}>
    Add Sign In
  </Button>
  <Button  style={{backgroundColor:'#0b1b3f'}} className="move" variant="primary" type="submit" onClick={this.addout}>
    Add Sign Out
  </Button>
</Form>
<div ng-show="Message == null">
<Form.Text className="text-muted">
{this.state.Message}
    </Form.Text>
    </div>
</Container>
</div> 
        )
    }
  }
}
