import axios from "axios";

const API_URL_AUTH = "http://back.papotcar.ismadev.fr/api/auth/";

const edit = async (id, firstname) => {
  try {
    const response = await axios.put(API_URL_AUTH + "user/", {
      firstname,
    });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const showMe = async () => {
  try {
    const response = await axios.get(API_URL_AUTH + "me", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token,
    }
    });
    return response.data
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

const UserService = {
  edit,
  showMe
}

export default UserService;
