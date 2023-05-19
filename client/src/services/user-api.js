import axios from "axios";
const URL = "http://localhost:8080/api/v1";
const REGISTER_USER = async (data) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios
    .post(`${URL}/register`, data, config)
    .then((res) => res)
    .catch((er) => er);
};

// LOGIN USER
const LOGIN_USER = async (data) => {
  return axios
    .post(`${URL}/login`, data)
    .then((res) => res)
    .catch((er) => er);
};

// private || user details
const USER_DETAILS = async (token) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  return axios
    .get(`${URL}/user-details`, config)
    .then((res) => res)
    .catch((er) => er);
};
const SKY_GOAL = async (token) => {
  const config = {
    headers: {
      authorization: token,
    },
  };
  return axios
    .get(`${URL}/sky`, config)
    .then((res) => res)
    .catch((er) => er);
};
export { REGISTER_USER, LOGIN_USER, USER_DETAILS, SKY_GOAL };
