import "../../assets/style/page/dashboard.scss";
import { useState, useEffect }from "react";
import RoadCard from '../../components/dashboard/RoadCard';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

const Datepicker = (props) => {
  return (
    <DatePicker
      selected={props.startDate}
      onChange={(date) => props.setStartDate(date)}
      dateFormat="dd/MM/yyyy"
      locale="fr"
    />
  );
};

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [searchStart, setSearchStart] = useState("");
  const [searchEnd, setSearchEnd] = useState("");
  const [startDate, setStartDate] = useState(new Date());


  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`http://back.papotcar.ismadev.fr/api/trips/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        start: searchStart,
        end: searchEnd,
        date: startDate,
      }),
    }).then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      setTrips(response);
    });
  };

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
          <form className="search">
            <h1 className="title">Où voulez-vous allez ?</h1>
            <div className="search-destination">
              <input
                type="text"
                onChange={(e) => { setSearchStart(e.target.value) }}
                placeholder="Départ"
                className="input input-ghost max-w-xs"
              />

              <input
                type="text"
                onChange={(e) => { setSearchEnd(e.target.value) }}
                placeholder="Arrivé"
                className="input input-ghost max-w-xs"
              />

              {/* <input type="text" placeholder="Quand ?" className="input input-ghost max-w-xs" /> */}

              <Datepicker startDate={startDate} setStartDate={setStartDate} />

              <button type="submit" onSubmit={handleSearch} className="search-btn btn">Rechercher</button>
            </div>
          </form>
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
