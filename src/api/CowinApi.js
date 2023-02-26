import axios from "axios";

class CowinApi {
  getStates() {
    return axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/states");
  }
  getDistricts(state) {
    return axios.get(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state}`
    );
  }
  getCenters(district, date) {
    return axios.get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district}&date=${date}`
    );
  }
  getCentersByPincode(pincode, date) {
    return axios.get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`
    );
  }
}

const cowinApi = new CowinApi();

export default cowinApi;
