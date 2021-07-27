import React from "react";
// import { date } from "../dateGenerator";

const Header = () => {
  return (
    <div className="header">
      <span style={{ fontSize: "17px" }}>Made with ❤️ by Rupam Hari</span>
      <span className="title">CoWIN Tracker</span>
      {/* <span className="date">
        Date: <span style={{ fontWeight: "bold" }}>{date}</span>
      </span> */}
    </div>
  );
};

export default Header;
