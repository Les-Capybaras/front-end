import React from "react";
import { useState } from "react";
import { CarStep } from "../../components/creation/CarStep";
import { MapStep } from "../../components/creation/MapStep";
import { ConfirmStep } from "../../components/creation/ConfirmStep";
import "../../assets/style/component/creation.scss";
import { useEffect } from "react";
import TripService from "../../services/trip.service";

export default function Creation() {
  const [carStep, setCarStep] = useState(false);
  const [confirmStep, setConfirmStep] = useState(false);
  const [dataCreation, setDataCreation] = useState({});
  const [stepsTravel, setStepsTravel] = useState(Array);
  const [waiting, setWaiting] = useState(true);

  function nextStep(step) {
    if (step === "carStep") {
      setCarStep(!carStep);
    }
    if (step === "confirmStep") {
      setConfirmStep(true);
      postTrip();
    }
  }
  async function updateData(newData) {
    setDataCreation(newData);
    //SETUP STEPS TRAVEL
    setStepsTravel([
      {
        address: "",
        name: newData.from,
        latitude: 48.856614,
        longitude: 2.3522219,
        order: 0,
      },
      {
        address: "",
        name: newData.to,
        latitude: 45.764043,
        longitude: 4.835659,
        order: 1,
      },
    ]);
  }

  const postTrip = async () => {
    //POST REQUEST
    TripService.newTrip(
      dataCreation.startDate,
      dataCreation.seats,
      dataCreation.price,
      "2:00",
      stepsTravel
    ).then(
      (response) => {
        console.log(response.data);
        setWaiting(false);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  if (carStep === false) {
    return <CarStep updateData={updateData} nextStep={nextStep} />;
  }
  if (carStep && confirmStep === false) {
    return <ConfirmStep dataCreation={dataCreation} nextStep={nextStep} />;
  }
  if (carStep && confirmStep) {
    if (waiting) {
      return (
        <div className="container-loader flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div class="card lg:w-2/5 w-full h-3/5 bg-base-100 shadow-xl">
              <div class="card-body items-center text-center loading-card">
                <div class="loader">
                  <svg
                    class="car"
                    width="102"
                    height="40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      transform="translate(2 1)"
                      stroke="#002742"
                      fill="none"
                      fill-rule="evenodd"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        class="car__body"
                        d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01"
                        stroke-width="3"
                      />
                      <ellipse
                        class="car__wheel--left"
                        stroke-width="3.2"
                        fill="#FFF"
                        cx="83.493"
                        cy="30.25"
                        rx="6.922"
                        ry="6.808"
                      />
                      <ellipse
                        class="car__wheel--right"
                        stroke-width="3.2"
                        fill="#FFF"
                        cx="46.511"
                        cy="30.25"
                        rx="6.922"
                        ry="6.808"
                      />
                      <path
                        class="car__line car__line--top"
                        d="M22.5 16.5H2.475"
                        stroke-width="3"
                      />
                      <path
                        class="car__line car__line--middle"
                        d="M20.5 23.5H.4755"
                        stroke-width="3"
                      />
                      <path
                        class="car__line car__line--bottom"
                        d="M25.5 9.5h-19"
                        stroke-width="3"
                      />
                    </g>
                  </svg>
                </div>
                <h1>
                  Veuillez patienter pendant que nous mettons en place votre
                  trajet pour que vous puissiez bientôt partager la route avec
                  d'autres voyageurs !
                </h1>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-loader flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div class="card lg:w-2/5 w-full bg-base-100 shadow-xl">
              <div class="card-body items-center text-center loading-card">
              <img src="../pablita-car-rental-1.png"/>
                <h1>
                  Félicitations ! Votre trajet est créé et prêt à être partagé
                  avec d'autres passagers.
                  Bonne route !
                </h1>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
