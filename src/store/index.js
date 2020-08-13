import Vue from "vue";
import Vuex from "vuex";

import Doubts from "./Doubts";
import User from "./Users";
import Shared from "./Shared";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { doubts: Doubts, user: User, shared: Shared },
});

export default store;
