import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import DropDownlist from "./dropDownList";

class HooksForm extends Component {
  renderInput = (name, label, type, autoComplete, autoFocus) => {
    return (
      <Input
        id={name}
        label={label}
        value={this.data[name]}
        type={type}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        error={this.errors[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderDropDownList = (name, label, ...rest) => {
    return (
      <DropDownlist
        id={name}
        label={label}
        value={this.data[name].name || this.data[name]}
        error={this.errors[name]}
        onChange={this.handleChange}
        options={rest}
      />
    );
  };

  renderButton = (label) => {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };

  validateProperty = (name, value) => {
    const dataObj = { [name]: value };
    const schemaObj = { [name]: this.schema[name] };
    const { error } = Joi.validate(dataObj, schemaObj);

    return error ? error.details[0].message : null;
  };

  validate = () => {
    const errors = {};
    const dataObj = { ...this.data };
    const options = { abortEarly: false };
    const { error } = Joi.validate(dataObj, this.schema, options);

    if (error) {
      error.details.map((err) => (errors[err.path[0]] = err.message));
      return errors;
    }
    return null;
  };

  handleChange = ({ currentTarget: { id: name, value } }) => {
    const dataObj = { ...this.data };
    const errorsObj = { ...this.errors };
    const errorMessage = this.validateProperty(name, value);

    dataObj[name] = value;

    if (errorMessage) errorsObj[name] = errorMessage;
    else delete errorsObj[name];

    this.setData(dataObj);
    this.setErrors(errorsObj);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate() || {};
    this.setErrors(errors);
    this.doSubmit();
  };
}

export default HooksForm;
