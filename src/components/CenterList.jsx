import React from "react";
import Center from "./Center";

const CenterList = ({ centers }) => {
  return centers.length ? (
    <div className="centers-container">
      {centers.map((center, index) => (
        <Center
          key={index + 1}
          name={center.name}
          address={center.address}
          blockname={center.block_name}
          pin={center.pincode}
          from_time={center.from}
          to_time={center.to}
          dose1_capacity={center.available_capacity_dose1}
          dose2_capacity={center.available_capacity_dose2}
        />
      ))}
    </div>
  ) : null;
};

export default CenterList;
