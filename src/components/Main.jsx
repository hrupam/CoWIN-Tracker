import axios from "axios";
import React, { Component } from "react";
import StatesDropdown from "./StatesDropdown";
import DistrictsDropdown from "./DistrictsDropdown";
import CenterList from "./CenterList";
import Pincode from "./Pincode";
import date from "../dateGenerator";
import "../styles/style.scss";

export class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      states: [],
      selectedState: -1,
      districts: [],
      selectedDistrict: -1,
      pincode: "",
      centers: [],
      errorMsg: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((response) =>
        this.setState({ states: response.data.states, errorMsg: "" })
      )
      .catch((error) => this.setState({ errorMsg: `${error}` }));
  }

  handleStateChange = (event) => {
    this.setState({ selectedState: event.target.value, pincode: "" }, () => {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${this.state.selectedState}`
        )
        .then((response) =>
          this.setState({ districts: response.data.districts })
        )
        .catch((error) => this.setState({ errorMsg: `${error}` }));
    });
  };

  handleDistrictChange = (event) => {
    this.setState({ selectedDistrict: event.target.value, pincode: "" }, () => {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrict}&date=${date}`
        )
        .then((response) =>
          this.setState({ centers: response.data.sessions, errorMsg: "" })
        )
        .catch((error) => this.setState({ errorMsg: `${error}` }));
    });
  };

  handlePincodeSubmit = (event) => {
    event.preventDefault();
    this.setState({ selectedState: -1, selectedDistrict: -1 });
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${this.state.pincode}&date=${date}`
      )
      .then((response) =>
        this.setState({ centers: response.data.sessions, errorMsg: "" })
      )
      .catch((error) =>
        this.setState({
          errorMsg: `${error}`,
          centers: [],
        })
      );
  };

  render() {
    const {
      states,
      selectedState,
      districts,
      selectedDistrict,
      pincode,
      centers,
      errorMsg,
    } = this.state;
    return (
      <div>
        <div className="dropdowns">
          <div className="states-districts">
            <StatesDropdown
              onStateChange={this.handleStateChange}
              states={states}
              selectedState={selectedState}
            />
            <DistrictsDropdown
              onDistrictChange={this.handleDistrictChange}
              districts={districts}
              selectedDistrict={selectedDistrict}
            />
          </div>
          <span className="or">OR</span>
          <div className="pincode">
            <Pincode
              onPincodeChange={(event) =>
                this.setState({ pincode: event.target.value })
              }
              pincode={pincode}
              onPincodeSubmit={this.handlePincodeSubmit}
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
}

export default Main;
