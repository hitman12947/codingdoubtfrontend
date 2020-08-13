<template>
  <div>
    <h3 class="text-center my-3">Dashboard</h3>
    <div class="row">
      <div class="d-flex justify-content-center col-md-3 col-sm-12 offset-md-3">
        <img
          src="../../assets/images/default_profile_image.png"
          alt="Profile Image"
          height="100px"
        />
      </div>
      <div
        class="col-md-6 col-sm-12 d-flex justify-content-sm-center justify-content-center justify-content-md-start align-items-center"
      >
        <div class="mt-2">
          <h5>{{ userInfo.username }}</h5>
          <h5>{{ userInfo.email }}</h5>
        </div>
      </div>
    </div>

    <div class="row mt-5 mb-3">
      <div
        class="col-md-3 col-sm-12 offset-md-3 mb-3 d-flex justify-content-center"
      >
        <button class="btn" @click="loadMyDoubts">
          Asked Doubts
        </button>
      </div>
      <!-- <div class="col-md-3 col-sm-12 mb-3 d-flex justify-content-center">
        <button class="btn" @click="loadCustomInterest">
          Important
        </button>
      </div> -->
      <!-- <div class="col-md-3 d-flex mb-3 justify-content-center">
        <button class="btn" @click="loadMyAnsweredDoubts">
          Answerd
        </button>
      </div> -->
    </div>

    <div class="row container mx-auto" v-if="loadUserInterest">
      <div class="col">
        <MyDoubts v-if="myInterest == 1" />
        <!-- <MyAnswered v-if="myInterest == 2" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import MyDoubts from "../doubtSection/MyDoubts";
// import MyAnswered from "../doubtSection/MyAnsweredDoubts";

export default {
  components: {
    MyDoubts,
    // MyAnswered,
  },
  data() {
    return {
      loadUserInterest: false,
      title: "",
    };
  },

  methods: {
    loadMyDoubts() {
      this.loadUserInterest = 1;
    },
    loadMyAnsweredDoubts() {
      this.loadUserInterest = 2;
    },
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUser;
    },
    myInterest() {
      return this.loadUserInterest;
    },
  },
};
</script>

<style scoped>
.btn {
  width: 150px;
  background-color: #e65100;
  color: #fff;
}
</style>
