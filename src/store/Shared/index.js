import axios from "axios";
import Backend from "../../constants/backend";

const state = {
  error: false,
  loading: false,
  message: "",
};
const mutations = {
  setError: (state, error) => {
    state.error = error;
  },
  setLoading: (state, loadSet) => {
    state.loading = loadSet;
  },
  clearError: (state) => {
    state.error = false;
  },
  setMessage: (state, msg) => (state.message = msg),
  clearMessage: (state) => (state.message = ""),
};

const getters = {
  isError: (state) => {
    return state.error;
  },
  isLoading: (state) => {
    return state.loading;
  },
  isMessage: (state) => {
    return state.message;
  },
};

const actions = {
  clearError: ({ commit }) => {
    commit("clearError");
  },
  sendContactRequest({ commit }, payload) {
    commit("clearError");
    commit("setLoading", true);
    commit("clearMessage");

    axios
      .post(`${Backend.API_URL}/other/sendContactMail`, payload)
      .then((res) => {
        commit("setMessage", res.data.message);
        commit("setLoading", false);
      })
      .catch((err) => {
        commit("setError", err.response.data.error);
        commit("setLoading", false);
      });
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
