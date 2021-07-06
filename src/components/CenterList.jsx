import React from "react";
import Center from "./Center";
import "../styles/center-styles.scss";

const CenterList = ({ centers }) => {
  return centers.length ? (
    <div>
      <span style={{ fontSize: "22px", fontWeight: "bold" }}>
        List of Centers
      </span>
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
            fee_type={center.fee_type}
            dose1_capacity={center.available_capacity_dose1}
            dose2_capacity={center.available_capacity_dose2}
            fee={center.fee}
            minAge={center.min_age_limit}
            vaccine={center.vaccine}
            slots={center.slots}
          />
        ))}
      </div>
    </div>
  ) : null;
};

export default CenterList;
