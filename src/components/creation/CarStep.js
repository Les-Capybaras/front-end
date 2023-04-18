import React from "react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { HiMinus } from "react-icons/hi";

export const CarStep = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [seats, setSeats] = useState(0);
  const [price, setPrice] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const onChangeFrom = (e) => {
    const from = e.target.value;
    setFrom(from);
  };
  const onChangeTo = (e) => {
    const to = e.target.value;
    setTo(to);
  };

  function handleClick() {
    props.updateData({
      startDate,
      seats,
      price,
      from,
      to,
    });
    props.nextStep("carStep");
  }

  function addSeats(bool) {
    if (bool && seats < 10) {
      setSeats(seats + 1);
    } else {
      if (seats > 0) {
        setSeats(seats - 1);
      }
    }
  }

  return (
    <div className="">
      <div className="blue-container-creation"></div>
      <div className="creation-container">
        <div class="card card-side creation-title-card w-2/5 bg-base-100">
          <figure>
            <img src="../cab-driver.png" className="" />
          </figure>

          <div class="card-body">
            <h1>
              Renseignez les informations sur le trajet que vous souhaitez créer
            </h1>
          </div>
        </div>
        <div class="card w-2/5 creation-form-card bg-base-100">
          <div class="flex flex-col">
            <label className="input-label-creation">Adresse de départ</label>
            <input
              onChange={onChangeFrom}
              value={from}
              type="text"
              placeholder="Nantes"
              className="input input-bordered"
            />
          </div>
          <div class="flex flex-col">
            <label className="input-label-creation">Adresse d'arrivée</label>
            <input
              onChange={onChangeTo}
              value={to}
              type="text"
              placeholder="Paris"
              className="input input-bordered"
            />
          </div>
          <div class="flex flex-col">
            <label className="input-label-creation">
              Saisissez date et heure d'arrivée
            </label>

            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              locale="fr"
              timeInputLabel="Time:"
              dateFormat="dd/MM/yyyy h:mm aa"
              datepickerAutohide
              showTimeInput
              className="datepickerStep"
            />
          </div>
          <div class="flex flex-col">
            <label className="input-label-creation">
              Nombre de places disponiles dans le véhicule
            </label>
            <div className="seats flex items-center	gap-x-2.5">
              <button
                class="btn btn-circle btn-outline btn-sm"
                onClick={() => addSeats(false)}
              >
                <HiMinus/>
              </button>
              <span>{seats}</span>
              <button
                class="btn btn-circle btn-outline btn-sm btn-primary"
                onClick={() => addSeats(true)}
              >
                <HiPlus/>
              </button>
            </div>
          </div>

          <div class="flex flex-col">
            <label className="input-label-creation">Prix du trajet</label>

            {/* <span>Price</span> */}
            <input
              type="text"
              placeholder="€"
              className="input input-bordered"
            />
            {/* <span>EUR</span> */}
          </div>
          <div class="flex justify-between">
            <Link to="/dashboard" className="btn btn-outline creation-back-btn">Quitter</Link>

            <button className="btn creation-next-btn" onClick={handleClick}>
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
