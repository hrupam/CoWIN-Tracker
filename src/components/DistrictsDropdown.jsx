import React from "react";

const DistrictsDropdown = ({
  onDistrictChange,
  districts,
  selectedDistrict,
}) => {
  return districts.length ? (
    <div className="districts">
      <select value={selectedDistrict} onChange={onDistrictChange}>
        <option>Select District</option>
        {districts.map((district) => (
          <option key={district.district_id} value={district.district_id}>
            {district.district_name}
          </option>
        ))}
      </select>
    </div>
  ) : null;
};

export default DistrictsDropdown;
