import axios from "axios";

const API_URL_AUTH = "http://back.papotcar.ismadev.fr/api/auth/";

const register = async (firstname, lastname, email, password, password2) => {
  try {
    const response = await axios.post(API_URL_AUTH + "register", {
      firstname,
      lastname,
      email,
      password,
      password2,
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL_AUTH + "login", {
      email,
      password,
    });
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
