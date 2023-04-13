import React from "react";
import { useState } from "react";

export const MapStep = (props) => {

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
            from,
            to
        })
        props.nextStep("mapStep");  
    }
    function backStep() {
        props.nextStep("carStep");
    }

    return (
        <div className="">
            <h1>Choix du trajet</h1>
            
            <div>
                <label>Départ</label>
                <input 
                onChange={onChangeFrom} 
                value={from} 
                type="text" 
                placeholder="Nantes" 
                className="input input-bordered" />

                <label>Arrivée</label>
                <input 
                onChange={onChangeTo} 
                value={to} 
                type="text" 
                placeholder="Paris" 
                className="input input-bordered" />
            </div>

            <button onClick={backStep}>Retour</button>
            <button onClick={handleClick}>Suivant</button>
        </div>
    )
}