import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdAirlineSeatReclineNormal } from "react-icons/md";

const RoadCard = (props) => {
    const trip = props.trip;
    const startDate = new Date(trip.startDate);
    const segments = trip.segments;
    const departure = segments[0].start;
    const arrival = segments[segments.length - 1].end;
    const driver = trip.driver;
    // Const with all segments without the first and last one
    //const middleSegments = segments.slice(1, segments.length - 1);

  return (
    <div className="road-card">
        <div className="road-info">
            <div className="road">
<div>
<p>{`${startDate.getDate()}/${startDate.getMonth()}`}</p>
<ul className="steps steps-vertical">
                <li data-content="" className="step step-primary">

                <div>
                <span>{`${startDate.getHours()}:${startDate.getMinutes()}`}</span>

                <div className="road-left-details">
                    <p>{trip.estimatedTime}</p>
                </div>
                    
                    <p>{departure.name}</p>
                </div>
                
                </li>
                <li data-content="" className="step step-primary">
                <div>
                    <span>{trip.arrivalTime}</span>
                    <p>{arrival.name}</p>
                </div>
                </li>
            </ul>
</div>
            
            <div className="road-details">
                <p>{trip.price} €</p>
                <div className="seat">
                <MdAirlineSeatReclineNormal />
                <p>{props.trip.seats} places</p>
                </div>
            </div>
            </div>
            <div className="driver-info">
            <div className="driver">
                <div>
                <p>{driver.userName}</p>
                <span>{driver.age} ans</span>
                </div>
                <IoPersonCircleSharp />
            </div>
            </div>
        </div>
    </div>
  );
};

export default RoadCard;
