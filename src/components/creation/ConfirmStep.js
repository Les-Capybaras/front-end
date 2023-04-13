import React from "react";

export const ConfirmStep = (props) => {

    function handleClick() {
        props.nextStep("confirmStep");  
    }
    function backStep() {
        props.nextStep("carStep");
    }
    
    const recap = props.dataCreation;

    return (
        <div className="">
            <h1>Récapitulatif</h1>
            <div>
                <p>{recap.from} ---- {recap.to}</p>

                <p>le {recap.startDate.toLocaleDateString()}</p>

                <p>{recap.seats}</p>
                <p>{recap.price}€</p>
                
            </div>
            <button onClick={backStep}>Retour</button>
            <button onClick={handleClick}>Confirmer</button>
        </div>
    )
}