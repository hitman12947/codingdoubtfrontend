<template>
  <div>
    <div class="container">
      <h2 class="text-center my-3">Login</h2>

      <div class="d-flex justify-content-center" v-if="isLoading">
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <div class="form-container mx-auto shadow p-3 mb-5 bg-white rounded">
        <Message :type="'danger'" :message="isError" v-if="isError" />

        <div class="card-body">
          <form>
            <Input
              v-for="(i, index) in formFields"
              :name="i.name"
              :key="index"
              :type="i.type"
              :placeholder="i.placeholder"
              v-on:handleInputChange="handleInputChange"
            />
            <div class="form-group d-flex justify-content-end">
              <router-link class="btn btn-outline-info  mr-2" to="/register"
                >Register</router-link
              >

              <button @click="sendLoginRequest" class="btn btn-outline-success">
                Login
              </button>
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
    Message,
    Footer,
  },
  methods: {
    handleInputChange(input) {
      if (input.name == "email") {
        this.email = input.value;
        return;
      }
      if (input.name == "password") {
        this.password = input.value;
        return;
      }
    },
    sendLoginRequest(e) {
      e.preventDefault();
      if (
        this.email !== null &&
        this.email !== "" &&
        this.password !== null &&
        this.password !== ""
      ) {
        this.$store.dispatch("loginUser", {
          email: this.email,
          password: this.password,
        });
      } else {
        alert("Enter valid email password");
      }
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.getAuthStatus;
    },
    isError() {
      return this.$store.getters.isError;
    },
    isLoading() {
      return this.$store.getters.isLoading;
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
          type: "email",
          name: "email",
          placeholder: "Email",
        },
        {
          name: "password",
          type: "password",
          placeholder: "Password",
        },
      ],
      email: "",
      password: "",
    };
  },
  created() {
    this.$store.commit("clearError");
  },
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
}
</style>
