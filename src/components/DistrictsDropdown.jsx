import React from "react";

const DistrictsDropdown = ({
  onDistrictChange,
  districts,
  selectedDistrict,
}) => {
  return (
    <div>
      <select value={selectedDistrict} onChange={onDistrictChange}>
        <option>Select District</option>
        {districts.map((district) => (
          <option key={district.district_id} value={district.district_id}>
            {district.district_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DistrictsDropdown;
