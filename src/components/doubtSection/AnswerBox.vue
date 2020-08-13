<template>
  <form @submit="postAnswer">
    <div class="form-group">
      <textarea
        class="form-control"
        placeholder="Post your answer"
        v-model="answer"
        rows="5"
      ></textarea>
    </div>
    <div class="form-group d-flex justify-content-end">
      <button class="btn btn-sm btn-outline-info">Post</button>
    </div>
  </form>
</template>

<script>
export default {
  props: ["doubtId"],
  data() {
    return {
      answer: "",
    };
  },
  methods: {
    postAnswer(e) {
      e.preventDefault();
      if (this.answer !== null && this.answer !== "") {
        this.$store.dispatch("postDoubtAnswer", {
          doubtId: this.doubtId,
          answer: this.answer,
        });
      }
      this.answer = "";
    },
  },
};
</script>

<style></style>
