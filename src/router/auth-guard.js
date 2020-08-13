import store from "../store";
export default (to, from, next) => {
  if (store.getters.getUser && store.getters.getToken) {
    next();
  } else {
    next("/login");
  }
};
