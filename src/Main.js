import React, { Component } from "react";
import axios from 'axios';
import {
  Route,
} from "react-router-dom";

import Question from "./Question";
import Login from "./Login"

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.loginHandler = this.loginHandler.bind(this)
    this.state = {isLoggedIn: false,
                  loginAttemptFail: false,
                  currentQuestion: null};
  }

  //Pass this function to Question class to update parent state from child class
  setQuestion(question) {
    this.setState({
        currentQuestion:question
    })
  }

  //Handle login post request and get the first question request after clicking login
  loginHandler() {
    axios({
      //make POST request to login
      method:"post", 
      url:"http://localhost:5000/login"
    }).then(res => {//post request successed
        //send GET request to retrieve question
        axios({
        method:"get", url:"http://localhost:5000/question"
        }).then(res => {
          this.setState({
            currentQuestion:res.data
          });
        }).catch(Error => {
          console.log(Error); //handle Error for get question request
        });
        //set isLoggedIn state to true, loginAttemptFail to false
        this.setState({ isLoggedIn: true, loginAttemptFail:false });
      }).catch(Error => {
        console.log(Error) //handle error for post login request
        this.setState({loginAttemptFail: true });
      })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
        <div>
          <h1>Main page</h1>
          <ul className="header">
            
          </ul>
          <div className="content">
            { isLoggedIn
              ? <Question getQuestion={this.setQuestion.bind(this)} currentQuestion={this.state.currentQuestion}/>
              : <Login action={this.loginHandler} loginAttemptFail={this.state.loginAttemptFail}/>
            }
          </div>
        </div>
    );
  }
}


 
export default Main;