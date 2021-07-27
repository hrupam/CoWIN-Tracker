import React from "react";

const DatePicker = ({ date, handleOnChange }) => {
  return (
    <div className="date-picker">
      <label htmlFor="date-input">Date</label>
      <input
        type="date"
        className="input"
        id="date-input"
        value={date}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default DatePicker;
