import axios from "axios";
import Backend from "../../constants/backend";
import router from "../../router";

const state = {
  user: {},
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
};
const getters = {
  getUser: (state) => state.user,
  getToken: (state) => state.token,
  getAuthStatus: (state) => state.isAuthenticated,
};
const mutations = {
  setUser: (state, userInfo) => {
    state.user = userInfo;
    state.isAuthenticated = true;
  },
  setToken: (state, token) => {
    state.token = token;
  },
  logoutUser: (state) => {
    state.user = {};
    state.token = null;
    localStorage.clear();
    state.isAuthenticated = false;
  },
};
const actions = {
  loginUser: ({ commit }, userinfo) => {
    commit("setLoading", true);
    axios
      .post(`${Backend.API_URL}/user/signin`, userinfo)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        commit("setUser", res.data.user);
        commit("setToken", res.data.token);
        commit("setLoading", false);
        router.push("/");
      })
      .catch((err) => {
        const errorMessage = err.response.data.error;
        commit("setError", errorMessage);
        commit("setLoading", false);
      });
  },

  autoLoginUser: ({ commit }) => {
    if (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("token") !== ""
    ) {
      axios
        .get(`${Backend.API_URL}/user/userInfo`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          commit("setUser", res.data);
        })
        .catch(() => {
          localStorage.clear();
        });
    } else {
      localStorage.clear();
    }
  },

  registerUser: ({ commit }, payload) => {
    commit("setLoading", true);
    commit("clearError");
    axios
      .post(`${Backend.API_URL}/user/signup`, payload)
      .then(() => {
        commit("setLoading", false);
        commit("setMessage", "Account created for " + payload.email);
      })
      .catch((err) => {
        console.log(err.response);
        commit("setError", err.response.data.error);
        commit("setLoading", false);
      });
  },

  logoutUser: ({ commit }) => {
    commit("logoutUser");
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
