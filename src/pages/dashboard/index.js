import "../../assets/style/page/dashboard.scss";
import { useState, useEffect } from "react";
import RoadCard from "../../components/dashboard/RoadCard";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fr from "date-fns/locale/fr";
import { CgShapeCircle } from "react-icons/cg";
import { HiFlag } from "react-icons/hi";
import { BiCalendar } from "react-icons/bi";

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
  const [isDemandCreated, setIsDemandCreated] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    startDate.setHours(0.0)
    fetch(`http://back.papotcar.ismadev.fr/api/trips/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
      },
      body: JSON.stringify({
        startLocation: searchStart,
        endLocation: searchEnd,
        startDate: getFormatedDate(startDate),
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setTrips(response);
      });
  };

  const demandCreated = () => {
    console.log('demandCreated');
    setIsDemandCreated(true);
    setTimeout(() => {
      setIsDemandCreated(false);
    }, 3000);
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
        setTrips(response);
      });
  }, []);

  return (
    <div className="">
      <div className="blue-container">
        <div className="destination">
          <form className="search" onSubmit={handleSearch}>
            <h1 className="title">Où voulez-vous allez ?</h1>
            <div className="search-destination">
              <CgShapeCircle />
              <input
                type="text"
                onChange={(e) => {
                  setSearchStart(e.target.value);
                }}
                placeholder="Départ"
                className="input input-ghost max-w-xs"
              />
              <HiFlag />
              <input
                type="text"
                onChange={(e) => {
                  setSearchEnd(e.target.value);
                }}
                placeholder="Arrivé"
                className="input input-ghost max-w-xs"
              />

              {/* <input type="text" placeholder="Quand ?" className="input input-ghost max-w-xs" /> */}
              <BiCalendar />
              <Datepicker startDate={startDate} setStartDate={setStartDate} />

              <button type="submit" className="search-btn btn">
                Rechercher
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="road-list">
        <div className="container-title-dashboardList">
          <p>Trajets qui pourrait vous intéresser</p>
          {trips.map((trip) => (
            <RoadCard trip={trip} demandCreated={demandCreated} key={trip.id} />
          ))}
        </div>
      </div>
      { isDemandCreated && (
        <div className="demand-created">
          <p className="title">Votre demande a bien été envoyée</p>
        </div>
      )
      }
    </div>
  );
}

const getFormatedDate = (date) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}
