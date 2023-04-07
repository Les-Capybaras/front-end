import axios from "axios";

const API_URL_AUTH = "http://back.papotcar.ismadev.fr/api/auth/";

const edit = async (id, username) => {
  try {
    const response = await axios.put(API_URL_AUTH + "user/", {
      username,
    });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const UserService = {
  edit
}

export default UserService;
