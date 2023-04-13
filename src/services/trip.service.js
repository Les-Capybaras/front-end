import axios from "axios";

const API_URL_TRIP = "http://back.papotcar.ismadev.fr/api/trips";

const newTrip = async (startDate, seats, price, estimatedDuration, steps) => {
    try {
        const response = await axios.post(API_URL_TRIP, {
            startDate,
            seats,
            price,
            estimatedDuration,
            steps,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token,
            }
        });
        console.log(response)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

const TripService = {
    newTrip
  };
  
  export default TripService;