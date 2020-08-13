import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import Home from "../views/Home";
// import About from "../views/About";
import Contact from "../views/Contact";
import Blogs from "../views/Blogs";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Profile from "../components/auth/Profile";
import AskDoubt from "../components/auth/AskDoubt";
import DetailedDoubt from "../components/doubtSection/DetailedDoubt";

// import AuthGuard from "../router/auth-guard";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
      name: "home",
    },
    {
      path: "/doubts/:doubtId",
      component: DetailedDoubt,
      name: "detailedDoubt",
    },
    // {
    //   path: "/about",
    //   component: About,
    //   name: "about",
    // },
    {
      path: "/contact",
      component: Contact,
      name: "contact",
    },
    {
      path: "/blogs",
      component: Blogs,
      name: "blogs",
    },
    {
      path: "/login",
      component: Login,
      name: "login",
      meta: {
        requiredGuest: true,
      },
    },
    {
      path: "/register",
      component: Register,
      name: "register",
      meta: {
        requiredGuest: true,
      },
    },
    {
      path: "/profile",
      component: Profile,
      name: "profile",
      meta: {
        requiredAuth: true,
      },
    },
    {
      path: "/askdoubt",
      component: AskDoubt,
      name: "askdoubt",
      meta: {
        requiredAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (!store.getters.getAuthStatus && !store.getters.getToken) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiredGuest)) {
    if (store.getters.getAuthStatus && store.getters.getToken) {
      next({
        path: "/",
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
