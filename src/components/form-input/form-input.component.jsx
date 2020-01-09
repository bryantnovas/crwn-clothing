import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => (
  <div className="group">
    <input {...otherProps} className="form-input" />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
