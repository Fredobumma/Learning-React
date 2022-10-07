import React from "react";

const DropDownlist = ({ id, label, error, options, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select id={id} {...rest} className="form-control">
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <div className="invalid-input">{error}</div>}
    </div>
  );
};

export default DropDownlist;
