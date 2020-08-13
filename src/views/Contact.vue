<template>
  <div>
    <div class="container">
      <h3 class="text-center my-3">Contact Page</h3>
      <Message
        :type="isMessage ? 'success' : isError ? 'error' : ''"
        v-if="isMessage || isError"
        :message="isMessage || isError"
      />
      <div class="d-flex justify-content-center" v-if="isLoading">
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only">Sending...</span>
        </div>
      </div>

      <form class="mx-auto" @submit="sendContactRequest">
        <div class="form-group">
          <label for="username"
            >Your Name <span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="form-control"
            placeholder="Enter Your Name"
            v-model="username"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email <span class="text-danger">*</span></label>
          <input
            type="email"
            class="form-control"
            placeholder="Enter Email"
            v-model="email"
            required
          />
        </div>
        <div class="form-group">
          <label for="purpose"
            >Purpose <span class="text-danger">*</span></label
          >
          <textarea
            type="text"
            class="form-control"
            placeholder="Purpose"
            rows="5"
            v-model="purpose"
            required
          />
        </div>
        <div class="form-group d-flex justify-content-end">
          <input
            type="submit"
            value="Submit"
            class="btn btn-success"
            :disabled="!isFormValid || isLoading"
          />
        </div>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Message from "../components/custom/Message";

export default {
  components: { Footer, Message },
  methods: {
    sendContactRequest(e) {
      e.preventDefault();
      if (!this.isFormValid) {
        alert("All Fields are mendatory");
        return;
      }
      this.$store.dispatch("sendContactRequest", {
        name: this.username,
        email: this.email,
        purpose: this.purpose,
      });
      this.email = this.purpose = this.username = "";
    },
  },
  computed: {
    isFormValid() {
      return (
        this.username !== null &&
        this.username.trim() !== "" &&
        this.email !== null &&
        this.email.trim() !== "" &&
        this.purpose !== null &&
        this.purpose.trim() !== ""
      );
    },
    isError() {
      return this.$store.getters.isError;
    },
    isMessage() {
      return this.$store.getters.isMessage;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  data() {
    return {
      username: "",
      email: "",
      purpose: "",
    };
  },
  created() {
    this.$store.commit("clearMessage");
  },
};
</script>

<style scoped>
form {
  max-width: 500px;
}
</style>
