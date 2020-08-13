<template>
  <div class="container">
    <h4 class="my-3">{{ singleDoubt.question }}</h4>
    <div class="my-3">
      <img
        :src="STATIC_URL + singleDoubt.screenShot"
        style="max-width:100%;max-height:50%"
      />
    </div>

    <div v-if="singleDoubt.code">
      <h3>Code</h3>

      <prism :language="'javascript'" style="max-height:500px">
        {{ singleDoubt.code }}
      </prism>
    </div>

    <div class="pb-5">
      <h3>
        Answers: {{ singleDoubt.answers ? singleDoubt.answers.length : 0 }}
      </h3>
      <p class="text-center" v-if="!isAuthenticated">
        Login to post your answer
      </p>
      <div class="d-flex my-3 align-items-center" v-if="isLoading">
        <strong>Posting Your Answer</strong>
        <div
          class="spinner-border ml-auto text-success"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
      <AnswerBox v-if="isAuthenticated" :doubtId="singleDoubt._id" />
      <Answer
        v-for="ans in singleDoubt.answers"
        :key="ans.createdAt"
        :answer="ans"
      />
    </div>
  </div>
</template>

<script>
import "prismjs";
import "prismjs/themes/prism.css";

import Prism from "vue-prism-component";

import Backend from "../../constants/backend";
import Answer from "./Answer";
import AnswerBox from "./AnswerBox";

export default {
  components: { Prism, Answer, AnswerBox },
  data() {
    return {
      STATIC_URL: Backend.STATIC_ASSET_URL,
    };
  },
  computed: {
    singleDoubt() {
      return this.$store.getters.getSingleDoubt;
    },
    codeLanguage() {
      const language = this.singleDoubt.language;
      return language.toLowerCase();
    },
    isAuthenticated() {
      return this.$store.getters.getAuthStatus;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  created() {
    const doubtId = this.$route.params.doubtId;
    this.$store.dispatch("fetchSingleDoubt", doubtId);
  },
};
</script>

<style></style>
