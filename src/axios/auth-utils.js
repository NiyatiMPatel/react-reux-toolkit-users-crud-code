import axios from "axios";

const REGISTER_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-HUrXktjiFUL0H5_Yq4k8RImpxsnkJ1A";

const LOGIN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-HUrXktjiFUL0H5_Yq4k8RImpxsnkJ1A"

export const register = async (email, password, returnSecureToken) => {
 return axios.post(`${REGISTER_URL}`, {
  email,
  password,
  returnSecureToken,
 });
};

export const login = async (email, password, returnSecureToken) => {
 const response = await axios
  .post(`${LOGIN_URL}`, {
   email,
   password,
   returnSecureToken,
  });
 if (response.data.idToken) {
  localStorage.setItem("user", JSON.stringify(response.data));
 }
 return response.data;
};

export const logout = () => {
 localStorage.removeItem("user");
};