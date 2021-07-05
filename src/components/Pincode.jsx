import React from "react";

const Pincode = ({ pincode, onPincodeChange, onPincodeSubmit }) => {
  return (
    <form onSubmit={onPincodeSubmit}>
      <div className="input">
        <label>Pincode</label>
        <input type="text" value={pincode} onChange={onPincodeChange} />
      </div>
      <button type="submit">Get Centers</button>
    </form>
  );
};

export default Pincode;
