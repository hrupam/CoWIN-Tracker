import React from "react";

const Center = ({
  name,
  address,
  blockname,
  pin,
  from_time,
  to_time,
  dose1_capacity,
  dose2_capacity,
}) => {
  return (
    <div className="center" style={{ textAlign: "center" }}>
      <span>Name: {name}</span>
      <span>Address: {address}</span>
      <span>Block: {blockname}</span>

      <span>Pincode: {pin}</span>

      <span>
        Timings: {from_time} to {to_time}
      </span>
      <span>Dose 1 availability: {dose1_capacity}</span>
      <span>Dose 2 availability: {dose2_capacity}</span>
    </div>
  );
};

export default Center;
