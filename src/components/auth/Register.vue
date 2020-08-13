<template>
  <div>
    <div class="container">
      <h2 class="text-center my-3">Register</h2>

      <div class="d-flex justify-content-center" v-if="isLoading">
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <div class="form-container mx-auto shadow p-3 mb-5 bg-white rounded">
        <Message :type="'danger'" :message="isError" v-if="isError" />
        <Message :type="'success'" :message="isMessage" v-if="isMessage" />
        <div class="card-body">
          <form @submit="registerUser">
            <Input
              v-for="(i, index) in formFields"
              :name="i.name"
              :key="index"
              :type="i.type"
              :placeholder="i.placeholder"
              v-on:handleInputChange="handleInputChange"
            />
            <div class="form-group d-flex justify-content-end">
              <router-link class="btn btn-outline-success mr-2" to="/login"
                >Login</router-link
              >
              <button class="btn btn-outline-info">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Input from "../custom/Input";
import Message from "../custom/Message";
import Footer from "../Footer";

export default {
  components: {
    Input,
    Footer,
    Message,
  },
  methods: {
    handleInputChange(input) {
      if (input.name == "username") {
        this.username = input.value;
        return;
      }
      if (input.name == "password") {
        this.password = input.value;
        return;
      }
      if (input.name == "password2") {
        this.password2 = input.value;
      }
      if (input.name == "email") {
        this.email = input.value;
      }
    },
    registerUser(e) {
      e.preventDefault();
      if (
        this.username !== null &&
        this.username.trim() !== "" &&
        this.password !== null &&
        this.password.trim() !== "" &&
        this.password2 !== null &&
        this.password2.trim() !== ""
      ) {
        if (this.password === this.password2) {
          const payload = {
            email: this.email,
            password: this.password,
            password2: this.password2,
            username: this.username,
          };
          console.log(payload);
          this.$store.dispatch("registerUser", payload);
        } else {
          alert("Password must be match");
          return;
        }
      } else {
        alert("All Fields are mendatory");
        return;
      }
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.getAuthStatus;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    isError() {
      return this.$store.getters.isError;
    },
    isMessage() {
      return this.$store.getters.isMessage;
    },
  },
  watch: {
    isAuthenticated(newValue) {
      if (newValue) {
        this.$router.push("/");
      }
    },
  },
  data() {
    return {
      formFields: [
        {
          type: "text",
          name: "username",
          placeholder: "Username",
        },
        {
          type: "email",
          name: "email",
          placeholder: "Email",
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
        },
        {
          name: "password2",
          type: "password",
          placeholder: "Re-enter Password",
        },
      ],
      username: "",
      password: "",
      password2: "",
      email: "",
    };
  },
  created() {
    this.$store.commit("clearError");
    this.$store.commit("clearMessage");
  },
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
}
</style>
