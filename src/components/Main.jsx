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
      error: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((response) => this.setState({ states: response.data.states }))
      .catch((error) =>
        this.setState({ error: `Error retrieving data,message ${error}` })
      );
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
        .catch((error) =>
          this.setState({ error: `Error retrieving data,message ${error}` })
        );
    });
  };

  handleDistrictChange = (event) => {
    this.setState({ selectedDistrict: event.target.value, pincode: "" }, () => {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrict}&date=${date}`
        )
        .then((response) => this.setState({ centers: response.data.sessions }))
        .catch((error) =>
          this.setState({ error: `Error retrieving data,message ${error}` })
        );
    });
  };

  handlePincodeChange = (event) => {
    this.setState({ pincode: event.target.value });
  };

  handlePincodeSubmit = (event) => {
    event.preventDefault();
    this.setState({ selectedState: -1, selectedDistrict: -1 });
    axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${this.state.pincode}&date=${date}`
      )
      .then((response) => this.setState({ centers: response.data.sessions }))
      .catch((error) =>
        this.setState({ error: `Error retrieving data,message ${error}` })
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
          <span>OR</span>
          <div className="pincode">
            <Pincode
              onPincodeChange={this.handlePincodeChange}
              pincode={pincode}
              onPincodeSubmit={this.handlePincodeSubmit}
            />
          </div>
        </div>
        <CenterList centers={centers} />
      </div>
    );
  }
}

export default Main;
