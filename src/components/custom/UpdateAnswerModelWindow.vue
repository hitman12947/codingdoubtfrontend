<template>
  <div
    class="modal fade"
    :id="'update_' + answer._id"
    tabindex="-1"
    role="dialog"
    :aria-labelledby="'ans' + answer._id"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="'ans' + answer._id">{{ title }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input type="text" v-model="newAnswer" class="form-control" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            :disabled="!answerValidation"
            @click="updateAnswer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "answer"],
  data() {
    return {
      newAnswer: this.answer.answer,
    };
  },

  computed: {
    answerValidation() {
      return this.newAnswer !== null && this.newAnswer.trim() !== "";
    },
  },
  methods: {
    updateAnswer() {
      this.$store.dispatch("updateAnswer", {
        doubtId: this.answer._doubtId,
        answerId: this.answer._id,
        answer: this.newAnswer,
      });
    },
  },
};
</script>
