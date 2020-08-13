<template>
  <div class="shadow rounded my-3">
    <DeleteDoubtModel :doubt="singleDoubt" />
    <div class="card-body">
      <div class="row">
        <div class="col-md-7 col-sm-12">
          <h5>
            <router-link :to="'/doubts/' + singleDoubt._id">
              {{ singleDoubt.question }}
            </router-link>
          </h5>
          <p class="font-weight-bold text-success">
            Answers {{ singleDoubt.answers.length }}
          </p>
        </div>
        <div
          class="col-md-4 col-sm-12 d-flex justify-content-md-end justify-content-sm-start"
        >
          <img
            :src="STATIC_URL + singleDoubt.screenShot"
            height="100"
            width="150"
          />
        </div>
        <div
          class="col-md-1 col-sm-1 d-flex flex-md-column justify-content-around align-items-md-center mt-2"
          v-if="isMyDoubt"
        >
          <!-- <div class="iconss">
            <i class="fa fa-pencil text-success"></i>
          </div> -->
          <div
            class="iconss"
            data-toggle="modal"
            :data-target="'#deleteDoubt' + singleDoubt._id"
          >
            <i class="fa fa-trash text-danger"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Backend from "../../constants/backend";
import DeleteDoubtModel from "../custom/DeleteDoubtModel";

export default {
  props: ["singleDoubt"],
  data() {
    return {
      STATIC_URL: Backend.STATIC_ASSET_URL,
    };
  },
  components: { DeleteDoubtModel },
  computed: {
    isAuthenticated() {
      return this.$store.getters.getUser && this.$store.getters.getAuthStatus;
    },
    userInfo() {
      return this.$store.getters.getUser._id;
    },
    isMyDoubt() {
      return this.singleDoubt._userId._id === this.$store.getters.getUser._id;
    },
  },
};
</script>

<style scoped>
.iconss {
  cursor: pointer;
}
</style>
