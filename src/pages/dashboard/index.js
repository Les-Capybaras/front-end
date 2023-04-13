import "../../assets/style/page/dashboard.scss";
import { useState, useEffect }from "react";
import RoadCard from '../../components/dashboard/RoadCard';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

const Datepicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="dd/MM/yyyy"
      locale="fr"
    />
  );
};

export default function Dashboard() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetch(`http://back.papotcar.ismadev.fr/api/trips`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      return response.json();
      }
    )
    .then((response) => {
      console.log(response);
      setTrips(response);
    });
  }, []);


  return (
    <div className="">
      <div className="blue-container">
        <div className="destination">
          <div className="search">
            <h1 className="title">Où voulez-vous allez ?</h1>
            <div className="search-destination">
              <input
                type="text"
                placeholder="Départ"
                className="input input-ghost max-w-xs"
              />

              <input
                type="text"
                placeholder="Arrivé"
                className="input input-ghost max-w-xs"
              />

              {/* <input type="text" placeholder="Quand ?" className="input input-ghost max-w-xs" /> */}

              <Datepicker />

              <button className="search-btn btn">Rechercher</button>
            </div>
          </div>
        </div>
      </div>

      <div className="road-list">
        <div className="container-title-dashboardList">
          <p>Trajets qui pourrait vous intéresser</p>
          {trips.map((trip) => (
            <RoadCard trip={trip} key={trip.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
