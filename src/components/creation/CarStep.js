import React from "react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { Link } from "react-router-dom";

export const CarStep = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const [seats, setSeats] = useState(0);
    const [price, setPrice] = useState(0);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const onChangePrice = (e) => {
        const price = e.target.value;
        setPrice(price);
    };
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
            to
        })
        props.nextStep("carStep");  
    }

    function addSeats(bool) {
        if (bool && seats < 10) {
            setSeats(seats + 1);
        } else {
            if (seats > 0) {
                setSeats(seats - 1)
            }
        }
    }

    return (
        <div className="">
            <h1>Nouveau trajet</h1>

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

            <label>Date</label>
            <DatePicker
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                locale="fr-FR"
                timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy h:mm aa"
                datepickerAutohide
                showTimeInput
                className="datepickerStep"
            />

            <label>Nombre de places</label>
            <div className="seats">
                <button className="btn" onClick={() => addSeats(false)}>-</button>
                <span>{seats}</span>
                <button className="btn" onClick={() => addSeats(true)}>+</button>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Prix</span>
                </label>
                <label className="input-group">
                    {/* <span>Price</span> */}
                    <input value={price} onChange={onChangePrice} type="text" placeholder="00" className="input input-bordered" />
                    {/* <span>EUR</span> */}
                </label>
            </div>

            <Link to="/dashboard">Retour</Link>


            <button className="next" onClick={handleClick}>Suivant</button>
        </div>
    )
}