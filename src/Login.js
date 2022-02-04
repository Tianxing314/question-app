import React, { Component } from "react";

class Login extends Component {
  
  constructor(props) {
    super(props)
  }
  
  
  render() {
    return (
      <div>
        <h2>Login</h2>
        { this.props.loginAttemptFail
          ? <div class="loginMessage">Fail to login, please try again</div>
          : <div class="loginMessafe"></div>
        }
        {(this.props.loginAttempt) && (<div>error</div>)}
        <button onClick={this.props.action}>Login</button>
 
      </div>
    );
  }
}
 
export default Login;