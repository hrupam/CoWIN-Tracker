import React, { memo, useEffect, useMemo, useState } from "react";
import Center from "./Center";
import "../styles/center-styles.scss";
import Checkbox from "./Checkbox";

const CenterList = ({ centers }) => {
  const [vaccineFilters, setVaccineFilters] = useState([]);

  useEffect(() => {
    const vaccineTypes = [];
    centers.forEach((center) => {
      if (!vaccineTypes.includes(center.vaccine)) {
        vaccineTypes.push(center.vaccine);
      }
    });

    const vaccineFilters = [];
    vaccineTypes.forEach((vaccine) => {
      vaccineFilters.push({ vaccine, checked: false });
    });
    setVaccineFilters(vaccineFilters);
  }, [centers]);

  const handleCheckboxChange = (e) => {
    const { name: vaccine, checked } = e.target;

    const modifiedVaccineFilters = vaccineFilters.map((vaccineFilter) => {
      if (vaccineFilter.vaccine === vaccine) vaccineFilter.checked = checked;
      return vaccineFilter;
    });
    setVaccineFilters(modifiedVaccineFilters);
  };

  const filterCenters = useMemo(() => {
    let filterCenters = centers;

    let falseCount = 0;
    vaccineFilters.forEach((vaccineFilter) => {
      if (!vaccineFilter.checked) falseCount++;
    });
    if (falseCount === vaccineFilters.length || falseCount === 0)
      return filterCenters;

    filterCenters = filterCenters.filter((center) => {
      let flag = false;
      vaccineFilters.forEach((vaccineFilter) => {
        if (vaccineFilter.vaccine === center.vaccine)
          flag = vaccineFilter.checked;
      });
      return flag;
    });
    return filterCenters;
  }, [vaccineFilters, centers]);

  return (
    !!centers.length && (
      <>
        <div className="filters-container">
          {vaccineFilters.map((vaccineFilter, index) => (
            <Checkbox
              key={index}
              vaccine={vaccineFilter.vaccine}
              checked={vaccineFilter.checked}
              handleChange={handleCheckboxChange}
            />
          ))}
        </div>

        <div>
          <span style={{ fontSize: "22px", fontWeight: "bold" }}>
            List of Centers
          </span>
          <div className="centers-container">
            {filterCenters.map((center, index) => (
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
      </>
    )
  );
};

export default memo(CenterList);
