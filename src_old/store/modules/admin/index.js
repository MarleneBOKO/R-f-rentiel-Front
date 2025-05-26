import axios from "axios";

const state = {
  AdminProfile: {},
  Agencies: {},
  Users: {},
  // Products: {},
  Companies: {},
};

const getters = {
  AdminProfile: (state) => state.AdminProfile,
  Agencies: (state) => state.Agencies,
  Users: (state) => state.Users,
  // Products: (state) => state.Products,
  Companies: (state) => state.Companies,
};

const mutations = {
  SET_ADMIN_PROFILE(state, data) {
    state.AdminProfile = data;
  },
  SET_AGENCIES(state, data) {
    state.Agencies = data;
  },
  SET_USERS(state, data) {
    state.Users = data;
  },
  // SET_PRODUCTS(state, data) {
  //   state.Products = data;
  // },
  SET_COMPANIES(state, data) {
    state.Companies = data;
  },
};

const actions = {
  getAdminProfile({ commit }) {
    axios
      .get("/admin/profile")
      .then((res) => {
        commit("SET_ADMIN_PROFILE", res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getAgencies({ commit }) {
    axios
      .get("/agency")
      .then((res) => {
        commit("SET_AGENCIES", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getUsers({ commit }) {
    axios
      .get("/user")
      .then((res) => {
        commit("SET_USERS", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  // getProducts({ commit }, { name = "" }) {
  //   axios
  //     .get(`/product?name=${name}`)
  //     .then((res) => {
  //       commit("SET_PRODUCTS", res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },
  getCompanies({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/company")
        .then((res) => {
          commit("SET_COMPANIES", res.data.data);
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
