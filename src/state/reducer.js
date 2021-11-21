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

export default reducer;
