import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ loading }) => {
  return (
    <div style={{ marginTop: "3px" }}>
      <ClipLoader loading={loading} color={"#387d9cc9"} size={45} />
    </div>
  );
};

export default Loader;
