import React, { Component } from "react";

class Login extends Component {
  
  // constructor(props) {
  //   super(props)
  // }
  

  render() {
    return (
      <div>
        <h2>Login</h2>
        <button onClick={this.props.action}>Login Button</button>
 
        <p>This is login page</p>
      </div>
    );
  }
}
 
export default Login;