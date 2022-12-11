import axios from 'axios';
import authHeader from "./auth-header";
//  ===================== CREATE AXIOS USER INSTANCE =================== //
export const instance = axios.create({
 baseURL: 'https://634b7670317dc96a3085463c.mockapi.io',
 // headers: { 'Content-Type': 'Application/json', 'Accept': 'Application/json' }
 headers: authHeader()
});

//  ================== CREATE AXIOS INTERCEPTORS ====================//
// Add a request interceptor
axios.interceptors.request.use(function (config) {
 // Do something before request is sent
 return config;
}, function (error) {
 // Do something with request error
 return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
 // Any status code that lie within the range of 2xx cause this function to trigger
 // Do something with response data
 console.log(response)
 return response;
}, function (error) {
 // Any status codes that falls outside the range of 2xx cause this function to trigger
 // Do something with response error

 return Promise.reject(error);
});

// ========== CREATE API SERVICE (FUNCTION BASED) ================ //

// ========== GET ALL USERS API ========== //
export function getAllUsers() {
 return instance.get('/users3')
}

// ========= GET A SINGLE USER API =========== //
export function getUser(id) {
 return instance.get(`/users3/${id}`)
}

// ============ POST A NEW USER API ============ //
export function addUser(data) {
 return instance.post('/users3', data)

}

// ========= UPDATE AN USER API ============ //
export function updateUser(id, data) {
 return instance.put(`/users3/${id}`, data)
}

// ========== DELETE AN USER API ========== //
export function deleteUser(id) {
 return instance.delete(`/users3/${id}`)
}

// // ====================== CREATE API SERVICES (CLASS BASED)=============================== //
// export default class Request {

//  // ================ BASE API GET ================= //

//  static getAll = () => {
//   return instance.get('/users')
//  }

//  // ================ BASE API GET BY ID ================= //

//  static getById = (id) => {
//   return instance.get(`/users/${id}`)
//  }

//  // ==================== BASE API POST ================ //

//  static post = (data) => {
//   return instance.post('/users/add', data);
//  };

//  // ===================== BASE API PUT ================ //

//  static put = function (id, data) {
//   return instance.put(`/users/${id}`, data);
//  };

//  // ================= BASE API DELETE ================ //

//  static delete = function (id) {
//   return instance.delete(`/users/${id}`);
//  };

// }
