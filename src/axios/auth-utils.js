import axios from "axios";

const API_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-HUrXktjiFUL0H5_Yq4k8RImpxsnkJ1A";

export const register = async (email, password, returnSecureToken) => {
 return axios.post(`${API_URL}`, {
  email,
  password,
  returnSecureToken,
 });
};

export const login = async (email, password) => {
 const response = await axios
  .post(`${API_URL}`, {
   email,
   password,
  });
 if (response.data.idToken) {
  localStorage.setItem("user", JSON.stringify(response.data));
 }
 return response.data;
};

export const logout = () => {
 localStorage.removeItem("user");
};

// const authService = {
//  register,
//  login,
//  logout,
// };

// export default authService;