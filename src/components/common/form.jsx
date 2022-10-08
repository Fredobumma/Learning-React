import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import DropDownlist from "./dropDownList";

class Form extends Component {
  state = { data: {}, errors: {} };

  renderInput(id, label, type, autoComplete, autoFocus) {
    const { data, errors } = this.state;

    return (
      <Input
        id={id}
        label={label}
        value={data[id]}
        type={type}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        error={errors[id]}
        onChange={this.handleChange}
      />
    );
  }

  renderDropDownList = (id, label, ...rest) => {
    const { data, errors } = this.state;
    return (
      <DropDownlist
        id={id}
        label={label}
        value={data[id]}
        error={errors[id]}
        options={rest}
        onChange={this.handleChange}
      />
    );
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  validateProperty(id, value) {
    const obj = { id: value };
    const schema = { id: this.schema[id] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  }

  validate() {
    const errors = {};
    const data = { ...this.state.data };
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, this.schema, options);

    if (error) {
      error.details.map((err) => (errors[err.path[0]] = err.message));
      return errors;
    }
    return null;
  }

  handleChange = ({ currentTarget: { id, value } }) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(id, value);

    data[id] = value;

    if (errorMessage) errors[id] = errorMessage;
    else delete errors[id];

    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate() || {};
    this.setState({ errors });
    if (Object.keys(errors).length) return;

    this.doSubmit();
  };
}

export default Form;
