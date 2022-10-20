import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";
import { getHooks } from "./../utilities/getHooks";

class LoginForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("E-mail"),
    password: Joi.string().required().label("Password"),
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form className="mt-5 w-75" onSubmit={this.handleSubmit}>
          {this.renderInput("email", "E-mail", "text", "email", "on")}
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

  doSubmit = async () => {
    try {
      const { data } = await login(this.state.data);
      localStorage.setItem("token", data);
      this.props.navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = error.response.data;
        this.setState({ errors });
      }
    }
  };
}

export default getHooks(LoginForm);
