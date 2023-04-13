import React from "react";
import { useState } from "react";
import { CarStep } from "../../components/creation/CarStep";
import { MapStep } from "../../components/creation/MapStep";
import { ConfirmStep } from "../../components/creation/ConfirmStep";
import "../../assets/style/component/creation.scss";

export default function Creation() {

    const [carStep, setCarStep] = useState(false);
    const [confirmStep, setConfirmStep] = useState(false);
    const [dataCreation, setDataCreation] = useState({});
    
    function nextStep(step) {
        if(step === "carStep") {
            setCarStep(!carStep);
        }
        if(step === "confirmStep") {
            setConfirmStep(true);
        }
    }
    function updateData(newData) {
        const data = {...dataCreation, ...newData};
        setDataCreation(data);
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
        //POST REQUEST
        return (
            <div className="">
                <h1>loading ...</h1>
            </div>
        )
    }
}