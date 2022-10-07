import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form className="mt-5 w-75" onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "text", "username")}
          {this.renderInput(
            "password",
            "Password",
            "password",
            "current-password"
          )}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }

  doSubmit() {
    console.log("submitted");
  }
}

export default LoginForm;
