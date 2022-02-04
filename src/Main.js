import React, { Component } from "react";
import {
  Route,
} from "react-router-dom";

import Question from "./Question";
import Login from "./Login"

// import useSWR from "swr"

// function getLogin() {
//   return fetch('/login ')
// }

// const {data, error} = useSWR("loginReq", getLogin)

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.loginHandler = this.loginHandler.bind(this)
    this.state = {isLoggedIn: false};
  }

  loginHandler() {
    this.setState({ isLoggedIn: true });
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
              ? <Question />
              : <Login action={this.loginHandler}/>
            }
          </div>
        </div>
    );
  }
}


 
export default Main;