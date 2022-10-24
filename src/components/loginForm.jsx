import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as auth from "../services/authService";
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

  getErrors(error) {
    const { data, errors: errorsObj } = this.state;
    const errors = { ...errorsObj };
    const errorsProperty = Object.keys(data).filter((el) =>
      error.response.data.includes(el)
    )[0];
    errors[errorsProperty] = error.response.data;
    return errors;
  }

  doSubmit = async () => {
    try {
      const { data } = await auth.login(this.state.data);
      auth.loginWithJwt(data);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = this.getErrors(error);
        this.setState({ errors });
      }
    }
  };
}

export default getHooks(LoginForm);
