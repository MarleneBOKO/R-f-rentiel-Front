const state = {
  snackbar: {
    status: false,
    color: "red",
    bg: "white",
  },
  snackMessage: "",
};

const getters = {
  snackbar: (state) => state.snackbar,
  snackMessage: (state) => state.snackMessage,
};

const mutations = {
  /**
   * @snackbar
   */
  SET_SNACKBAR(state, data) {
    state.snackbar = data;
  },
  SET_SNACK_MESSAGE(state, data) {
    state.snackMessage = data;
  },
};

const actions = {
  /**
   * @snackbar
   */
  setSnackMessage({ commit }, schema) {
    return new Promise((resolve, reject) => {
      try {
        commit("SET_SNACKBAR", schema.snackbar);
        commit("SET_SNACK_MESSAGE", schema.message);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
