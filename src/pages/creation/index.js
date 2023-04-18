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
        if(step === "carStep") {
            setCarStep(!carStep);
        }
        if(step === "confirmStep") {
            setConfirmStep(true);
            postTrip();
        }
    }
    async function updateData(newData) {
        setDataCreation(newData);
        //SETUP STEPS TRAVEL
        setStepsTravel([
            {
            "address": "",
            "name": newData.from,
            "latitude": 48.856614,
            "longitude": 2.3522219,
            "order": 0
            },
            {
            "address": "",
            "name": newData.to,
            "latitude": 45.764043,
            "longitude": 4.835659,
            "order": 1
            }
        ]);
    }

    const postTrip = async () => {
        //POST REQUEST
        TripService.newTrip(
                dataCreation.startDate, 
                dataCreation.seats, 
                dataCreation.price, 
                '2:00', 
                stepsTravel
            ).then(
            (response) => {
                console.log(response.data);
                setWaiting(false);
            },
            (error) => {
                console.log(error);
            }
        )
    }
    
    if (carStep === false) {
        return (
            <CarStep updateData={updateData} nextStep={nextStep}/>
        )
    }
    if (carStep && confirmStep === false) {
        return (
            <ConfirmStep dataCreation={dataCreation} nextStep={nextStep}/>
        )
    }
    if (carStep && confirmStep) {
        if (waiting) {
            return (
                <div className="">
                    <h1>loading ...</h1>
                </div>
            )
        } else {
            return (
                <div className="">
                    <h1>done</h1>
                </div>
            )
        }
    }
}