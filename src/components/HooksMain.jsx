import axios from "axios";
import React, { useState, useEffect } from "react";
import StatesDropdown from "./StatesDropdown";
import DistrictsDropdown from "./DistrictsDropdown";
import CenterList from "./CenterList";
import Pincode from "./Pincode";
import date from "../dateGenerator";
import "../styles/style.scss";

function HooksMain() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(-1);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(-1);
  const [pincode, setPincode] = useState("");
  const [centers, setCenters] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  //   ON FIRST RENDER
  useEffect(() => {
    console.log("first render");
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((response) => {
        setStates(response.data.states);
        setErrorMsg("");
      })
      .catch((error) => setErrorMsg(`${error}`));
  }, []);

  //   ON STATE CHANGE
  useEffect(() => {
    console.log("on state change");
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedState}`
      )
      .then((response) => setDistricts(response.data.districts))
      .catch((error) => setErrorMsg(`${error}`));
  }, [selectedState]);

  //   ON DISTRICT CHANGE
  useEffect(() => {
    console.log("on district change");
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${selectedDistrict}&date=${date}`
      )
      .then((response) => {
        setCenters(response.data.sessions);
        setErrorMsg("");
      })
      .catch((error) => setErrorMsg(`${error}`));
  }, [selectedDistrict]);

  const handlePincodeSubmit = (event) => {
    event.preventDefault();
    setSelectedDistrict(-1);
    setSelectedState(-1);
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`
      )
      .then((response) => {
        setCenters(response.data.sessions);
        setErrorMsg("");
      })
      .catch((error) => {
        setErrorMsg(`${error}`);
        setCenters([]);
      });
  };

  return (
    <div>
      <div className="dropdowns">
        <div className="states-districts">
          <StatesDropdown
            onStateChange={(event) => {
              setSelectedState(event.target.value);
              setPincode("");
            }}
            states={states}
            selectedState={selectedState}
          />
          <DistrictsDropdown
            onDistrictChange={(event) => {
              setSelectedDistrict(event.target.value);
              setPincode("");
            }}
            districts={districts}
            selectedDistrict={selectedDistrict}
          />
        </div>
        <span className="or">OR</span>
        <div className="pincode">
          <Pincode
            onPincodeChange={(event) => setPincode(event.target.value)}
            pincode={pincode}
            onPincodeSubmit={handlePincodeSubmit}
          />
        </div>
      </div>
      <CenterList centers={centers} />
      {errorMsg ? (
        <div className="error-message">
          <span style={{ display: "block" }}>Error retrieving data</span>
          {errorMsg}
        </div>
      ) : null}
    </div>
  );
}

export default HooksMain;
