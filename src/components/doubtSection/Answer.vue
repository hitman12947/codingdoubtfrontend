<template>
  <div class="card rounded my-3">
    <DeleteModelWindow
      :title="'Are your sure to delete your answer?'"
      :answer="answer"
      v-if="isAuthorized"
    />

    <UpdateAnswerModelWindow :title="'Update Answer!'" :answer="answer" />

    <div class="card-body">
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <div class="d-flex">
            <span class="font-weight-bold text-success"
              >Answer By: {{ answer._userId.username }}</span
            >
            <div class="d-flex ml-auto" v-if="isAuthorized">
              <div
                style="cursor:pointer"
                data-toggle="modal"
                :data-target="'#delete_' + answer._id"
              >
                <i class="fa fa-trash text-danger"></i>
              </div>
              <div
                class="ml-4"
                style="cursor:pointer"
                data-toggle="modal"
                :data-target="'#update_' + answer._id"
              >
                <i class="fa fa-pencil text-info"></i>
              </div>
            </div>
          </div>
          <p>{{ answer.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteModelWindow from "../custom/DeleteModelWindow";
import UpdateAnswerModelWindow from "../custom/UpdateAnswerModelWindow";

export default {
  props: ["answer"],
  components: { DeleteModelWindow, UpdateAnswerModelWindow },

  computed: {
    isAuthorized() {
      return this.$store.getters.getUser._id === this.answer._userId._id;
    },
  },
};
</script>

<style></style>
