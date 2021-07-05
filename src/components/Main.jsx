import axios from "axios";
import React, { Component } from "react";
import StatesDropdown from "./StatesDropdown";
import DistrictsDropdown from "./DistrictsDropdown";
import Center from "./Center";
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
      centers: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((response) =>
        this.setState({ states: response.data.states }, () =>
          console.log("STATES", this.state.states)
        )
      );
  }

  handleStateChange = (event) => {
    this.setState({ selectedState: event.target.value }, () => {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${this.state.selectedState}`
        )
        .then((response) =>
          this.setState({ districts: response.data.districts }, () =>
            console.log("DISTRICTS", this.state.districts)
          )
        );
    });
  };

  handleDistrictChange = (event) => {
    this.setState({ selectedDistrict: event.target.value }, () => {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${this.state.selectedDistrict}&date=${date}`
        )
        .then((response) =>
          this.setState({ centers: response.data.sessions }, () =>
            console.log("CENTERS", this.state.centers)
          )
        );
    });
  };

  render() {
    const { states, selectedState, districts, selectedDistrict, centers } =
      this.state;
    return (
      <div>
        <StatesDropdown
          onStateChange={this.handleStateChange}
          states={states}
          selectedState={selectedState}
        />

        {districts.length ? (
          <DistrictsDropdown
            onDistrictChange={this.handleDistrictChange}
            districts={districts}
            selectedDistrict={selectedDistrict}
          />
        ) : null}

        {centers.length ? (
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
        ) : null}
      </div>
    );
  }
}

export default Main;
