import React from "react";

const StatesDropdown = ({ onStateChange, states, selectedState }) => {
  return (
    <div className="states">
      <label>State</label>
      <div className="select">
        <select value={selectedState} onChange={onStateChange}>
          <option>Select State</option>
          {states.map((state) => (
            <option key={state.state_id} value={state.state_id}>
              {state.state_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StatesDropdown;
