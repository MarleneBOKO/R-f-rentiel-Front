import axios from "axios";
// axios.defaults.baseURL = "https://backendrcdeferentiel.herokuapp.com/api/v1/";
// axios.defaults.baseURL = "http://172.17.192.9:3087/api/v1";
// axios.defaults.baseURL = "http://172.17.192.9:3087/api/v1";
//axios.defaults.baseURL = "http://192.168.1.130:3087/api/v1";
// axios.defaults.baseURL = "http://162.0.213.231:3087/api/v1";

let token = "";
if (localStorage.getItem("admin-token")) {
  token = localStorage.getItem("admin-token");
  axios.defaults.headers.common["admin-token"] = token;
} else if (localStorage.getItem("user-token")) {
  token = localStorage.getItem("user-token");
  axios.defaults.headers.common["user-token"] = token;
}

axios.defaults.headers.common["Content-Type"] = "application/json";

// axios.defaults.headers.common["auth-token"] = token;
