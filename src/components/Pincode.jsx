import React from "react";

const Pincode = ({ pincode, onPincodeChange, onPincodeSubmit }) => {
  return (
    <form onSubmit={onPincodeSubmit}>
      <div>
        <label htmlFor="text-input">Pincode</label>
        <input
          type="text"
          className="input"
          id="text-input"
          placeholder="Enter your PIN"
          value={pincode}
          onChange={onPincodeChange}
        />
      </div>
      <button type="submit">Get Centers</button>
    </form>
  );
};

export default Pincode;
