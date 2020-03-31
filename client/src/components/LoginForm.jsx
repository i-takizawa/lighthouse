import React, { Component } from "react";
// import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
// import "./Login.css";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
    <div>
      <form action="/login" method="post">
        <div>
          <label>Username:</label>
          <input type="text" name="username"/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password"/>
        </div>
        <div>
            <input type="submit" value="Log In"/>
        </div>
      </form>
      <div>Don't have an account? <a href="/register">Sign up here</a> </div>
    </div>
    );
  }
}