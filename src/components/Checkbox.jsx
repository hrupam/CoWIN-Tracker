import React from "react";
import "../styles/checkbox-styles.scss";

const Checkbox = ({ vaccine, checked, handleChange }) => {
  return (
    <div className="checkbox-wrapper-47">
      <input
        type="checkbox"
        name={vaccine}
        id={vaccine}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={vaccine}>{vaccine}</label>
    </div>
  );
};

export default Checkbox;
