import { useContext, useState, useEffect } from "react";
import AppContext from "../../context";
import RoadCard from "../../components/dashboard/RoadCard";
import RoadCardDriver from "../../components/dashboard/RoadCardDriver";


export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [countRoad, setCountRoad] = useState(0);

  const { currentUser } = useContext(AppContext);
  
  const now = new Date()
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    fetch(`http://back.papotcar.ismadev.fr/api/trips/available`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
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
            {/* {trips.map((trip) => (
              trip.driver.email == currentUser.user.email &&
              new Date(trip.startDate) < now &&
                  // console.log(new Date(trip.startDate))
                  // console.log(now)
                  <RoadCard trip={trip} key={trip.id} />
            ))} */}
            {trips.map((trip) => (
                trip.driver.email == currentUser.user.email &&
                new Date(trip.startDate).toDateString() === now.toDateString()
                && <RoadCardDriver trip={trip} key={trip.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="road-list">
          <div className="container-title-dashboardList">
            <p className="title">Trajets à venir</p>
            {/* {trips.map((trip) => (
              trip.driver.email != currentUser.user.email &&
              new Date(trip.startDate) > now &&
              <RoadCard trip={trip} key={trip.id} />
            ))} */}
            {trips.map((trip) => (
              trip.driver.email == currentUser.user.email &&
              new Date(trip.startDate) > now &&
              <RoadCardDriver trip={trip} key={trip.id} />
            ))}
          </div>
        </div>
        <div className="road-list">
          <div className="container-title-dashboardList">
            <p className="title">Trajets passé</p>
            {trips.map((trip) => (
              trip.driver.email == currentUser.user.email &&
              new Date(trip.startDate) < now &&
              <RoadCardDriver trip={trip} key={trip.id} />
            ))}
            
          </div>
        </div>
    </div>
  );
}
