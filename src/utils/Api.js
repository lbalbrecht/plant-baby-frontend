const axios = require("axios");
//deployed
// const URL_PREFIX = "deployed backend http"

// LOCAL
const URL_PREFIX = "http://localhost:3001";

const API = {
  login: function (userData) {
    return axios.post(`${URL_PREFIX}/auth/login`, userData);
  },
  signup: function (userData) {
    return axios.post(`${URL_PREFIX}/auth/signup`, userData);
  },
  getUser: function (token) {
    return axios.get(`${URL_PREFIX}/auth/profile`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  imageLoad: function (image) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${URL_PREFIX}/api/search`, image)
        .then((res) => resolve(res.data, (err) => reject(err)));
    });
  },
  logOut: function () {
    return axios.get(`${URL_PREFIX}/api/logout`);
  },
  createPlant: function (plantData, token) {
    return axios.post(`${URL_PREFIX}/api/plant`, plantData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getInventory: function (id, token) {
    return axios.get(`${URL_PREFIX}/auth/user/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getPlant: function (id, token) {
    return axios.get(`${URL_PREFIX}/api/plant/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getPlantInventory: function (id, token) {
    return axios.get(`${URL_PREFIX}/api/inventory/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getAllPlants: function (token) {
    return axios.get(`${URL_PREFIX}/api/plant/allplants`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  deletePlant: function (id, token) {
    return axios.delete(`${URL_PREFIX}/api/plant/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  editPlant: function (id, token) {
    return axios.put(`${URL_PREFIX}/api/plant/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
};

export default API;
