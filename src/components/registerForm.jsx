import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
import * as auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().max(50).required().label("Name"),
    email: Joi.string().max(30).email().required().label("E-mail"),
    password: Joi.string().min(5).max(30).required().label("Password"),
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form className="mt-5 w-75" onSubmit={this.handleSubmit}>
          {this.renderInput("email", "E-mail", "email", "email", "on")}
          {this.renderInput("name", "Name", "text", "name")}
          {this.renderInput("password", "Password", "password", "new-password")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }

  doSubmit = async () => {
    try {
      const { headers } = await register(this.state.data);
      auth.loginWithJwt(headers["x-auth-token"]);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };
}

export default RegisterForm;
