<template>
  <div :style="{ backgroundColor: navBg }">
    <nav class="navbar container navbar-expand-md navbar-dark">
      <router-link class="navbar-brand" to="/">Coding Doubt</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/"
              >Home <span class="sr-only">(current)</span></router-link
            >
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/blogs">Blogs</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" to="/contact">Contact</router-link>
          </li>
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link" to="/register" v-if="!isAuthenticated"
              >Register</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login" v-if="!isAuthenticated"
              >Login</router-link
            >
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/profile">Profile</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <a class="nav-link" @click="logoutuser">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import Color from "../constants/colors";

export default {
  data() {
    return {
      navBg: Color.primary,
    };
  },
  methods: {
    logoutuser() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.getAuthStatus;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");

.navbar-brand {
  font-family: "Dancing Script", cursive;
}

.nav-item .router-link-exact-active {
  border-bottom: 1px solid #fff;
  color: #fff;
}

.nav-item a {
  width: 80px;
  cursor: pointer;
}

@media (min-width: 768px) {
  .nav-item a {
    text-align: center;
  }
}
</style>
