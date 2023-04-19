import { useState, useEffect } from "react";
import RoadCard from "../../components/dashboard/RoadCard";
import RoadCardDriver from "../../components/dashboard/RoadCardDriver";


export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch(`http://back.papotcar.ismadev.fr/api/trips/available`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setTrips(response);
      });
  }, []);

  return (
    <div className="">
      <div className="blue-container">
        <div className="destination"></div>
        <div className="road-list">
          <div className="container-title-dashboardList">
            <h1 className="title">Trajets en cours</h1>
            {trips.map((trip) => (
              <RoadCard trip={trip} key={trip.id} />
            ))}
            {trips.map((trip) => (
              <RoadCardDriver trip={trip} key={trip.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="road-list">
          <div className="container-title-dashboardList">
            <p className="title">Trajets à venir</p>
            {trips.map((trip) => (
              <RoadCard trip={trip} key={trip.id} />
            ))}
            {trips.map((trip) => (
              <RoadCardDriver trip={trip} key={trip.id} />
            ))}
          </div>
        </div>
        <div className="road-list">
          <div className="container-title-dashboardList">
            <p className="title">Trajets passé</p>
            {trips.map((trip) => (
              <RoadCard trip={trip} key={trip.id} />
            ))}
            
          </div>
        </div>
    </div>
  );
}
