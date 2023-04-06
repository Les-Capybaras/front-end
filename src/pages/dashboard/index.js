import "../../assets/style/page/dashboard.scss";
import { IoAddCircleOutline } from "react-icons/io5";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
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
  return (
    <div className="container d-flex mx-auto flex-column">
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
        <div className="add-new">
          <button className="btn btn-outline">
            <IoAddCircleOutline />
            Proposer un nouveau trajet
          </button>
        </div>
      </div>
      <div className="road-list">
        <div className="road-card">
          <div className="road-info">
            <div className="road">
              <ul className="steps steps-vertical">
                <li data-content="" className="step step-primary">
                  <div>
                    <span>12:10</span>
                    <p>Nantes</p>
                  </div>
                </li>
                <li data-content="" className="step step-primary">
                  <div>
                    <span>15:30</span>
                    <p>Paris</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="seat">
              <IoPeopleOutline />
              <p>1 / 3</p>
            </div>
          </div>
          <div className="driver-info">
            <div className="price">85€</div>
            <div className="driver">
              <IoPersonCircleSharp />
              <div>
                <p>Antoine</p>
                <span>22 ans</span>
              </div>
            </div>
          </div>
        </div>
        <div className="road-card">
          <div className="road-info">
            <div className="road">
              <ul className="steps steps-vertical">
                <li data-content="" className="step step-primary">
                  <div>
                    <span>12:10</span>
                    <p>Nantes</p>
                  </div>
                </li>
                <li data-content="" className="step step-primary">
                  <div>
                    <span>15:30</span>
                    <p>Paris</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="seat">
              <IoPeopleOutline />
              <p>1 / 3</p>
            </div>
          </div>
          <div className="driver-info">
            <div className="price">85€</div>
            <div className="driver">
              <IoPersonCircleSharp />
              <div>
                <p>Antoine</p>
                <span>22 ans</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
