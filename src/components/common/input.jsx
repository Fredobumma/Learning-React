import React from "react";

const Input = ({ id, label, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input id={id} className="form-control" {...rest} />
      {error && <div className="invalid-input">{error}</div>}
    </div>
  );
};

export default Input;
