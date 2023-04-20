import React from "react";
import { useState } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdAirlineSeatReclineNormal } from "react-icons/md";

const RoadCard = (props) => {
  const trip = props.trip;
  const [demand, setDemand] = useState(null);
  const startDate = new Date(trip.startDate);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = startDate.toLocaleDateString("fr-FR", options);
  const parts = trip.estimatedDuration.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const estimatedDuration = new Date(trip.startDate);
  estimatedDuration.setHours(hours + 1);
  estimatedDuration.setMinutes(minutes);
  const arrivalTime = new Date(
    startDate.getTime() + estimatedDuration.getTime()
  );
  const segments = trip.segments;
  const departure = segments[0].start;
  const arrival = segments[segments.length - 1].end;
  const driver = trip.driver;
  // Const with all segments without the first and last one
  //const middleSegments = segments.slice(1, segments.length - 1);
    const handleRequestCreation = () => {
    const request = {
      "segmentIds": [
        segments[0].id,
      ]
    }
    fetch(`http://back.papotcar.ismadev.fr/api/request/${trip.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.message) {
          props.getDemandError(response.message);
        }
        if (response.status === "pending") {
          console.log('passed');
          props.demandCreated();
        }
      });
  };


  return (
    <div className="road-card">
      <div className="road-info">
        <div className="road">
          <div>
            {/* <p>{formattedDate}</p> */}
            <ul className="steps steps-vertical">
              <li data-content="" className="step step-primary">
                <div>
                  <div className="road-left-details">
                    <span>{`${startDate.getHours()}:${startDate.getMinutes()}`}</span>
                    <p>{trip.estimatedDuration}</p>
                  </div>

                  <p>{departure.name}</p>
                </div>
              </li>
              <li data-content="" className="step step-primary">
                <div>
                  <span>{`${arrivalTime.getHours()}:${arrivalTime.getMinutes()}`}</span>
                  <p>{arrival.name}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="road-details">
            <p>{trip.price} €</p>
            <div className="seat">
              <MdAirlineSeatReclineNormal />
              <p>{props.trip.seats} places disponibles</p>
            </div>
          </div>
        </div>
        <div className="driver-info">
          <div className="driver">
            <div>
              <label>{formattedDate}</label>
              <p>
                {driver.firstname} {driver.lastname}
              </p>
              <span>{driver.age}</span>
            </div>
            <IoPersonCircleSharp />
          </div>
          <div className="join-trip">
            <button onClick={handleRequestCreation} className="btn join-btn">Rejoindre</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadCard;
