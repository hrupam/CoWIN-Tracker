import React, { useState, useEffect, useReducer } from "react";
import StatesDropdown from "./StatesDropdown";
import DistrictsDropdown from "./DistrictsDropdown";
import CenterList from "./CenterList";
import Pincode from "./Pincode";
import { dateFormatter, dateReverser } from "../utility/dateGenerator";
import "../styles/style.scss";
import DatePicker from "./DatePicker";
import Loader from "./reusableComponents/Loader";
import CowinApi from "../api/CowinApi";

const initialState = {
  states: [],
  districts: [],
  centers: [],
  errorMsg: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_STATES_SUCCESS":
      return {
        states: action.payload,
        districts: [],
        centers: [],
        errorMsg: "",
      };
    case "FETCH_STATES_FAILURE":
      return {
        states: [],
        districts: [],
        centers: [],
        errorMsg: "Error retrieving data",
      };
    case "FETCH_DISTRICTS_SUCCESS":
      return {
        ...state,
        districts: action.payload,
        centers: [],
        errorMsg: "",
      };
    case "FETCH_DISTRICTS_FAILURE":
      return {
        ...state,
        centers: [],
        errorMsg: "Error retrieving data",
      };
    case "FETCH_CENTERS_SUCCESS":
      return {
        ...state,
        centers: action.payload,
        errorMsg: "",
      };
    case "FETCH_CENTERS_FAILURE":
      return {
        ...state,
        centers: [],
        errorMsg: "Error retrieving data",
      };
    case "FETCH_CENTERS_WITH_PINCODE_SUCCESS":
      return {
        ...state,
        districts: [],
        centers: action.payload,
        errorMsg: "",
      };
    case "FETCH_CENTERS_WITH_PINCODE_FAILURE":
      return {
        ...state,
        centers: [],
        districts: [],
        errorMsg: "Error retrieving data",
      };
    case "DATE_CHANGE": {
      return {
        ...state,
        centers: [],
      };
    }
    default:
      return state;
  }
};

const MainComponent = () => {
  const [selectedState, setSelectedState] = useState(-1);
  const [selectedDistrict, setSelectedDistrict] = useState(-1);
  const [pincode, setPincode] = useState("");
  const [selectedDate, setSelectedDate] = useState(dateFormatter(new Date()));
  const [loading, setLoading] = useState(true);

  const [state, dispatch] = useReducer(reducer, initialState);

  //   ON FIRST RENDER
  useEffect(() => {
    CowinApi.getStates()
      .then((response) => {
        setLoading(false);
        dispatch({
          type: "FETCH_STATES_SUCCESS",
          payload: response.data.states,
        });
      })
      .catch((err) => {
        setLoading(false);
        dispatch({ type: "FETCH_STATES_FAILURE" });
      });
  }, []);

  //   ON STATE CHANGE
  useEffect(() => {
    setLoading(true);
    selectedState !== -1 &&
      CowinApi.getDistricts(selectedState)
        .then((response) => {
          setLoading(false);
          dispatch({
            type: "FETCH_DISTRICTS_SUCCESS",
            payload: response.data.districts,
          });
        })
        .catch((err) => {
          setLoading(false);
          dispatch({ type: "FETCH_DISTRICTS_FAILURE" });
        });
  }, [selectedState]);

  //   ON DISTRICT CHANGE, DATE CHANGE
  useEffect(() => {
    const date = dateReverser(selectedDate);
    setLoading(true);
    selectedDistrict !== -1 &&
      CowinApi.getCenters(selectedDistrict, date)
        .then((response) => {
          setLoading(false);
          dispatch({
            type: "FETCH_CENTERS_SUCCESS",
            payload: response.data.sessions,
          });
        })
        .catch((err) => {
          setLoading(false);
          dispatch({ type: "FETCH_CENTERS_FAILURE" });
        });
  }, [selectedDistrict, selectedDate]);

  const handlePincodeSubmit = (event) => {
    event.preventDefault();
    setSelectedState(-1);
    setSelectedDistrict(-1);
    setLoading(true);
    const date = dateReverser(selectedDate);
    CowinApi.getCentersByPincode(pincode, date)
      .then((response) => {
        setLoading(false);
        dispatch({
          type: "FETCH_CENTERS_WITH_PINCODE_SUCCESS",
          payload: response.data.sessions,
        });
      })
      .catch((err) => {
        setLoading(false);
        dispatch({ type: "FETCH_CENTERS_WITH_PINCODE_FAILURE" });
      });
  };

  return (
    <div>
      <Loader loading={loading} />

      <DatePicker
        date={selectedDate}
        handleOnChange={(e) => {
          dispatch({ type: "DATE_CHANGE" });
          setSelectedDate(e.target.value);
        }}
      />

      <div className="dropdowns">
        <div className="states-districts">
          <StatesDropdown
            onStateChange={(event) => {
              setSelectedState(event.target.value);
              setPincode("");
            }}
            states={state.states}
            selectedState={selectedState}
          />
          <DistrictsDropdown
            onDistrictChange={(event) => {
              setSelectedDistrict(event.target.value);
              setPincode("");
            }}
            districts={state.districts}
            selectedDistrict={selectedDistrict}
          />
        </div>

        <span className="or">OR</span>

        <Pincode
          onPincodeChange={(event) => setPincode(event.target.value)}
          pincode={pincode}
          onPincodeSubmit={handlePincodeSubmit}
        />
      </div>

      <CenterList centers={state.centers} />

      {state.errorMsg ? (
        <div className="error-message">{state.errorMsg}</div>
      ) : null}
    </div>
  );
};

export default MainComponent;
