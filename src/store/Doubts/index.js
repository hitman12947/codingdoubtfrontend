import Backend from "../../constants/backend";
import axios from "axios";
import router from "../../router";

const state = {
  allDoubts: [],
  singleDoubt: {},
  myDoubts: {},
  myAnswered: {},
};

const mutations = {
  setAllDoubts: (state, doubts) => (state.allDoubts = doubts),
  setSingleDoubt: (state, doubt) => (state.singleDoubt = doubt),
  setMyDoubts: (state, doubts) => (state.myDoubts = doubts),
  setMyAnswered: (state, doubts) => (state.myAnswered = doubts),
};

const getters = {
  getAllDoubts: (state) => state.allDoubts,
  getSingleDoubt: (state) => state.singleDoubt,
  getMyDoubts: (state) => state.myDoubts,
  getMyAnswered: (state) => state.myAnswered,
};

const actions = {
  fetchDoubts({ commit }) {
    fetch(`${Backend.API_URL}/doubt/alldoubts`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        commit("setAllDoubts", data.docs);
      });
  },
  fetchSingleDoubt({ commit }, id) {
    fetch(`${Backend.API_URL}/doubt/alldoubts/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        commit("setSingleDoubt", data);
      });
  },
  askDoubtRequest({ commit, dispatch }, doubt) {
    commit("setLoading", true);
    const doubtFormData = new FormData();

    doubtFormData.set("question", doubt.question);
    doubtFormData.set("code", doubt.code);
    doubtFormData.set("language", doubt.language);
    doubtFormData.append("doubtScreenShot", doubt.image);

    axios
      .post(`${Backend.API_URL}/doubt/askDoubt`, doubtFormData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        commit("setLoading", false);
        dispatch("fetchDoubts");
        dispatch("fetchMyDoubts");
        router.push("/");
      })
      .catch((err) => {
        console.log(err.response);
        commit("setLoading", false);
      });
  },

  postDoubtAnswer({ commit, getters, dispatch }, payload) {
    commit("setLoading", true);

    axios
      .post(
        `${Backend.API_URL}/doubt/answerDoubt/${payload.doubtId}`,
        {
          answer: payload.answer,
        },
        {
          headers: {
            Authorization: "Bearer " + getters.getToken,
          },
        }
      )
      .then(() => {
        commit("setLoading", false);
        dispatch("fetchSingleDoubt", payload.doubtId);
        dispatch("fetchDoubts");
        dispatch("fetchMyDoubts");
        dispatch("fetchMyAnswered");
      })
      .catch((err) => {
        console.log(err.response);
        commit("setLoading", false);
      });
  },

  deleteDoubtAnswer({ commit, getters, dispatch }, payload) {
    commit("setLoading", true);
    axios
      .delete(
        `${Backend.API_URL}/doubt/delete/${getters.getUser._id}/${payload.doubtId}/${payload.answerId}`,
        {
          headers: {
            Authorization: "Bearer " + getters.getToken,
          },
        }
      )
      .then(() => {
        commit("setLoading", false);
        dispatch("fetchSingleDoubt", payload.doubtId);
        dispatch("fetchDoubts");
        dispatch("fetchMyDoubts");
        dispatch("fetchMyAnswered");
      })
      .catch((err) => {
        commit("setLoading", false);
        console.log(err.response);
      });
  },

  updateAnswer({ commit, getters, dispatch }, payload) {
    commit("setLoading", true);
    axios
      .put(
        `${Backend.API_URL}/doubt/updateAnswer/${getters.getUser._id}/${payload.doubtId}/${payload.answerId}`,
        {
          answer: payload.answer,
        },
        {
          headers: {
            Authorization: "Bearer " + getters.getToken,
          },
        }
      )
      .then(() => {
        commit("setLoading", false);
        dispatch("fetchSingleDoubt", payload.doubtId);
        dispatch("fetchDoubts");
        dispatch("fetchMyDoubts");
        dispatch("fetchMyAnswered");
      })
      .catch((err) => {
        commit("setLoading", false);
        console.log(err.response);
      });
  },

  fetchMyDoubts({ commit, getters }) {
    commit("setLoading", true);

    axios
      .get(`${Backend.API_URL}/doubt/myDoubts/${getters.getUser._id}`, {
        headers: {
          Authorization: "Bearer " + getters.getToken,
        },
      })
      .then((res) => {
        commit("setMyDoubts", res.data);
        commit("setLoading", false);
      })
      .catch((err) => {
        console.log(err.response);
        commit("setLoading", false);
      });
  },

  fetchMyAnswered({ commit, getters }) {
    commit("setLoading", true);
    axios
      .get(`${Backend.API_URL}/doubt/myAnswered/${getters.getUser._id}`, {
        headers: {
          Authorization: "Bearer " + getters.getToken,
        },
      })
      .then((res) => {
        commit("setMyAnswered", {
          count: res.data.finalAnswers.length,
          docs: res.data.finalAnswers,
        });
        commit("setLoading", false);
      })
      .catch((err) => {
        console.log(err.response);
        commit("setLoading", false);
      });
  },

  deleteMyDoubt({ commit, getters, dispatch }, payload) {
    commit("setLoading", true);
    if (getters.getUser && getters.getAuthStatus) {
      axios
        .delete(`${Backend.API_URL}/doubt/deleteDoubt/${payload.doubtId}`, {
          headers: {
            Authorization: "Bearer " + getters.getToken,
          },
        })
        .then(() => {
          dispatch("fetchDoubts");
          dispatch("fetchMyDoubts");
          dispatch("fetchMyAnswered");
          commit("setLoading", false);
        })
        .catch((err) => {
          console.log(err.response);
          commit("setLoading", false);
          alert("Unable to delete");
        });
    }
    commit("setLoading", false);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
