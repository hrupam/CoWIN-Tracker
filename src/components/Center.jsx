import React from "react";

const Center = ({
  name,
  address,
  blockname,
  pin,
  from_time,
  to_time,
  dose1_capacity,
  dose2_capacity,
  fee_type,
  fee,
  minAge,
  vaccine,
  slots,
}) => {
  return (
    <div className="card">
      {/* <div className="card-image"></div> */}
      <div className="card-text">
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bolder",
            color: "#8D3DAF",
            textTransform: "uppercase",
          }}
        >
          {fee_type}
          {parseInt(fee) ? (
            <span style={{ margin: "8px" }}>&#8377;{fee}</span>
          ) : null}
        </div>
        <span className="date">
          Time: {from_time} - {to_time}
        </span>
        <h2>{name}</h2>
        <p>
          Location:{" "}
          <span style={{ fontWeight: "bold", color: "black" }}>{address}</span>
        </p>
        <p>
          Block:{" "}
          <span style={{ fontWeight: "bold", color: "black" }}>
            {blockname}
          </span>
        </p>
        <p>
          Pincode:{" "}
          <span style={{ fontWeight: "bold", color: "black" }}>{pin}</span>
        </p>
        <p>
          Vaccine:{" "}
          <span style={{ fontWeight: "bold", color: "black" }}>{vaccine}</span>
        </p>
        <p style={{ marginTop: "8px" }}>
          Slots
          {slots.map((slot, index) => (
            <span
              key={index}
              style={{
                fontWeight: "bold",
                color: "black",
                display: "block",
              }}
            >
              {slot}
            </span>
          ))}
        </p>
      </div>

      <div className="card-stats">
        <div className="stat">
          <div className="value">{dose1_capacity}</div>
          <div className="type">Dose 1 Availability</div>
        </div>
        <div className="stat border">
          <div className="value">{dose2_capacity}</div>
          <div className="type">Dose 2 Availability</div>
        </div>
        <div className="stat">
          <div className="value">{minAge}</div>
          <div className="type">Minimum Age Limit</div>
        </div>
      </div>
    </div>
  );
};

export default Center;
