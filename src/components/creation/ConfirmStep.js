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
      <div className="blue-container-recap"></div>
      <div className="recap-container">
      <div class="card card-side creation-title-card lg:w-2/5 w-full bg-base-100">
          <figure>
            <img src="../sammy-line-saas.png" className="" />
          </figure>

          <div class="card-body">
            <h1>
              Vérifiez et validez les informations du trajet précédement créer
            </h1>
          </div>
        </div>
        <div class="card lg:w-2/5 w-full creation-form-card bg-base-100">
          <div class="flex flex-col recap-form-body">
            <h3 className="input-label-creation">Adresse de départ</h3>
            <p>{recap.from}</p>
          </div>
          <div class="flex flex-col recap-form-body">
            <h3 className="input-label-creation">Adresse de départ</h3>
            <p>{recap.to}</p>
          </div>
          <div class="flex flex-col recap-form-body">
            <h3 className="input-label-creation">Date et heure du départ</h3>
            <p>le {recap.startDate.toLocaleDateString()}</p>
          </div>
          <div class="flex flex-col recap-form-body">
            <h3 className="input-label-creation">Sièges disponibles</h3>
            <p>{recap.seats}</p>
          </div>
          <div class="flex flex-col recap-form-body">
            <h3 className="input-label-creation">Prix du trajet</h3>
            <p>{recap.price}€</p>
          </div>
          <div class="pt-5 flex justify-between recap-form-btn">
            
              <button
                onClick={backStep}
                className="btn btn-outline creation-back-btn"
              >
                Retour
              </button>
              <button className="btn creation-next-btn" onClick={handleClick}>
                Confirmer
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};
